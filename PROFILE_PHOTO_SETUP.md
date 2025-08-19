# Profile Photo Update Setup Guide

## Overview
This guide explains how to set up and use the profile photo update functionality in the Chat App.

## Features Added
- ✅ Profile photo upload with preview
- ✅ Save/Cancel functionality for changes
- ✅ File validation (type and size)
- ✅ Loading states and error handling
- ✅ Image preview before saving
- ✅ Remove photo option

## Backend Setup

### 1. Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/chat_app
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration (Required for production)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 2. Cloudinary Setup (Recommended)
1. Sign up for a free Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and API secret from your dashboard
3. Add them to your `.env` file

### 3. Fallback Mode
If Cloudinary is not configured, the app will store base64 images directly in the database (not recommended for production).

## Frontend Features

### Profile Photo Upload
- Click the camera icon on the profile photo to select a new image
- Supported formats: JPG, PNG, GIF
- Maximum file size: 5MB
- Preview the selected image before saving

### Save/Cancel System
- Changes are not applied until you click "Save Changes"
- Use "Cancel" to discard unsaved changes
- Loading indicator shows when updating

### Name Editing
- Click "Edit" to modify your name
- Changes are saved along with photo updates

## How to Use

1. **Navigate to Profile Page**: Click on your profile or go to the profile section
2. **Change Photo**: Click the camera icon on your current profile photo
3. **Select Image**: Choose an image file from your device
4. **Preview**: See how your new photo will look
5. **Save Changes**: Click "Save Changes" to apply the update
6. **Cancel**: Use "Cancel" if you want to discard changes

## Troubleshooting

### Common Issues

1. **"Image upload service not configured"**
   - Set up Cloudinary environment variables
   - Or the app will use fallback mode

2. **"Failed to upload image"**
   - Check your internet connection
   - Ensure the image is under 5MB
   - Try a different image format

3. **Profile not updating**
   - Check browser console for errors
   - Ensure you're logged in
   - Try refreshing the page

### File Requirements
- **Formats**: JPG, PNG, GIF
- **Size**: Maximum 5MB
- **Quality**: The app will automatically optimize images

## Security Notes

- Images are validated on both frontend and backend
- File type checking prevents malicious uploads
- Size limits prevent abuse
- JWT authentication required for updates

## Performance Notes

- Images are optimized to 400x400 pixels
- Cloudinary provides CDN delivery for better performance
- Base64 fallback works but increases database size

## Development

To test without Cloudinary:
1. Don't set Cloudinary environment variables
2. The app will use fallback mode
3. Images will be stored as base64 strings

For production:
1. Always use Cloudinary or similar service
2. Set proper environment variables
3. Monitor storage usage
