import { Router } from 'express';
import { createReview, listReviews } from '../controllers/reviewController.js';
import { auth } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
const router = Router();

// POST /api/papers/:id/reviews (Reviewer only)
router.post('/papers/:id/reviews', auth(true), requireRole('Reviewer', 'Admin'), createReview);

// GET /api/papers/:id/reviews (Admin + Author + assigned Reviewer)
router.get('/papers/:id/reviews', auth(true), listReviews);

export default router;
