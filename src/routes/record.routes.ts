import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/rbac.middleware.js";
import { createRecord, deleteRecord, getRecords, updateRecord }  from "../controllers/record.controller.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  createRecord
);

router.get(
  "/",
  authenticate,
  authorize(["admin", "analyst"]),
  getRecords
);

router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  updateRecord
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deleteRecord
);

export default router;