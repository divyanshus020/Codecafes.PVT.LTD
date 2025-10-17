import { RequestHandler } from "express";
import { pool } from "../db/mysql";

export const listCaseStudies: RequestHandler = async (req, res) => {
  const isAuthed = Boolean((req as any).user);
  const [rows] = await pool.query(
    isAuthed ? "SELECT * FROM case_studies ORDER BY created_at DESC" : "SELECT * FROM case_studies WHERE status='published' ORDER BY published_at DESC, created_at DESC",
  );
  res.json(rows);
};

export const createCaseStudy: RequestHandler = async (req, res) => {
  const { title, slug, summary, content, cover_image, status, published_at } = req.body || {};
  if (!title || !slug || !content) return res.status(400).json({ error: "title, slug, content required" });
  const [dup] = await pool.query("SELECT id FROM case_studies WHERE slug = :slug", { slug });
  if ((dup as any[]).length) return res.status(409).json({ error: "slug already exists" });
  const [result] = await pool.query(
    `INSERT INTO case_studies (title, slug, summary, content, cover_image, status, published_at) VALUES (:title,:slug,:summary,:content,:cover_image,:status,:published_at)`,
    { title, slug, summary: summary || null, content, cover_image: cover_image || null, status: status || "draft", published_at: published_at || null },
  );
  const id = (result as any).insertId;
  const [rows] = await pool.query("SELECT * FROM case_studies WHERE id = :id", { id });
  res.status(201).json((rows as any[])[0]);
};

export const updateCaseStudy: RequestHandler = async (req, res) => {
  const { id } = req.params as any;
  const { title, slug, summary, content, cover_image, status, published_at } = req.body || {};
  const [exists] = await pool.query("SELECT * FROM case_studies WHERE id = :id", { id });
  if (!(exists as any[]).length) return res.status(404).json({ error: "not found" });
  if (slug) {
    const [dup] = await pool.query("SELECT id FROM case_studies WHERE slug = :slug AND id <> :id", { slug, id });
    if ((dup as any[]).length) return res.status(409).json({ error: "slug already exists" });
  }
  await pool.query(
    `UPDATE case_studies SET 
      title = COALESCE(:title, title),
      slug = COALESCE(:slug, slug),
      summary = :summary,
      content = COALESCE(:content, content),
      cover_image = :cover_image,
      status = COALESCE(:status, status),
      published_at = :published_at
    WHERE id = :id`,
    { id, title: title ?? null, slug: slug ?? null, summary: summary ?? null, content: content ?? null, cover_image: cover_image ?? null, status: status ?? null, published_at: published_at ?? null },
  );
  const [rows] = await pool.query("SELECT * FROM case_studies WHERE id = :id", { id });
  res.json((rows as any[])[0]);
};

export const deleteCaseStudy: RequestHandler = async (req, res) => {
  const { id } = req.params as any;
  await pool.query("DELETE FROM case_studies WHERE id = :id", { id });
  res.status(204).end();
};
