

---

# Inunity Note App

Welcome to the Inunity Note App! This is a full-stack application that allows users to create, read, update, and delete notes. The application is built using React Native for the frontend and Node.js with Express for the backend.

## Table of Contents

- [Overview](#overview)
- [Features](##features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Building the APK](#building-the-apk)
- [Screenshots](#screenshots)
- [Acknowledgments](#acknowledgments)

## Overview

The Inunity Note App is a note-taking application that allows users to manage their notes efficiently. Users can sign up, log in, and manage their notes through an intuitive user interface. The app also provides a profile screen where users can view their information.

## Features

- User Authentication (Sign Up, Sign In)
- Create, Read, Update, Delete Notes
- Profile Management
- Responsive Design for Mobile and Web
- Toast Notifications for User Feedback
- Gradient Backgrounds and Styled Components for a Modern UI

## Tech Stack

### Frontend

- React Native
- Expo
- Styled Components
- React Navigation
- AsyncStorage for local storage
- Toast for notifications

### Backend

- Node.js
- Express
- MongoDB
- JWT for authentication
- Bcrypt for password hashing

## Live Demo

### Frontend

The frontend of the application is deployed on Netlify. You can access the live demo using the following link:

[Live Demo on Netlify](https://luxury-torte-a510d8.netlify.app/)
[APK](./Apk/noteapp.apk)

### Backend

The backend of the application is deployed on Render. Please note that due to the free tier on Render, the first response might take 1-2 minutes.

[Backend API on Render](https://inunity-backend.onrender.com)<br/>
[Backend Repo](https://github.com/VivekTomar03/inunity-backend)


## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or a cloud MongoDB instance
- Expo CLI installed globally (`npm install -g expo-cli`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/inunity-note-app.git
cd inunity-note-app
```

2. Install the dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Running the Backend

1. Create a `.env` file in the `backend` directory and add the following environment variables:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=8080
```

2. Start the backend server:

```bash
cd backend
npm start
```

The backend server will be running at `http://localhost:8080`.

### Running the Frontend

1. Start the frontend application:

```bash
cd frontend
expo start
```

You can now run the app on an emulator, simulator, or physical device using the Expo Go app.

## Building the APK

To build the APK fi have used Expo Dashboard

1. You can signin to expo and visite your dashboard 
2. [Follow Expo Doc for Deploy Apk and wen](https://docs.expo.dev/develop/development-builds/create-a-build/)



Follow the prompts to generate the APK. Once the build is complete, you can download the APK file and distribute it.

## Screenshots

### Login Screen
![Login Screen](https://i.pinimg.com/564x/9a/65/d2/9a65d218392a4011f3d0f83ae441b348.jpg)

### Home Screen
![Notes Screen](https://i.pinimg.com/564x/5a/13/e2/5a13e277b9705b3d59e5e3d3abca0c79.jpg)

### Notes Screen
![Notes Screen](https://i.pinimg.com/564x/6f/03/60/6f0360f45a60615f9324e61a756529ef.jpg)

### Profile Screen
![Profile Screen](https://i.pinimg.com/564x/74/fe/f1/74fef1efb760293173b49908a370d895.jpg)

## Acknowledgments

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Netlify](https://www.netlify.com/)
- [Render](https://render.com/)

Thank you for checking out the Inunity Note App! If you have any questions or feedback, feel free to contact (tomarvivek90viv@gmail.com).

---