import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  originalName: String,
  mimeType: String,
  size: Number,
  gdriveFileId: String,
  webViewLink: String,
}, { _id: false });

const paperSchema = new mongoose.Schema({
  paperId: { type: String, unique: true },
  title: { type: String, required: true },
  abstract: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Submitted', 'Under Review', 'Accepted', 'Rejected', 'Revisions Requested', 'Revisions Submitted'], default: 'Submitted' },
  file: fileSchema,
  assignedReviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  currentVersion: { type: Number, default: 1 },
  versions: [{
    version: { type: Number, required: true },
    gdriveFileId: String,
    fileName: String,
    mimeType: String,
    submittedAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

export default mongoose.model('Paper', paperSchema);
