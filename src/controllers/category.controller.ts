import type { Request, Response } from "express";
import * as categoryService from "../services/category.service.js";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Name and type required" });
    }

    const category = await categoryService.createCategory(name, type);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const categoryId = Array.isArray(id) ? id[0] : id;

    if (!categoryId) {
      return res.status(400).json({ message: "Record ID is required" });
    }

    const category = await categoryService.updateCategory(
      categoryId,
      req.body
    );
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const categoryId = Array.isArray(id) ? id[0] : id;

    if (!categoryId) {
      return res.status(400).json({ message: "Record ID is required" });
    }
    const result = await categoryService.deleteCategory(categoryId);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};