import Paper from '../models/Paper.js';
import { getDriveFile } from '../services/gdriveService.js';
import { uploadToDrive } from '../services/gdriveService.js';
import mongoose from 'mongoose';

export async function downloadFile(req, res, next) {
  try {
    const { id } = req.params; // paper id or paperId
    const user = req.user;

    const query = mongoose.isValidObjectId(id) ? { _id: id } : { paperId: id };
    const paper = await Paper.findOne(query);
    if (!paper) return res.status(404).json({ message: 'Paper not found' });

    const isAuthor = paper.author.toString() === user.id;
    const isReviewer = paper.assignedReviewers.map(r => r.toString()).includes(user.id);
    const isAdmin = user.role === 'Admin';

    if (!(isAdmin || isAuthor || isReviewer)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (!paper.file?.gdriveFileId) return res.status(404).json({ message: 'File not found' });

    const stream = await getDriveFile(paper.file.gdriveFileId);

    res.setHeader('Content-Type', paper.file.mimeType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${paper.file.originalName || 'paper'}"`);
    stream.on('error', next);
    stream.pipe(res);
  } catch (err) { next(err); }
}

export async function uploadFile(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: 'File is required' });
    const timestamp = Date.now();
    const name = `${req.body.prefix || 'file'}_${timestamp}_${req.file.originalname}`.replace(/[^a-zA-Z0-9._-]/g, '_');
    const driveFile = await uploadToDrive({
      name,
      mimeType: req.file.mimetype,
      body: Buffer.from(req.file.buffer),
    });
    return res.status(201).json({
      file: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        gdriveFileId: driveFile.id,
        webViewLink: driveFile.webViewLink || null,
        name: driveFile.name,
      }
    });
  } catch (err) { next(err); }
}
