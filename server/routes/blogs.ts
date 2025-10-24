import { RequestHandler } from "express";
import { supabase, dbEnabled } from "../db/supabase";

export const listBlogs: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const isAuthed = Boolean((req as any).user);
  
  let query = supabase.from("blogs").select("*");
  
  if (!isAuthed) {
    query = query.eq("status", "published");
  }
  
  query = query.order("created_at", { ascending: false });
  
  const { data, error } = await query;
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const getBlogBySlug: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { slug } = req.params as any;
  const isAuthed = Boolean((req as any).user);
  
  let query = supabase.from("blogs").select("*").eq("slug", slug);
  
  if (!isAuthed) {
    query = query.eq("status", "published");
  }
  
  const { data, error } = await query.single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(500).json({ error: error.message });
  }
  
  res.json(data);
};

export const createBlog: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { title, slug, excerpt, content, cover_image, author_name, author_image, status, published_at } =
    req.body || {};
  
  if (!title || !slug || !content)
    return res.status(400).json({ error: "title, slug, content required" });
  
  // Check for duplicate slug
  const { data: dup } = await supabase
    .from("blogs")
    .select("id")
    .eq("slug", slug)
    .single();
  
  if (dup)
    return res.status(409).json({ error: "slug already exists" });
  
  const { data, error } = await supabase
    .from("blogs")
    .insert({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      cover_image: cover_image || null,
      author_name: author_name || null,
      author_image: author_image || null,
      status: status || "draft",
      published_at: published_at || null,
    })
    .select()
    .single();
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

export const updateBlog: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { id } = req.params as any;
  const { title, slug, excerpt, content, cover_image, author_name, author_image, status, published_at } =
    req.body || {};
  
  // Check if exists
  const { data: exists } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  
  if (!exists)
    return res.status(404).json({ error: "not found" });
  
  // Check for duplicate slug
  if (slug) {
    const { data: dup } = await supabase
      .from("blogs")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .single();
    
    if (dup)
      return res.status(409).json({ error: "slug already exists" });
  }
  
  const updateData: any = {};
  if (title !== undefined) updateData.title = title;
  if (slug !== undefined) updateData.slug = slug;
  if (excerpt !== undefined) updateData.excerpt = excerpt;
  if (content !== undefined) updateData.content = content;
  if (cover_image !== undefined) updateData.cover_image = cover_image;
  if (author_name !== undefined) updateData.author_name = author_name;
  if (author_image !== undefined) updateData.author_image = author_image;
  if (status !== undefined) updateData.status = status;
  if (published_at !== undefined) updateData.published_at = published_at;
  
  const { data, error } = await supabase
    .from("blogs")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const deleteBlog: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { id } = req.params as any;
  
  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
};
