import { Router } from 'express';
import { submitPaper, listPapers, assignReviewers, resubmitPaper, getPaperHistory } from '../controllers/paperController.js';
import { auth } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
const router = Router();

// POST /api/papers -> submit paper (Author)
router.post('/', auth(true), requireRole('Author', 'Admin'), upload.single('file'), submitPaper);

// GET /api/papers -> list papers (role-based)
router.get('/', auth(true), listPapers);

// POST /api/papers/:id/assign -> assign reviewers (Admin)
router.post('/:id/assign', auth(true), requireRole('Admin'), assignReviewers);

// POST /api/papers/:id/resubmit -> author resubmits revised file
router.post('/:id/resubmit', auth(true), requireRole('Author', 'Admin'), upload.single('file'), resubmitPaper);

// GET /api/papers/:id/history -> history (access enforced in controller)
router.get('/:id/history', auth(true), getPaperHistory);

export default router;
