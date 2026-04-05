// src/controllers/user.controller.ts
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