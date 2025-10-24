import { useState } from "react";
import DOMPurify from "dompurify";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentPreviewProps {
  content: string;
  title?: string;
}

export function ContentPreview({ content, title }: ContentPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content || content.length === 0) {
    return null;
  }

  // Sanitize HTML content to prevent XSS
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'code', 'pre', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
  });

  const previewLength = 300;
  const isLong = content.length > previewLength;
  const displayContent = isExpanded ? sanitizedContent : sanitizedContent.substring(0, previewLength);

  return (
    <div className="rounded-lg border bg-background p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-muted-foreground">
          Content Preview {title && `- ${title}`}
        </h4>
        {isLong && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-7 text-xs"
          >
            {isExpanded ? (
              <>
                <EyeOff className="mr-1 size-3" />
                Show Less
              </>
            ) : (
              <>
                <Eye className="mr-1 size-3" />
                Show More
              </>
            )}
          </Button>
        )}
      </div>

      <div
        className="prose prose-sm dark:prose-invert max-w-none overflow-auto max-h-96"
        dangerouslySetInnerHTML={{ __html: isExpanded ? sanitizedContent : displayContent + (isLong ? '...' : '') }}
        style={{
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
      />

      <div className="text-xs text-muted-foreground pt-2 border-t">
        {content.length.toLocaleString()} characters • {content.split(/\s+/).length.toLocaleString()} words
      </div>
    </div>
  );
}
