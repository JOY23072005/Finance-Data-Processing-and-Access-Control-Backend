import pool from "../config/postgres.js";

export const getSummary = async () => {
  const result = await pool.query(`
    SELECT
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense,
      SUM(CASE 
        WHEN type='income' THEN amount 
        ELSE -amount 
      END) AS net_balance
    FROM records
    WHERE deleted_at IS NULL
  `);

  return result.rows[0];
};

export const getCategoryBreakdown = async () => {
  const result = await pool.query(`
    SELECT 
      c.name AS category,
      SUM(r.amount) AS total
    FROM records r
    JOIN categories c ON r.category_id = c.id
    WHERE r.deleted_at IS NULL
    GROUP BY c.name
    ORDER BY total DESC
  `);

  return result.rows;
};

export const getTrends = async () => {
  const result = await pool.query(`
    SELECT 
      DATE_TRUNC('month', date) AS month,
      SUM(amount) FILTER (WHERE type='income') AS income,
      SUM(amount) FILTER (WHERE type='expense') AS expense
    FROM records
    WHERE deleted_at IS NULL
    GROUP BY month
    ORDER BY month
  `);

  return result.rows;
};

export const getRecent = async () => {
  const result = await pool.query(`
    SELECT 
      r.id,
      r.amount,
      r.type,
      c.name AS category,
      r.date
    FROM records r
    JOIN categories c ON r.category_id = c.id
    WHERE r.deleted_at IS NULL
    ORDER BY r.created_at DESC
    LIMIT 5
  `);

  return result.rows;
};