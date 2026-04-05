import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    res.json(data);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const data = await registerUser(name, email, password);

    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};