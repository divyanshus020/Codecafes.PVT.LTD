import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { requireAuth } from "../middleware/auth";

const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9-_]+/gi, "-");
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}-${base}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new Error("Only images are allowed"));
  },
});

export const uploadRouter = Router();

uploadRouter.post("/image", requireAuth, upload.single("file"), (req, res) => {
  const f = (req as any).file as Express.Multer.File | undefined;
  if (!f) return res.status(400).json({ error: "file is required" });
  const publicUrl = `/uploads/${f.filename}`;
  res
    .status(201)
    .json({
      url: publicUrl,
      filename: f.filename,
      size: f.size,
      type: f.mimetype,
    });
});
