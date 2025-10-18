# Image Upload System Guide

Your admin panel now has a complete image upload system with drag-and-drop functionality!

## 📁 Upload Folder Structure

```
project-root/
└── public/
    └── uploads/           # All uploaded images stored here
        ├── .gitkeep       # Keeps folder in git
        └── [images]       # Your uploaded images
```

## 🎯 How It Works

### Backend (Server)

**Upload Route**: `POST /api/upload/image`

- **Location**: `server/routes/upload.ts`
- **Storage**: Files saved to `public/uploads/`
- **Authentication**: Requires JWT token (admin only)
- **File Limits**: 
  - Max size: 10MB
  - Allowed types: Images only (jpg, png, gif, webp, etc.)
- **Naming**: Auto-generated unique names with timestamp

**Static Serving**: `GET /uploads/[filename]`

- Files accessible at: `http://localhost:8080/uploads/filename.jpg`
- Configured in `server/index.ts` line 36

### Frontend (Client)

**Upload Component**: `client/components/admin/ImageUpload.tsx`

Features:
- ✅ Drag and drop interface
- ✅ Click to browse files
- ✅ Image preview
- ✅ Manual URL input option
- ✅ Loading states
- ✅ Error handling
- ✅ Remove/clear functionality
- ✅ File validation (type & size)

**Upload Utility**: `client/lib/upload.ts`

Simple function to upload files:
```typescript
import { uploadImage } from "@/lib/upload";

const { url } = await uploadImage(file, token);
// Returns: { url: "/uploads/1234567890-abc123-image.jpg" }
```

## 🎨 Admin Pages with Image Upload

### 1. **Blogs** (`/admin/blogs`)
- Cover image upload
- Full CRUD operations
- Image preview in list

### 2. **Case Studies** (`/admin/case-studies`)
- Cover image upload
- Full CRUD operations
- Image preview in list

### 3. **Services** (`/admin/services`)
- No image upload (services don't need images)
- Full CRUD operations

## 💡 Using the Image Upload Component

### Basic Usage

```tsx
import { ImageUpload } from "@/components/admin/ImageUpload";

function MyForm() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <ImageUpload
      value={imageUrl}
      onChange={(url) => setImageUrl(url)}
      onClear={() => setImageUrl("")}
    />
  );
}
```

### With Form State

```tsx
const [form, setForm] = useState({ cover_image: "" });

<ImageUpload
  value={form.cover_image}
  onChange={(url) => setForm({ ...form, cover_image: url })}
/>
```

## 🔒 Security Features

1. **Authentication Required**
   - Only logged-in admins can upload
   - JWT token validation

2. **File Type Validation**
   - Server checks MIME type
   - Only images allowed

3. **File Size Limit**
   - Maximum 10MB per file
   - Prevents abuse

4. **Unique Filenames**
   - Timestamp + random string + original name
   - Prevents overwrites and conflicts

## 📤 Upload Flow

```
User selects image
       ↓
Frontend validates (type, size)
       ↓
Upload to /api/upload/image with JWT
       ↓
Server validates & saves to public/uploads/
       ↓
Returns URL: /uploads/filename.jpg
       ↓
Frontend updates form with URL
       ↓
Image preview shown
       ↓
Submit form to save to database
```

## 🌐 URL Formats

### Uploaded Images
```
/uploads/1729234567890-abc123def-my-image.jpg
```
- Served from `public/uploads/` folder
- Accessible without authentication

### External Images
```
https://example.com/image.jpg
```
- Can also paste external URLs
- No upload needed

## 🛠️ API Endpoints

### Upload Image
```bash
POST /api/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

# Body: file (form-data)
```

**Response:**
```json
{
  "url": "/uploads/1729234567890-abc123-image.jpg",
  "filename": "1729234567890-abc123-image.jpg",
  "size": 245678,
  "type": "image/jpeg"
}
```

### Access Uploaded Image
```bash
GET /uploads/1729234567890-abc123-image.jpg
```

Returns the image file directly.

## 📋 Admin Panel Features

### Blogs Admin (`/admin/blogs`)
- ✅ Upload cover images
- ✅ Drag & drop support
- ✅ Preview before save
- ✅ Edit/delete posts
- ✅ Draft/published status

### Case Studies Admin (`/admin/case-studies`)
- ✅ Upload cover images
- ✅ Drag & drop support
- ✅ Preview in list view
- ✅ Edit/delete case studies
- ✅ Draft/published status

### Services Admin (`/admin/services`)
- ✅ Title, slug, description
- ✅ Optional pricing
- ✅ Edit/delete services

## 🎯 Quick Start

1. **Login to admin panel**
   ```
   http://localhost:8080/admin/login
   Username: sharmadivyanshu281
   Password: Preksh@2004
   ```

2. **Go to any admin section**
   - `/admin/blogs`
   - `/admin/case-studies`
   - `/admin/services`

3. **Upload an image**
   - Drag & drop an image file
   - OR click to browse
   - OR paste an external URL

4. **Save your content**
   - Image URL automatically saved
   - Displayed on homepage

## 🔍 Troubleshooting

### Upload fails with "Authentication required"
- Make sure you're logged in
- Token might have expired - login again

### Upload fails with "Only images are allowed"
- Check file type (must be jpg, png, gif, etc.)
- File might be corrupted

### Upload fails with file size error
- Image must be under 10MB
- Compress image before uploading

### Image doesn't show on homepage
- Check if status is "published" (not "draft")
- Verify image URL is correct
- Check browser console for errors

## 📊 File Storage

### Development
- Files stored in `public/uploads/`
- Served by Express static middleware
- Persists between server restarts

### Production
- Same folder structure
- Consider using cloud storage (S3, Cloudinary) for scale
- Current setup works for small-medium sites

## 🚀 Future Enhancements

Potential improvements:
- [ ] Image compression on upload
- [ ] Multiple image upload
- [ ] Image cropping/editing
- [ ] Cloud storage integration (S3, Cloudinary)
- [ ] Image gallery/media library
- [ ] Thumbnail generation
- [ ] Image optimization (WebP conversion)

## 📝 Summary

✅ **Upload folder created**: `public/uploads/`  
✅ **Upload API ready**: `POST /api/upload/image`  
✅ **Reusable component**: `ImageUpload.tsx`  
✅ **Admin pages updated**: Blogs & Case Studies  
✅ **Drag & drop support**: Easy image uploads  
✅ **Security**: JWT authentication required  
✅ **Validation**: Type and size checks  

Your image upload system is fully functional and ready to use! 🎉
