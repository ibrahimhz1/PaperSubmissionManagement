import { Router } from 'express';
import { downloadFile, uploadFile } from '../controllers/filesController.js';
import { auth } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

// GET /api/files/:id/download -> secure download (auth + role check)
router.get('/files/:id/download', auth(true), downloadFile);

// POST /api/files/upload -> upload to Google Drive (authorized users)
router.post('/files/upload', auth(true), upload.single('file'), uploadFile);

export default router;
