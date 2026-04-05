import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/rbac.middleware.js";
import { getCategories, getRecent, getSummary, getTrends } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
  "/summary",
  authenticate,
  authorize(["admin", "analyst", "viewer"]),
  getSummary
);

router.get(
  "/categories",
  authenticate,
  authorize(["admin", "analyst"]),
  getCategories
);

router.get(
  "/trends",
  authenticate,
  authorize(["admin", "analyst"]),
  getTrends
);

router.get(
  "/recent",
  authenticate,
  authorize(["admin", "analyst"]),
  getRecent
);

export default router;