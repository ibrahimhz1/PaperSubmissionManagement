import User from '../models/User.js';

export async function searchReviewers(req, res, next) {
  try {
    const q = (req.query.q || '').trim();
    const filter = { role: 'Reviewer', isVerified: true };
    if (q) {
      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [ { name: regex }, { email: regex } ];
    }
    const reviewers = await User.find(filter).select('_id name email').limit(20);
    return res.json({ reviewers });
  } catch (err) { next(err); }
}
