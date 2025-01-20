import { Router } from "express";
import { viewReport, createReport, updateReport } from '../controllers/report-controller.js';
import protect, { adminOnly } from '../middleware/auth-middleware.js'

const router = Router();

router.get("/", protect, adminOnly, viewReport);
router.post("/:id", protect, createReport);
router.put("/:id", protect, adminOnly, updateReport);

export default router;