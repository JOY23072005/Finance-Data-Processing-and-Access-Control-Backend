// src/routes/category.routes.ts
import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/rbac.middleware.js";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/",
    authenticate, 
    authorize(["admin"]), 
    createCategory);

router.get("/", 
    authenticate, 
    getCategories);

router.patch("/:id", 
    authenticate, 
    authorize(["admin"]), 
    updateCategory);

router.delete("/:id", 
    authenticate, 
    authorize(["admin"]), 
    deleteCategory);

export default router;