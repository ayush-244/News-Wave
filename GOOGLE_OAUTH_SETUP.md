# Google OAuth Setup Guide

## Overview
NewsWave now includes professional Google OAuth authentication integrated with email/password login.

## Prerequisites
- Google account
- Node.js v18+

## Step-by-Step Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Enable the **Google+ API**:
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "Credentials" in left sidebar
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:5173`
     - `http://localhost:3000`
     - Your production domain (when deployed)
   - Click "Create"
5. Copy your **Client ID**

### 2. Configure Environment Variables

1. Open `.env` in your project root
2. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE
   ```
3. Save the file

### 3. Install Dependencies

Google OAuth library is already installed. If you need to reinstall:
```bash
npm install @react-oauth/google --legacy-peer-deps
```

### 4. Run the Application

```bash
npm run dev:all
```

Navigate to `http://localhost:5173` and test the login:
- **Google OAuth Button**: Click to login with Google
- **Email/Password**: Use any credentials with minimum 6 character password

### 5. Test Admin Access

After implementing admin role assignment on your backend, test with admin credentials:
```
Email: admin@newswave.com
Password: admin123
```

## How It Works

### Google OAuth Flow
1. User clicks "Continue with Google"
2. User authenticates with Google
3. Google returns a JWT token
4. Token is decoded to extract user information
5. User profile stored in localStorage
6. User automatically logged in

### Email/Password Flow
1. User enters email and password
2. Simple validation (password min 6 chars)
3. User data stored in localStorage
4. User automatically logged in

## Security Notes

### Development
- JWT tokens decoded on client-side (for demo purposes)
- User data stored in localStorage

### Production Recommendations
1. **Backend Token Verification**
   - Verify Google JWT tokens on your backend
   - Never trust client-side token verification
   - Return secure session/JWT from your server

2. **Secure Storage**
   - Use secure HTTP-only cookies for tokens
   - Remove localStorage usage for sensitive data
   - Implement proper session management

3. **Admin Role Management**
   - Assign admin roles in your backend database
   - Verify admin status on server for sensitive operations
   - Implement role-based access control (RBAC)

## Troubleshooting

### Issue: Google button not working
**Solution**: Check that VITE_GOOGLE_CLIENT_ID is set correctly in `.env`

### Issue: "Invalid Client ID" error
**Solution**: 
- Verify Client ID is correct
- Ensure `http://localhost:5173` is in authorized origins
- Restart the dev server

### Issue: Email login not working
**Solution**: Password must be at least 6 characters

## File Structure

```
src/
├── context/
│   └── AuthContext.tsx       # Authentication logic
├── pages/
│   └── Login.tsx             # Login page with Google OAuth
├── components/
│   └── ProtectedRoute.tsx     # Protected route wrapper
└── App.tsx                   # Updated with GoogleOAuthProvider
```

## API Integration (Future)

When you have a backend API:

1. Update `AuthContext.tsx` login functions to call your API
2. Replace token verification with backend validation
3. Implement refresh token logic
4. Add logout API endpoint

Example backend endpoint structure:
```
POST /auth/google
- Input: { token: string }
- Output: { user: User, token: string }

POST /auth/login
- Input: { email: string, password: string }
- Output: { user: User, token: string }

POST /auth/logout
- Input: {}
- Output: { success: boolean }
```

## Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google GitHub](https://github.com/react-oauth/react-oauth.google)
- [JWT Token Verification](https://developers.google.com/identity/sign-in/web/verify-aud)

---










