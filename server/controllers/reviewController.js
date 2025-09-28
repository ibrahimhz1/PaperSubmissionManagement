import mongoose from 'mongoose';
import Review from '../models/Review.js';
import Paper from '../models/Paper.js';
import User from '../models/User.js';
import { sendEmail, templates } from '../services/emailService.js';

function mapRecommendationToStatus(recommendation) {
  switch (recommendation) {
    case 'Accept': return 'Accepted';
    case 'Reject': return 'Rejected';
    case 'Minor Revision':
    case 'Major Revision':
      return 'Revisions Requested';
    default:
      return 'Under Review';
  }
}

export async function createReview(req, res, next) {
  try {
    const { id } = req.params; // paper id or paperId
    const { comments, recommendation } = req.body;
    const reviewerId = req.user.id;

    const query = mongoose.isValidObjectId(id) ? { _id: id } : { paperId: id };
    const paper = await Paper.findOne(query).populate('author');
    if (!paper) return res.status(404).json({ message: 'Paper not found' });

    const assigned = (paper.assignedReviewers || []).map(r => r.toString());
    const isAdmin = req.user.role === 'Admin';
    if (!isAdmin && !assigned.includes(reviewerId)) {
      return res.status(403).json({ message: 'You are not assigned to this paper' });
    }

    const review = await Review.create({
      paper: paper._id,
      reviewer: new mongoose.Types.ObjectId(reviewerId),
      comments,
      recommendation,
    });

    // Update paper status based on recommendation
    const newStatus = mapRecommendationToStatus(recommendation);
    if (paper.status !== newStatus) {
      paper.status = newStatus;
      await paper.save();
    }

    // Notify Admin and Author
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      await sendEmail({ to: adminEmail, subject: 'Review submitted', html: templates.reviewSubmitted(paper.title) });
    }
    if (paper.author?.email) {
      await sendEmail({ to: paper.author.email, subject: 'Review outcome', html: templates.reviewOutcome(paper.title, paper.status) });
    }

    return res.status(201).json({ message: 'Review submitted', review });
  } catch (err) { next(err); }
}

export async function listReviews(req, res, next) {
  try {
    const { id } = req.params; // paper id or paperId
    const user = req.user;

    const query = mongoose.isValidObjectId(id) ? { _id: id } : { paperId: id };
    const paper = await Paper.findOne(query);
    if (!paper) return res.status(404).json({ message: 'Paper not found' });

    // Access rules: Admin can view; Author can view if owns; Reviewer can view if assigned
    const isAuthor = paper.author.toString() === user.id;
    const isReviewer = paper.assignedReviewers.map(r => r.toString()).includes(user.id);

    if (!(user.role === 'Admin' || isAuthor || isReviewer)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const reviews = await Review.find({ paper: paper._id })
      .populate('reviewer', 'email role name')
      .sort({ createdAt: -1 });

    return res.json({ reviews });
  } catch (err) { next(err); }
}
