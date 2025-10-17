import { RequestHandler } from "express";
import { pool } from "@/server/db/mysql";

export const listServices: RequestHandler = async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM services ORDER BY title ASC");
  res.json(rows);
};

export const createService: RequestHandler = async (req, res) => {
  const { title, slug, description, price } = req.body || {};
  if (!title || !slug) return res.status(400).json({ error: "title and slug required" });
  const [dup] = await pool.query("SELECT id FROM services WHERE slug = :slug", { slug });
  if ((dup as any[]).length) return res.status(409).json({ error: "slug already exists" });
  const [result] = await pool.query(
    `INSERT INTO services (title, slug, description, price) VALUES (:title,:slug,:description,:price)`,
    { title, slug, description: description || null, price: price ?? null },
  );
  const id = (result as any).insertId;
  const [rows] = await pool.query("SELECT * FROM services WHERE id = :id", { id });
  res.status(201).json((rows as any[])[0]);
};

export const updateService: RequestHandler = async (req, res) => {
  const { id } = req.params as any;
  const { title, slug, description, price } = req.body || {};
  const [exists] = await pool.query("SELECT * FROM services WHERE id = :id", { id });
  if (!(exists as any[]).length) return res.status(404).json({ error: "not found" });
  if (slug) {
    const [dup] = await pool.query("SELECT id FROM services WHERE slug = :slug AND id <> :id", { slug, id });
    if ((dup as any[]).length) return res.status(409).json({ error: "slug already exists" });
  }
  await pool.query(
    `UPDATE services SET 
      title = COALESCE(:title, title),
      slug = COALESCE(:slug, slug),
      description = :description,
      price = :price
    WHERE id = :id`,
    { id, title: title ?? null, slug: slug ?? null, description: description ?? null, price: price ?? null },
  );
  const [rows] = await pool.query("SELECT * FROM services WHERE id = :id", { id });
  res.json((rows as any[])[0]);
};

export const deleteService: RequestHandler = async (req, res) => {
  const { id } = req.params as any;
  await pool.query("DELETE FROM services WHERE id = :id", { id });
  res.status(204).end();
};
