# Document Parser Feature - Complete Guide

## Overview
Implemented a document parser that automatically extracts content from PDF, Word (DOCX/DOC), and text files to populate blog and case study forms in the admin panel.

## Features

### ✅ Implemented
1. **File Upload Support**
   - PDF files (.pdf)
   - Word documents (.docx, .doc)
   - Text files (.txt)
   - Maximum file size: 10MB

2. **Automatic Content Extraction**
   - Title extraction (first line or filename)
   - Full content extraction
   - Excerpt generation (first few lines)
   - Auto-generate URL-friendly slug from title

3. **User Interface**
   - Drag & drop file upload
   - Visual feedback (loading, success, error states)
   - Manual form filling option (existing functionality preserved)
   - Clear instructions and file type indicators

4. **Integration**
   - Added to Admin Blogs page
   - Added to Admin Case Studies page
   - Protected route (requires authentication)
   - Seamless integration with existing forms

## File Structure

### Backend Files
```
server/
├── routes/
│   └── parse-document.ts          # Document parsing logic & multer config
└── index.ts                        # Route registration
```

### Frontend Files
```
client/
├── components/
│   └── admin/
│       └── DocumentParser.tsx      # Reusable parser component
└── pages/
    └── admin/
        ├── Blogs.tsx               # Updated with parser
        └── CaseStudies.tsx         # Updated with parser
```

## API Endpoint

### POST `/api/parse-document`
**Authentication:** Required (Bearer token)

**Request:**
- Content-Type: `multipart/form-data`
- Body: FormData with `document` field containing the file

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Document Title",
    "content": "Full document content...",
    "excerpt": "Brief excerpt from document...",
    "images": [],
    "metadata": {
      "filename": "document.pdf",
      "size": 12345,
      "type": "application/pdf"
    }
  }
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## Current Implementation

### Text Files (.txt)
- ✅ **Fully Supported**
- Extracts title from first line
- Preserves all content
- Generates excerpt from first 3-4 lines

### PDF Files (.pdf)
- ⚠️ **Basic Support**
- Uses filename as title
- Shows placeholder content
- **To enable full PDF parsing:**
  ```bash
  npm install pdf-parse
  ```
  Then uncomment the enhanced version in `server/routes/parse-document.ts`

### Word Files (.docx, .doc)
- ⚠️ **Basic Support**
- Uses filename as title
- Shows placeholder content
- **To enable full DOCX parsing:**
  ```bash
  npm install mammoth
  ```
  Then uncomment the enhanced version in `server/routes/parse-document.ts`

## Upgrading to Full PDF/DOCX Support

### Step 1: Install Dependencies
```bash
npm install pdf-parse mammoth
# or
pnpm add pdf-parse mammoth
```

### Step 2: Update parse-document.ts
In `server/routes/parse-document.ts`:

1. Uncomment the imports at the top:
```typescript
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
```

2. Replace the `parseDocument` function with the commented `parseDocumentEnhanced` function

3. Update the export:
```typescript
export const parseDocument = parseDocumentEnhanced;
```

### Step 3: Restart Server
```bash
npm run dev
```

## Usage Instructions

### For Admins:

#### Creating a Blog Post from Document:
1. Go to `/admin/blogs`
2. Look for the "Extract from Document" section at the top of the form
3. Click the upload area or drag & drop your file
4. Supported formats: PDF, DOCX, DOC, TXT (max 10MB)
5. Click "Extract Content" button
6. Wait for processing (shows loading spinner)
7. Form fields will auto-populate with extracted data
8. Review and edit the extracted content as needed
9. Add author information and cover image
10. Click "Create" to publish

#### Creating a Case Study from Document:
1. Go to `/admin/case-studies`
2. Follow the same process as blogs
3. Summary field will be populated from excerpt
4. Content will be extracted from document body

### Manual Entry (Original Method):
- The manual form fields are still available below the parser
- You can choose to use either method or combine both
- Extracted content can be manually edited before saving

## Features & Benefits

### Time Saving
- No need to manually copy-paste content from documents
- Automatic formatting and structure extraction
- Instant slug generation from title

### Flexibility
- Choose between automatic extraction or manual entry
- Edit extracted content before publishing
- Combine both methods as needed

### User-Friendly
- Visual drag & drop interface
- Clear status indicators
- Helpful error messages
- File type and size validation

## Technical Details

### Multer Configuration
- Storage: Temporary files in `public/temp/`
- Auto-cleanup: Files deleted after processing
- File size limit: 10MB
- Allowed MIME types:
  - `application/pdf`
  - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
  - `application/msword`
  - `text/plain`

### Security
- Route protected with `requireAuth` middleware
- File type validation on server side
- Automatic file cleanup prevents storage bloat
- Size limits prevent abuse

### Error Handling
- Invalid file types rejected
- File size limits enforced
- Parsing errors caught and reported
- Automatic cleanup on errors

## Limitations & Notes

### Current Limitations:
1. **PDF Parsing**: Basic implementation without pdf-parse library
   - Only extracts filename as title
   - Content shows placeholder message
   - **Solution**: Install pdf-parse library

2. **DOCX Parsing**: Basic implementation without mammoth library
   - Only extracts filename as title
   - Content shows placeholder message
   - **Solution**: Install mammoth library

3. **Image Extraction**: Not yet implemented
   - Images embedded in documents are not extracted
   - **Future Enhancement**: Extract and upload images separately

4. **Formatting**: Basic HTML conversion
   - Complex formatting may not be preserved
   - Tables and special elements need manual adjustment

### Best Practices:
1. **For Best Results**:
   - Use well-structured documents
   - Keep formatting simple
   - Review extracted content before publishing
   - Add images manually via ImageUpload component

2. **File Preparation**:
   - Use clear, descriptive titles
   - Structure content with headings
   - Keep file size under 10MB
   - Use standard fonts and formatting

3. **After Extraction**:
   - Always review extracted content
   - Check formatting and line breaks
   - Verify title and slug are appropriate
   - Add metadata (author, images, etc.)

## Troubleshooting

### "No file uploaded" Error
- **Cause**: File not selected or upload failed
- **Solution**: Select a file and try again

### "Invalid file type" Error
- **Cause**: Unsupported file format
- **Solution**: Use PDF, DOCX, DOC, or TXT files only

### "Failed to parse document" Error
- **Cause**: Corrupted file or parsing error
- **Solution**: Try a different file or check file integrity

### "File too large" Error
- **Cause**: File exceeds 10MB limit
- **Solution**: Compress or split the document

### Content Not Extracted Properly
- **Cause**: Basic parser limitations
- **Solution**: Install pdf-parse and mammoth libraries for full support

## Future Enhancements

### Planned Features:
1. **Image Extraction**
   - Extract images from documents
   - Auto-upload to server
   - Insert into content with proper references

2. **Advanced Formatting**
   - Preserve tables
   - Maintain heading hierarchy
   - Convert styles to HTML/Markdown

3. **Metadata Extraction**
   - Author information from document properties
   - Creation/modification dates
   - Keywords and tags

4. **Batch Processing**
   - Upload multiple documents at once
   - Queue processing
   - Bulk import

5. **Preview Mode**
   - Preview extracted content before applying
   - Side-by-side comparison
   - Selective field population

## Testing Checklist

- [ ] Upload a text file and verify extraction
- [ ] Upload a PDF file (basic test)
- [ ] Upload a DOCX file (basic test)
- [ ] Test file size limit (try >10MB file)
- [ ] Test invalid file types
- [ ] Verify auto-generated slug
- [ ] Check form population
- [ ] Test manual editing after extraction
- [ ] Verify authentication requirement
- [ ] Test error handling
- [ ] Check file cleanup (temp folder)

## Support

For issues or questions:
1. Check this documentation
2. Review error messages
3. Check browser console for details
4. Verify file format and size
5. Try with a simple text file first

## Version History

### v1.0.0 (Current)
- Initial implementation
- Basic PDF/DOCX support
- Full text file support
- Integration with Blogs and Case Studies
- Auto-slug generation
- Error handling and validation
