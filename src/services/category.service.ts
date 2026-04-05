import pool from "../config/postgres.js";

export const createCategory = async (name: string, type: string) => {
  const result = await pool.query(
    `INSERT INTO categories (name, type)
     VALUES ($1, $2)
     RETURNING *`,
    [name, type]
  );
  return result.rows[0];
};

export const getCategories = async () => {
  const result = await pool.query(`SELECT * FROM categories`);
  return result.rows;
};

export const updateCategory = async (id: string, data: any) => {
  const { name, type } = data;

  const result = await pool.query(
    `UPDATE categories
     SET name=$1, type=$2
     WHERE id=$3
     RETURNING *`,
    [name, type, id]
  );

  if (result.rows.length === 0) {
    throw new Error("Category not found");
  }

  return result.rows[0];
};

export const deleteCategory = async (id: string) => {
  // prevent deletion if used
  const usage = await pool.query(
    "SELECT COUNT(*) FROM records WHERE category_id = $1",
    [id]
  );

  if (Number(usage.rows[0].count) > 0) {
    throw new Error("Category in use");
  }

  await pool.query("DELETE FROM categories WHERE id=$1", [id]);

  return { message: "Category deleted" };
};