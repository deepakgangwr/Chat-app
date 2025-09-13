# Deployment Guide for Chat Application

## Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=5001
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=https://your-frontend-url.com
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com
```

## Render Deployment

### Backend Service
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Node
   - **Node Version**: 18 or higher

### Frontend Service
1. Create a new Static Site
2. Set the following:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Environment Variables**: Add `VITE_API_URL` with your backend URL

## Key Changes Made

1. **Online Status**: Added proper logging and debugging for Socket.IO connections
2. **Message Display**: Fixed message fetching and added proper error handling
3. **Timestamp**: Enhanced to show date and time with smart formatting (Today, Yesterday, or full date)
4. **CORS**: Updated to work with production URLs
5. **Environment Variables**: Made API URLs configurable for different environments

## Testing

1. Test online status by opening multiple browser tabs
2. Send messages and verify they appear in real-time
3. Check that timestamps show correctly (time for today, "Yesterday" for yesterday, full date for older messages)
4. Verify CORS works with your production URLs
