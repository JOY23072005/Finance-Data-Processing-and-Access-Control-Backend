// src/routes/user.routes.ts
import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/rbac.middleware.js";
import { createUser, getUser, getUsers, toggleStatus, updateRole } from "../controllers/user.controller.js";

const router = express.Router();

// Admin only routes
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  createUser
);

router.get("/", authenticate, authorize(["admin"]), getUsers);

router.get("/:id", authenticate, authorize(["admin"]),getUser);

router.patch(
  "/:id/role",
  authenticate,
  authorize(["admin"]),
  updateRole
);

router.patch(
  "/:id/status",
  authenticate,
  authorize(["admin"]),
  toggleStatus
);

export default router;