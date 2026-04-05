import type { Request, Response } from "express";
import * as userService from "../services/user.service.js";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = Array.isArray(id) ? id[0] : id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateRole = async (req: any, res: Response) => {
  try {
    const { role } = req.body;

    // prevent self role change (good practice 🔥)
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: "Cannot change your own role" });
    }

    const user = await userService.updateUserRole(req.params.id, role);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const toggleStatus = async (req: any, res: Response) => {
  try {
    const user = await userService.toggleUserStatus(req.params.id);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};