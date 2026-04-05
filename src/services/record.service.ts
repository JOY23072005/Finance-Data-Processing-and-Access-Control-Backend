import pool from "../config/postgres.js";

export const createRecord = async (data: any, creatorId: string) => {
  const { user_id, amount, type, category_id, note, date } = data;

  // validate user exists
  const userCheck = await pool.query(
    "SELECT * FROM users WHERE id = $1 AND is_active = true",
    [user_id]
  );

  if (userCheck.rows.length === 0) {
    throw new Error("Invalid user_id");
  }

  const result = await pool.query(
    `INSERT INTO records 
     (user_id, amount, type, category_id, note, date, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [user_id, amount, type, category_id, note, date, creatorId]
  );

  return result.rows[0];
};

export const getRecords = async (filters: any) => {
  let query = `
    SELECT r.*, c.name as category_name
    FROM records r
    LEFT JOIN categories c ON r.category_id = c.id
    WHERE r.deleted_at IS NULL
  `;

  const values: any[] = [];
  let index = 1;

  if (filters.type) {
    query += ` AND r.type = $${index++}`;
    values.push(filters.type);
  }

  if (filters.category) {
    query += ` AND c.name = $${index++}`;
    values.push(filters.category);
  }

  if (filters.startDate) {
    query += ` AND r.date >= $${index++}`;
    values.push(filters.startDate);
  }

  if (filters.endDate) {
    query += ` AND r.date <= $${index++}`;
    values.push(filters.endDate);
  }

  query += ` ORDER BY r.date DESC`;

  const result = await pool.query(query, values);
  return result.rows;
};

export const updateRecord = async (
  id: string,
  data: any,
  updaterId: string
) => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  // dynamically build query
  if (data.amount !== undefined) {
    fields.push(`amount = $${index++}`);
    values.push(data.amount);
  }

  if (data.type !== undefined) {
    fields.push(`type = $${index++}`);
    values.push(data.type);
  }

  if (data.category_id !== undefined) {
    fields.push(`category_id = $${index++}`);
    values.push(data.category_id);
  }

  if (data.note !== undefined) {
    fields.push(`note = $${index++}`);
    values.push(data.note);
  }

  if (data.date !== undefined) {
    fields.push(`date = $${index++}`);
    values.push(data.date);
  }

  // always update audit fields
  fields.push(`updated_at = NOW()`);
  fields.push(`updated_by = $${index++}`);
  values.push(updaterId);

  // final query
  const query = `
    UPDATE records
    SET ${fields.join(", ")}
    WHERE id = $${index} AND deleted_at IS NULL
    RETURNING *
  `;

  values.push(id);

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new Error("Record not found");
  }

  return result.rows[0];
};

export const deleteRecord = async (id: string) => {
  const result = await pool.query(
    `UPDATE records
     SET deleted_at = NOW()
     WHERE id = $1
     RETURNING id`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Record not found");
  }

  return { message: "Record deleted" };
};