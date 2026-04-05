import type { Request, Response } from "express";
import * as recordService from "../services/record.service.js";

export const createRecord = async (req: any, res: Response) => {
  try {
    const record = await recordService.createRecord(req.body, req.user.id);
    res.status(201).json(record);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getRecords = async (req: Request, res: Response) => {
  try {
    const records = await recordService.getRecords(req.query);
    res.json(records);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateRecord = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const recordId = Array.isArray(id) ? id[0] : id;

    if (!recordId) {
      return res.status(400).json({ message: "Record ID is required" });
    }
    const record = await recordService.updateRecord(recordId, req.body,req.user.id);
    res.json(record);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const recordId = Array.isArray(id) ? id[0] : id;

    if (!recordId) {
      return res.status(400).json({ message: "Record ID is required" });
    }
    const result = await recordService.deleteRecord(recordId);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};