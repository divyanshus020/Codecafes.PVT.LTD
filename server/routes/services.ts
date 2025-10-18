import { RequestHandler } from "express";
import { supabase, dbEnabled } from "../db/supabase";

export const listServices: RequestHandler = async (_req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("title", { ascending: true });
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const createService: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { title, slug, description, price } = req.body || {};
  
  if (!title || !slug)
    return res.status(400).json({ error: "title and slug required" });
  
  // Check for duplicate slug
  const { data: dup } = await supabase
    .from("services")
    .select("id")
    .eq("slug", slug)
    .single();
  
  if (dup)
    return res.status(409).json({ error: "slug already exists" });
  
  const { data, error } = await supabase
    .from("services")
    .insert({
      title,
      slug,
      description: description || null,
      price: price ?? null,
    })
    .select()
    .single();
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

export const updateService: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { id } = req.params as any;
  const { title, slug, description, price } = req.body || {};
  
  // Check if exists
  const { data: exists } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();
  
  if (!exists)
    return res.status(404).json({ error: "not found" });
  
  // Check for duplicate slug
  if (slug) {
    const { data: dup } = await supabase
      .from("services")
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
  if (description !== undefined) updateData.description = description;
  if (price !== undefined) updateData.price = price;
  
  const { data, error } = await supabase
    .from("services")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const deleteService: RequestHandler = async (req, res) => {
  if (!dbEnabled)
    return res.status(503).json({ error: "Database not configured" });
  
  const { id } = req.params as any;
  
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
};
