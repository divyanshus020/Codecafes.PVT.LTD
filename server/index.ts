import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { initSchema, dbEnabled } from "./db/supabase";
import { login } from "./routes/admin";
import { requireAuth } from "./middleware/auth";
import { listBlogs, createBlog, updateBlog, deleteBlog } from "./routes/blogs";
import {
  listCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from "./routes/case-studies";
import {
  listServices,
  createService,
  updateService,
  deleteService,
} from "./routes/services";
import { uploadRouter } from "./routes/upload";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Boot
  if (dbEnabled) {
    initSchema().catch((e) => console.error("DB init failed", e));
  }
  // Static uploads
  app.use("/uploads", express.static("public/uploads"));

  // Health
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Demo
  app.get("/api/demo", handleDemo);

  // Auth
  app.post("/api/admin/login", login);

  // Blogs
  app.get("/api/blogs", listBlogs);
  app.post("/api/blogs", requireAuth, createBlog);
  app.put("/api/blogs/:id", requireAuth, updateBlog);
  app.delete("/api/blogs/:id", requireAuth, deleteBlog);

  // Case studies
  app.get("/api/case-studies", listCaseStudies);
  app.post("/api/case-studies", requireAuth, createCaseStudy);
  app.put("/api/case-studies/:id", requireAuth, updateCaseStudy);
  app.delete("/api/case-studies/:id", requireAuth, deleteCaseStudy);

  // Services
  app.get("/api/services", listServices);
  app.post("/api/services", requireAuth, createService);
  app.put("/api/services/:id", requireAuth, updateService);
  app.delete("/api/services/:id", requireAuth, deleteService);

  // Uploads
  app.use("/api/upload", uploadRouter);

  return app;
}
