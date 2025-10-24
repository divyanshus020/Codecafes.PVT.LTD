import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ContentPreview } from "./ContentPreview";

interface ParsedData {
  title: string;
  content: string;
  excerpt: string;
  images: string[];
  metadata: {
    filename: string;
    size: number;
    type: string;
  };
}

interface DocumentParserProps {
  onDataExtracted: (data: ParsedData) => void;
}

export function DocumentParser({ onDataExtracted }: DocumentParserProps) {
  const { token } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [previewData, setPreviewData] = useState<ParsedData | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus("idle");
      setErrorMessage("");
    }
  };

  const handleParse = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file first");
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");
    setErrorMessage("");
    setProgress(0);
    setProgressMessage("");

    try {
      // Simulate progress stages
      setProgress(10);
      setProgressMessage("Uploading document...");
      
      const formData = new FormData();
      formData.append("document", selectedFile);

      // Simulate upload progress
      await new Promise(resolve => setTimeout(resolve, 300));
      setProgress(30);
      setProgressMessage("Processing file...");

      const response = await fetch("/api/parse-document", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      setProgress(60);
      setProgressMessage("Extracting content...");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to parse document");
      }

      const result = await response.json();
      
      setProgress(80);
      setProgressMessage("Analyzing document structure...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (result.success && result.data) {
        const stats = result.stats || {};
        const charCount = stats.characterCount || result.data.content.length;
        const wordCount = stats.wordCount || 0;
        
        setProgress(100);
        setProgressMessage(
          `Extracted ${charCount.toLocaleString()} characters (${wordCount.toLocaleString()} words) successfully!`
        );
        
        await new Promise(resolve => setTimeout(resolve, 500));
        setUploadStatus("success");
        setPreviewData(result.data);
        onDataExtracted(result.data);
        
        // Don't auto-reset, let user review the preview
        // They can manually upload another file
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Parse error:", error);
      setUploadStatus("error");
      setErrorMessage(error.message || "Failed to parse document");
      setProgress(0);
      setProgressMessage("");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-accent/30 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="size-5 text-primary" />
        <h3 className="font-semibold">Extract from Document</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Upload a PDF, Word document, or text file to automatically extract content
      </p>

      <div className="space-y-3">
        {/* File Input */}
        <div>
          <label
            htmlFor="document-upload"
            className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <div className="text-center">
              <Upload className="size-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">
                {selectedFile ? selectedFile.name : "Choose a file"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOCX, DOC, or TXT (max 10MB)
              </p>
            </div>
            <input
              id="document-upload"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Parse Button */}
        {selectedFile && (
          <Button
            onClick={handleParse}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Parsing...
              </>
            ) : (
              <>
                <FileText className="mr-2 size-4" />
                Extract Content
              </>
            )}
          </Button>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{progressMessage}</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Status Messages */}
        {uploadStatus === "success" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded-md">
              <CheckCircle className="size-4" />
              Content extracted successfully!
            </div>
            
            {/* Show preview of extracted content */}
            {previewData && (
              <ContentPreview 
                content={previewData.content} 
                title={previewData.title}
              />
            )}
            
            {/* Reset button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                setSelectedFile(null);
                setUploadStatus("idle");
                setProgress(0);
                setProgressMessage("");
                setPreviewData(null);
              }}
            >
              Upload Another Document
            </Button>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
            <XCircle className="size-4 mt-0.5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="text-xs text-muted-foreground bg-background/50 p-3 rounded-md">
        <p className="font-medium mb-1">📝 Note:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>✅ PDF files (.pdf) - Full text extraction with formatting</li>
          <li>✅ Word documents (.docx) - Full HTML conversion</li>
          <li>✅ Text files (.txt) - Complete content extraction</li>
          <li>⚠️ Legacy .doc files - Limited support (convert to .docx)</li>
          <li>Extracted content will auto-fill the form fields below</li>
        </ul>
      </div>
    </div>
  );
}
