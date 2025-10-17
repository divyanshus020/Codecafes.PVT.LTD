import { RequestHandler } from "express";
import { pool } from "../db/mysql";

export const listBlogs: RequestHandler = async (req, res) => {
  const isAuthed = Boolean((req as any).user);
  const [rows] = await pool.query(
    isAuthed ? "SELECT * FROM blogs ORDER BY created_at DESC" : "SELECT * FROM blogs WHERE status='published' ORDER BY published_at DESC, created_at DESC",
  );
  res.json(rows);
};

export const createBlog: RequestHandler = async (req, res) => {
  const { title, slug, excerpt, content, cover_image, status, published_at } = req.body || {};
  if (!title || !slug || !content) return res.status(400).json({ error: "title, slug, content required" });
  const [dup] = await pool.query("SELECT id FROM blogs WHERE slug = :slug", { slug });
  if ((dup as any[]).length) return res.status(409).json({ error: "slug already exists" });
  const [result] = await pool.query(
    `INSERT INTO blogs (title, slug, excerpt, content, cover_image, status, published_at) VALUES (:title,:slug,:excerpt,:content,:cover_image,:status,:published_at)`,
    { title, slug, excerpt: excerpt || null, content, cover_image: cover_image || null, status: status || "draft", published_at: published_at || null },
  );
  const id = (result as any).insertId;
  const [rows] = await pool.query("SELECT * FROM blogs WHERE id = :id", { id });
  res.status(201).json((rows as any[])[0]);
};

export const updateBlog: RequestHandler = async (req, res) => {
  const { id } = req.params as any;
  const { title, slug, excerpt, content, cover_image, status, published_at } = req.body || {};
  const [exists] = await pool.query("SELECT * FROM blogs WHERE id = :id", { id });
  if (!(exists as any[]).length) return res.status(404).json({ error: "not found" });
  if (slug) {
    const [dup] = await pool.query("SELECT id FROM blogs WHERE slug = :slug AND id <> :id", { slug, id });
    if ((dup as any[]).length) return res.status(409).json({ error: "slug already exists" });
  }
  await pool.query(
    `UPDATE blogs SET 
      title = COALESCE(:title, title),
      slug = COALESCE(:slug, slug),
      excerpt = :excerpt,
      content = COALESCE(:content, content),
      cover_image = :cover_image,
      status = COALESCE(:status, status),
      published_at = :published_at
    WHERE id = :id`,
    { id, title: title ?? null, slug: slug ?? null, excerpt: excerpt ?? null, content: content ?? null, cover_image: cover_image ?? null, status: status ?? null, published_at: published_at ?? null },
  );
  const [rows] = await pool.query("SELECT * FROM blogs WHERE id = :id", { id });
  res.json((rows as any[])[0]);
};

export const deleteBlog: RequestHandler = async (req, res) => {
  const { id } = req.params as any;
  await pool.query("DELETE FROM blogs WHERE id = :id", { id });
  res.status(204).end();
};
