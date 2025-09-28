import mongoose from 'mongoose';
import Paper from '../models/Paper.js';
import User from '../models/User.js';
import Counter from '../models/Counter.js';
import { uploadToDrive } from '../services/gdriveService.js';
import { sendEmail, templates } from '../services/emailService.js';

async function nextPaperId() {
  const year = new Date().getFullYear();
  const name = `paper-${year}`;
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  const seq = counter.seq;
  return `P-${year}-${String(seq).padStart(5, '0')}`;
}

export async function submitPaper(req, res, next) {
  try {
    const { title, abstract } = req.body;
    if (!title || !abstract) return res.status(400).json({ message: 'Title and abstract are required' });
    if (!req.file) return res.status(400).json({ message: 'File is required' });

    const authorId = req.user.id;
    const paperId = await nextPaperId();

    const timestamp = Date.now();
    const safeName = `${paperId}_${timestamp}_${req.file.originalname}`.replace(/[^a-zA-Z0-9._-]/g, '_');

    const driveFile = await uploadToDrive({
      name: safeName,
      mimeType: req.file.mimetype,
      body: Buffer.from(req.file.buffer),
    });

    const paper = await Paper.create({
      paperId,
      title,
      abstract,
      author: authorId,
      status: 'Submitted',
      file: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        gdriveFileId: driveFile.id,
        webViewLink: driveFile.webViewLink || null,
      },
      currentVersion: 1,
      versions: [{
        version: 1,
        gdriveFileId: driveFile.id,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        submittedAt: new Date(),
      }],
    });

    // Email notifications
    const author = await User.findById(authorId);
    await sendEmail({ to: author.email, subject: 'Submission received', html: templates.submissionConfirmation(paper.paperId) });
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      await sendEmail({ to: adminEmail, subject: 'New paper submission', html: `<p>New submission: <b>${paper.title}</b> (${paper.paperId})</p>` });
    }

    return res.status(201).json({ message: 'Paper submitted', paper });
  } catch (err) { next(err); }
}

export async function resubmitPaper(req, res, next) {
  try {
    const { id } = req.params; // paperId or _id
    if (!req.file) return res.status(400).json({ message: 'File is required' });
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { paperId: id };
    const paper = await Paper.findOne(query).populate('author');
    if (!paper) return res.status(404).json({ message: 'Paper not found' });

    // Only author (or admin) can resubmit; author must own the paper
    const isAdmin = req.user.role === 'Admin';
    if (!isAdmin && paper.author._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const nextVersion = (paper.currentVersion || 1) + 1;
    const safeName = `${paper.paperId}_${Date.now()}_${req.file.originalname}`.replace(/[^a-zA-Z0-9._-]/g, '_');
    const driveFile = await uploadToDrive({ name: safeName, mimeType: req.file.mimetype, body: Buffer.from(req.file.buffer) });

    paper.currentVersion = nextVersion;
    paper.file = {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      gdriveFileId: driveFile.id,
      webViewLink: driveFile.webViewLink || null,
    };
    paper.versions = paper.versions || [];
    paper.versions.push({ version: nextVersion, gdriveFileId: driveFile.id, fileName: req.file.originalname, mimeType: req.file.mimetype, submittedAt: new Date() });
    paper.status = 'Revisions Submitted';
    await paper.save();

    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER;

    return res.json({ message: 'Revision submitted', paper });
  } catch (err) { next(err); }
}

export async function listPapers(req, res, next) {
  try {
    const user = req.user;
    let query = {};
    if (user.role === 'Author') {
      query.author = user.id;
    } else if (user.role === 'Reviewer') {
      query.assignedReviewers = new mongoose.Types.ObjectId(user.id);
    }

    const { status, author: authorEmail, reviewer } = req.query || {};
    if (typeof status === 'string' && status.length > 0 && status !== 'All') {
      query.status = status;
    } else if (user.role === 'Reviewer' && status !== 'All') {
      // Default reviewer view (when not explicitly asking for All): only active papers
      query.status = { $nin: ['Accepted', 'Rejected'] };
    }
    if (reviewer && user.role === 'Admin') {
      query.assignedReviewers = new mongoose.Types.ObjectId(reviewer);
    }
    if (authorEmail) {
      const regex = new RegExp(authorEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      const authors = await User.find({ email: regex }).select('_id');
      const ids = authors.map(a => a._id);
      query.author = { $in: ids };
    }

    const papers = await Paper.find(query)
      .populate('author', 'email role name')
      .populate('assignedReviewers', 'email role name')
      .sort({ createdAt: -1 });
    return res.json({ papers });
  } catch (err) { next(err); }
}

export async function getPaperHistory(req, res, next) {
  try {
    const { id } = req.params;
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { paperId: id };
    const paper = await Paper.findOne(query)
      .populate('author', 'email name')
      .populate('assignedReviewers', 'email name role');
    if (!paper) return res.status(404).json({ message: 'Paper not found' });

    // Access: Admin, Author (owner), or assigned Reviewer
    const user = req.user;
    const isAdmin = user.role === 'Admin';
    const isAuthor = paper.author?._id?.toString?.() === user.id;
    const isReviewer = (paper.assignedReviewers || []).map(r=> r._id?.toString?.()).includes(user.id);
    if (!(isAdmin || isAuthor || isReviewer)) return res.status(403).json({ message: 'Forbidden' });
    return res.json({
      paperId: paper.paperId,
      title: paper.title,
      status: paper.status,
      currentVersion: paper.currentVersion,
      versions: paper.versions || [],
      author: paper.author,
      assignedReviewers: paper.assignedReviewers,
    });
  } catch (err) { next(err); }
}

// (duplicate block removed)

export async function assignReviewers(req, res, next) {
  try {
    const { id } = req.params; // paper id (Mongo _id) or human paperId
    const { reviewerIds } = req.body; // array of user IDs
    if (!Array.isArray(reviewerIds) || reviewerIds.length === 0) {
      return res.status(400).json({ message: 'reviewerIds required' });
    }

    const query = mongoose.isValidObjectId(id) ? { _id: id } : { paperId: id };
    const paper = await Paper.findOne(query).populate('author');
    if (!paper) return res.status(404).json({ message: 'Paper not found' });

    const reviewers = await User.find({ _id: { $in: reviewerIds }, role: 'Reviewer' });
    paper.assignedReviewers = reviewers.map(r => r._id);
    await paper.save();

    // Notify author and reviewers
    if (paper.author?.email) {
      await sendEmail({ to: paper.author.email, subject: 'Reviewers assigned', html: templates.reviewerAssignment(paper.title) });
    }
    const reviewerEmails = reviewers.map(r => r.email).filter(Boolean);
    if (reviewerEmails.length) {
      await sendEmail({ to: reviewerEmails.join(',') , subject: 'You have been assigned a paper', html: `<p>Assigned paper: <b>${paper.title}</b> (${paper.paperId})</p>` });
    }

    return res.json({ message: 'Reviewers assigned', paper });
  } catch (err) { next(err); }
}
