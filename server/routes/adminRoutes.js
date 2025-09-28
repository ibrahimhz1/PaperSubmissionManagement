import { Router } from 'express';
import { searchReviewers } from '../controllers/adminController.js';
import { auth } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/admin/reviewers', auth(true), requireRole('Admin'), searchReviewers);

export default router;
