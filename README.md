# Password & PIN Saver

**Live Demo:** https://passwordpinsaver.netlify.app/

## 🔐 Project Description
Password & PIN Saver is a secure and user-friendly web app to help users store their passwords and PINs safely. With user authentication, users can register and login to access their personal vault. The app uses MongoDB to store encrypted data securely and features a modern, animated UI with excellent user experience.

## ⭐ Key Features
- **User Authentication** - Register and login with secure JWT tokens
- **Encrypted Storage** - All passwords and PINs are encrypted before storing in MongoDB
- **Modern UI/UX** - Beautiful animations, transitions, and responsive design
- **Real-time Feedback** - Loading states, success/error notifications, and smooth interactions
- **Password Strength Indicator** - Visual feedback for password security during registration
- **Search & Filter** - Real-time search with debounced input
- **Theme Toggle** - Dark/Light theme with persistence
- **Keyboard Shortcuts** - Ctrl+Enter to save, Escape to clear search
- **Mobile Responsive** - Works perfectly on all devices
- **CRUD Operations** - Full create, read, update, delete functionality

## 🛠 Technologies Used
- **Frontend:** HTML5, CSS3 (with animations), JavaScript (ES6+), CryptoJS for encryption
- **Backend:** Node.js, Express.js, JWT for authentication, bcrypt for password hashing
- **Database:** MongoDB with Mongoose ODM
- **Security:** AES encryption, JWT tokens, secure password storage

## 🎨 UI/UX Features
- **Smooth Animations** - CSS transitions and keyframe animations
- **Loading States** - Spinners and loading buttons for better feedback
- **Interactive Elements** - Hover effects, ripple effects, and dynamic styling
- **Responsive Design** - Mobile-first approach with flexible layouts
- **Accessibility** - Proper contrast, focus states, and keyboard navigation
- **Visual Feedback** - Toast notifications for all user actions

## 🔒 Security Features
- User passwords are hashed with bcrypt (10 salt rounds)
- Saved data is encrypted with AES using JWT token as key
- JWT authentication for all API requests
- Secure password validation and strength checking
- Each user has isolated data in MongoDB

## 🚀 Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB:**
   Make sure MongoDB is running locally on default port (27017).

3. **Configure Environment:**
   Update `.env` file with your MongoDB URI and JWT secret.

4. **Run the Server:**
   ```bash
   npm start
   ```

5. **Access the App:**
   Open `http://localhost:5000` in your browser.

## 📱 Usage Guide

### Registration
- Create a username and strong password
- Password strength indicator shows security level
- Minimum 6 characters required

### Login
- Enter your credentials to access your vault
- JWT token stored securely in localStorage

### Managing Passwords & PINs
- **Add:** Fill the form and press Save or Ctrl+Enter
- **Search:** Type in search box for real-time filtering
- **Edit:** Click Edit button on any item
- **Delete:** Click Delete with confirmation dialog
- **Copy:** Click Copy to clipboard with feedback

### Keyboard Shortcuts
- `Ctrl+Enter`: Save current form
- `Escape`: Clear search fields

### Themes
- Click the moon/sun icon to toggle themes
- Theme preference is saved automatically

## 📝 API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/passwords` - Get user's passwords
- `POST /api/passwords` - Add a password
- `PUT /api/passwords/:id` - Update a password
- `DELETE /api/passwords/:id` - Delete a password
- `GET /api/pins` - Get user's PINs
- `POST /api/pins` - Add a PIN
- `PUT /api/pins/:id` - Update a PIN
- `DELETE /api/pins/:id` - Delete a PIN

## 🎯 Future Enhancements
- Password generator
- Import/Export functionality
- Two-factor authentication
- Password expiry notifications
- Browser extension
- Mobile app version
