import { Request, RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

/**
 * Format extracted content to improve readability
 * Adds proper HTML structure, paragraphs, headings, etc.
 */
function formatContent(content: string, fileType: string): string {
  let formatted = content;

  // Remove excessive whitespace
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  // For plain text or PDF content with <br> tags
  if (formatted.includes('<br>')) {
    // Split by double line breaks to create paragraphs
    const paragraphs = formatted.split(/<br>\s*<br>/gi);
    formatted = paragraphs
      .map(para => {
        para = para.replace(/<br>/gi, ' ').trim();
        if (!para) return '';
        
        // Detect headings (lines in ALL CAPS or starting with numbers)
        if (para.length < 100 && (para === para.toUpperCase() || /^\d+\.?\s+/.test(para))) {
          return `<h2>${para}</h2>`;
        }
        
        return `<p>${para}</p>`;
      })
      .filter(para => para)
      .join('\n');
  }
  
  // For DOCX content (already has HTML tags from mammoth)
  if (fileType === '.docx' && formatted.includes('<p>')) {
    // Mammoth already provides good HTML, just clean it up
    formatted = formatted
      .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
      .replace(/\n{3,}/g, '\n\n'); // Remove excessive line breaks
  }

  // Add proper spacing between elements
  formatted = formatted
    .replace(/<\/h([1-6])>/g, '</h$1>\n')
    .replace(/<\/p>/g, '</p>\n')
    .replace(/<\/ul>/g, '</ul>\n')
    .replace(/<\/ol>/g, '</ol>\n')
    .replace(/<\/blockquote>/g, '</blockquote>\n');

  return formatted.trim();
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = "public/temp";
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DOCX, DOC, and TXT files are allowed."));
    }
  },
});

export const uploadMiddleware = upload.single("document");

/**
 * Parse document and extract content
 * This is a basic implementation - for production, you'd want to use libraries like:
 * - pdf-parse for PDF files
 * - mammoth for DOCX files
 * - For now, we'll extract basic metadata and provide a structure
 */
export const parseDocument: RequestHandler = async (req, res) => {
  try {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = file.path;
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const fileBuffer = await fs.readFile(filePath);
    
    let parsedData: any = {
      title: "",
      content: "",
      excerpt: "",
      images: [],
      metadata: {
        filename: file.originalname,
        size: file.size,
        type: file.mimetype,
      },
    };

    if (fileExtension === ".pdf") {
      // Full PDF parsing with pdf-parse (dynamic import)
      try {
        // Use createRequire for CommonJS modules in ESM context
        const { createRequire } = await import('module');
        const require = createRequire(import.meta.url);
        const pdfParse = require("pdf-parse");
        
        const pdfData = await pdfParse(fileBuffer);
        const lines = pdfData.text.split('\n').filter(line => line.trim());
        
        parsedData.title = lines[0] || file.originalname.replace(".pdf", "");
        
        // Format PDF content with proper HTML structure
        const rawContent = pdfData.text.replace(/\n/g, '<br>');
        parsedData.content = formatContent(rawContent, fileExtension);
        
        parsedData.excerpt = lines.slice(0, 3).join(' ').substring(0, 200);
        parsedData.metadata.pages = pdfData.numpages;
      } catch (error) {
        console.error("PDF parsing error:", error);
        // Fallback if pdf-parse fails
        parsedData.title = file.originalname.replace(".pdf", "");
        parsedData.content = `<p>PDF file uploaded: ${file.originalname}</p><p>Unable to extract text content. The file has been uploaded successfully.</p>`;
        parsedData.excerpt = "PDF document uploaded";
      }
    } else if (fileExtension === ".docx") {
      // Full DOCX parsing with mammoth (dynamic import)
      const mammoth = await import("mammoth");
      const result = await mammoth.convertToHtml({ buffer: fileBuffer });
      const textResult = await mammoth.extractRawText({ buffer: fileBuffer });
      const lines = textResult.value.split('\n').filter(line => line.trim());
      
      parsedData.title = lines[0] || file.originalname.replace(".docx", "");
      
      // Format DOCX content (mammoth already provides HTML)
      parsedData.content = formatContent(result.value, fileExtension);
      
      parsedData.excerpt = lines.slice(0, 3).join(' ').substring(0, 200);
      
      // Include any warnings from mammoth
      if (result.messages && result.messages.length > 0) {
        parsedData.metadata.warnings = result.messages;
      }
    } else if (fileExtension === ".doc") {
      // DOC files - basic support (mammoth primarily supports DOCX)
      parsedData.title = file.originalname.replace(".doc", "");
      parsedData.content = `<p>Legacy .doc format detected. For best results, please convert to .docx format.</p>`;
      parsedData.excerpt = "Legacy Word document";
    } else if (fileExtension === ".txt") {
      // Plain text file
      const textContent = fileBuffer.toString("utf-8");
      const lines = textContent.split("\n").filter(line => line.trim());
      
      parsedData.title = lines[0] || "Untitled Document";
      
      // Format text content with proper HTML structure
      const rawContent = textContent.replace(/\n/g, '<br>');
      parsedData.content = formatContent(rawContent, fileExtension);
      
      parsedData.excerpt = lines.slice(1, 4).join(" ").substring(0, 200);
    }

    // Add extraction statistics
    const wordCount = parsedData.content.split(/\s+/).filter((word: string) => word.length > 0).length;
    parsedData.metadata.characterCount = parsedData.content.length;
    parsedData.metadata.wordCount = wordCount;
    parsedData.metadata.estimatedReadingTime = Math.ceil(wordCount / 200); // 200 words per minute

    // Clean up: delete the uploaded file after processing
    await fs.unlink(filePath);

    res.json({
      success: true,
      data: parsedData,
      stats: {
        characterCount: parsedData.content.length,
        wordCount: wordCount,
        excerptLength: parsedData.excerpt.length,
        hasTitle: !!parsedData.title,
      }
    });
  } catch (error: any) {
    console.error("Document parsing error:", error);
    
    // Clean up file if it exists
    const file = (req as any).file;
    if (file?.path) {
      try {
        await fs.unlink(file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }
    
    res.status(500).json({
      error: error.message || "Failed to parse document",
    });
  }
};

