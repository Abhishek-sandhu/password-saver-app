# 🚀 Password & PIN Saver

![Platform](https://img.shields.io/badge/Platform-Web-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Made with Love](https://img.shields.io/badge/Made_with-❤️_JavaScript-orange)

---

**Live Demo:** 👉 [passwordpinsaver.netlify.app](https://passwordpinsaver.netlify.app/)

---

## 🔒 About the Project

**Password & PIN Saver** is your secure companion for storing passwords and PINs. Designed with an emphasis on simplicity and cybersecurity, the app integrates modern UI/UX principles, robust encryption, and seamless user authentication.

---

## ✨ Key Features
✅ **User Authentication** — Ensure your private data stays private with secure JWT tokens.  
✅ **Encrypted Storage** — Your data is encrypted using AES before being securely stored in MongoDB.  
✅ **Modern UI/UX** — Experience smooth animations, responsive design, and user-friendly interfaces.  
✅ **Real-time Feedback** — Enjoy loading states, success/error notifications, and smooth interactions.  
✅ **Password Strength Indicator** — Get real-time feedback on your password's robustness during sign-up.  
✅ **Advanced Functionalities** — Including search & filter, theme toggles, keyboard shortcuts, and mobile responsiveness.  
✅ **CRUD Operations** — Simplify creating, updating, or deleting your sensitive data.

---

## ⚙ Technologies Under the Hood

### **Frontend:**  
- HTML5 + CSS3 (beautiful animations and transitions)  
- JavaScript (ES6+)  
- **CryptoJS** for encryption  

### **Backend:**  
- Node.js  
- Express.js  
- **JWT** for secure authentication  
- **bcrypt** for password hashing  

### **Database:**  
- MongoDB with Mongoose ODM  

### **Security:**  
- AES encryption  
- JWT tokens  
- Secure password storage with bcrypt  

---

## 👩‍🎨 UI/UX Features
🎨 Smooth & responsive design  
🎭 Dark Mode & Light Mode toggling with theme persistence  
🔄 Real-time feedback with toasts  
💻 Accessibility-first approach ‍ 
☎️ Keyboard shortcuts for faster navigation  
📱 Mobile-friendly design  

---

## 🛫 Getting Started

### **Setup Instructions**
1. **Install Dependencies**  
   ```bash
   npm install
   ```

2. **Start MongoDB:**  
   Ensure MongoDB is running locally on the **default port (27017)**.

3. **Configure Environment:**  
   You will need to create a `.env` file in the root directory and fill the following credentials:  
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret
   ```

4. **Run the Server:**  
   Execute the following command to start a local server:  
   ```bash
   npm start
   ```

5. **Access the App:**  
   Navigate to `http://localhost:5000` using your preferred web browser.  

---

## 🧑‍🏫 How to Use

### **Registration**
- Register with your email and create a strong password.  
- Password strength indicator helps to ensure robust security.  

### **Manage Passwords & PINs**
- Add new passwords or PINs with ease.  
- Search for stored entries with debounced search and full-text filtering.  
- Edit or delete credentials with simple, intuitive controls.  

### **Keyboard Shortcuts**
- <kbd>Ctrl</kbd> + <kbd>Enter</kbd>: Save your input form.  
- <kbd>Escape</kbd>: Quickly clear the search field.  

### **Themes**
- Toggle between Light & Dark themes using the moon/sun icon.  
- Your theme preference is saved for convenience!  

---

## 📡 API Endpoints

| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| POST   | `/api/auth/register`     | Register a new user      |
| POST   | `/api/auth/login`        | Login user               |
| GET    | `/api/passwords`         | Fetch saved passwords    |
| POST   | `/api/passwords`         | Save a new password      |
| PUT    | `/api/passwords/:id`     | Update saved password    |
| DELETE | `/api/passwords/:id`     | Delete saved password    |
| GET    | `/api/pins`              | Fetch saved PINs         |
| POST   | `/api/pins`              | Save a new PIN           |
| PUT    | `/api/pins/:id`          | Update saved PIN         |
| DELETE | `/api/pins/:id`          | Delete saved PIN         |

---

## 🔮 Roadmap

Here are some exciting planned updates:
- [ ] Add a **secure password generator**.  
- [ ] Implement **import/export** to easily transfer credentials.  
- [ ] Fortify with **two-factor authentication (2FA)**.  
- [ ] **Password expiration notifications** to stay on top of security.  
- [ ] Create a **browser extension** for easier integration.  
- [ ] Develop a **mobile app version**.

---

## 📸 Screenshots

Experience the app in pictures:  

![Screenshot 1](https://github.com/user-attachments/assets/a780fbb2-82aa-485c-95b7-118feb0abeeb)  
![Screenshot 2](https://github.com/user-attachments/assets/b38ff67d-0f45-48f7-94ee-e14ce5ee638c)  
![Screenshot 3](https://github.com/user-attachments/assets/889f63b6-ff05-4704-8c10-380fb2c86e31)  
![Screenshot 4](https://github.com/user-attachments/assets/90224749-924a-406a-8198-71299629a30c)  
![Screenshot 5](https://github.com/user-attachments/assets/5fa08b9a-78a3-4582-a602-f403af1d4260)  
![Screenshot 6](https://github.com/user-attachments/assets/34e06398-de5f-42eb-b700-630e9560a3fc)  

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [Issues Page](https://github.com/Abhishek-sandhu/password-saver-app/issues).  

---

## 🙌 Show Your Support
If you love this project, show your support by giving it a ⭐ on GitHub!  
Let’s make password management simpler, together.  

---

## 📃 License
This project is licensed under the **MIT License**. See [LICENSE.md](LICENSE.md) for details.  

---
Made with ♥ by **Abhishek Sandhu**
