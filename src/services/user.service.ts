// src/services/user.service.ts
import pool from "../config/postgres.js";

export const createUser = async (data: any) => {
  const { name, email, password, role } = data;

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role`,
    [name, email, password, role || "viewer"]
  );

  return result.rows[0];
};