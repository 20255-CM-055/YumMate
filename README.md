# YumMate 🍲

YumMate is a mobile recipe recommendation app built with **React Native**. It helps users discover, save, and share recipes based on ingredients they have. The app also includes a chatbot for recipe suggestions and allows users to manage their profiles with image uploads.

---

## Features

- Browse and search recipes.
- Chatbot for recipe suggestions.
- Save favorite recipes.
- Profile management with image uploads.
- Push notifications for new recipes (using Firebase).
- Supports both frontend and backend integration.

---

## Tech Stack

**Frontend:**
- React Native
- Expo
- React Navigation
- AsyncStorage for local storage

**Backend:**
- Node.js / Express
- Firebase (for notifications)
- REST API for recipe fetching

**Other Tools:**
- Expo ImagePicker for profile pictures
- Lottie animations for smooth UI
- Icons: Ionicons, MaterialIcons, FontAwesome

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd yummate

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install

3. **Install backend dependencies:**
   ```bash
   cd ../backend
   npm install

4. **Run the app:**
   ```bash
   # Start the backend server
   node server.js

   # Start the frontend app
    cd ../frontend
    npm start
