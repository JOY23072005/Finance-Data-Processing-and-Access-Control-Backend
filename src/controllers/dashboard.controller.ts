import type { Request,Response } from "express";
import * as dashboardService from "../services/dashboard.service.js";

export const getSummary = async (_req: Request, res: Response) => {
  const data = await dashboardService.getSummary();
  res.json(data);
};

export const getCategories = async (_req: Request, res: Response) => {
  const data = await dashboardService.getCategoryBreakdown();
  res.json(data);
};

export const getTrends = async (_req: Request, res: Response) => {
  const data = await dashboardService.getTrends();
  res.json(data);
};

export const getRecent = async (_req: Request, res: Response) => {
  const data = await dashboardService.getRecent();
  res.json(data);
};