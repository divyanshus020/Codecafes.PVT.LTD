import { RequestHandler } from "express";
import { supabase, dbEnabled } from "../db/supabase";

export const listCaseStudies: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const isAuthed = Boolean((req as any).user);
  
  let query = supabase.from("case_studies").select("*");
  
  if (!isAuthed) {
    query = query.eq("status", "published");
  }
  
  query = query.order("created_at", { ascending: false });
  
  const { data, error } = await query;
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const createCaseStudy: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { title, slug, summary, content, cover_image, status, published_at } =
    req.body || {};
  
  if (!title || !slug || !content)
    return res.status(400).json({ error: "title, slug, content required" });
  
  // Check for duplicate slug
  const { data: dup } = await supabase
    .from("case_studies")
    .select("id")
    .eq("slug", slug)
    .single();
  
  if (dup)
    return res.status(409).json({ error: "slug already exists" });
  
  const { data, error } = await supabase
    .from("case_studies")
    .insert({
      title,
      slug,
      summary: summary || null,
      content,
      cover_image: cover_image || null,
      status: status || "draft",
      published_at: published_at || null,
    })
    .select()
    .single();
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

export const updateCaseStudy: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { id } = req.params as any;
  const { title, slug, summary, content, cover_image, status, published_at } =
    req.body || {};
  
  // Check if exists
  const { data: exists } = await supabase
    .from("case_studies")
    .select("*")
    .eq("id", id)
    .single();
  
  if (!exists)
    return res.status(404).json({ error: "not found" });
  
  // Check for duplicate slug
  if (slug) {
    const { data: dup } = await supabase
      .from("case_studies")
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
  if (summary !== undefined) updateData.summary = summary;
  if (content !== undefined) updateData.content = content;
  if (cover_image !== undefined) updateData.cover_image = cover_image;
  if (status !== undefined) updateData.status = status;
  if (published_at !== undefined) updateData.published_at = published_at;
  
  const { data, error } = await supabase
    .from("case_studies")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const deleteCaseStudy: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { id } = req.params as any;
  
  const { error } = await supabase
    .from("case_studies")
    .delete()
    .eq("id", id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
};
