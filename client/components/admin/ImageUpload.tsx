import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { uploadImage } from "@/lib/upload";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onClear?: () => void;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onClear,
  className,
}: ImageUploadProps) {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (file: File) => {
    if (!token) {
      setError("Authentication required");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const { url } = await uploadImage(file, token);
      onChange(url);
    } catch (e: any) {
      setError(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleClear = () => {
    onChange("");
    if (onClear) onClear();
    setError(null);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Preview */}
      {value && (
        <div className="relative group rounded-lg overflow-hidden border bg-muted">
          <img
            src={value}
            alt="Upload preview"
            className="w-full h-48 sm:h-56 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 md:transition-opacity flex items-center justify-center gap-2 md:opacity-0 opacity-100">
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleClear}
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-black/75 text-white text-xs px-2 py-1 rounded truncate">
              {value}
            </div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!value && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            uploading && "pointer-events-none opacity-50"
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <>
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-sm font-medium">Uploading...</p>
              </>
            ) : (
              <>
                <div className="rounded-full bg-primary/10 p-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Drop your image here, or{" "}
                    <span className="text-primary">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Manual URL Input */}
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Or paste image URL..."
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        {value && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive flex items-start gap-2">
          <span className="font-medium">Error:</span>
          <span>{error}</span>
        </div>
      )}

      {/* Upload Info */}
      {value && !error && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="h-3 w-3" />
          <span>Image uploaded successfully</span>
        </div>
      )}
    </div>
  );
}
