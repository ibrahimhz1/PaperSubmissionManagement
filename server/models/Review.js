import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: { type: String },
  recommendation: { type: String, enum: ['Accept', 'Minor Revision', 'Major Revision', 'Reject'], required: true },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
