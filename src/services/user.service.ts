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

export const getUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, role, is_active, created_at 
     FROM users`
  );
  return result.rows;
};

export const getUserById = async (id: string) => {
  const result = await pool.query(
    `SELECT id, name, email, role, is_active, created_at 
     FROM users WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
};

export const updateUserRole = async (id: string, role: string) => {
  const validRoles = ["viewer", "analyst", "admin"];

  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const result = await pool.query(
    `UPDATE users 
     SET role = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, name, email, role`,
    [role, id]
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
};

export const toggleUserStatus = async (id: string) => {
  const result = await pool.query(
    `UPDATE users 
     SET is_active = NOT is_active, updated_at = NOW()
     WHERE id = $1
     RETURNING id, name, email, is_active`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
};