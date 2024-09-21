
# Gym Management System

The **Gym Management System** is a web-based application designed to help gym administrators manage members, track their BMI, and provide personalized diet plans. The system includes an admin dashboard that allows administrators to add, edit, and delete member data. Regular users can log in, calculate their BMI, and receive diet plan recommendations based on their BMI category.

## Features

- **Admin Dashboard**:
  - Add, update, and delete gym members.
  - Accessible only to the admin user.
  - View a list of all members.
  
- **Member Management**:
  - Secure login system using Firebase Authentication (Email/Password and Google Sign-In).
  - CRUD (Create, Read, Update, Delete) operations on member records stored in Firebase Firestore.

- **BMI Calculation & Diet Plans**:
  - Users can input their BMI category to receive personalized diet plans.
  - The system provides four BMI categories: underweight, normal, overweight, and obese.
  
- **Google & Email Login**:
  - Supports both Google authentication and regular email/password login for both admin and regular users.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Firebase Configuration](#firebase-configuration)
- [Admin Access](#admin-access)
- [How to Use](#how-to-use)


## Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Authentication & Firestore)

## Setup

To set up the project locally, follow these steps:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/gym-management-system.git
   ```

2. Navigate to the project directory:
   ```bash
   cd gym-management-system
   ```

3. Open the project in your favorite text editor or IDE.

4. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new Firebase project.
   - Enable **Authentication** with Email/Password and Google Sign-In.
   - Enable **Firestore Database**.

5. Add your Firebase configuration in the `firebaseConfig` object in the JavaScript code:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     databaseURL: "YOUR_DATABASE_URL",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```

6. Open `index.html` in a browser to run the project.

## Firebase Configuration

You need to configure Firebase to enable user authentication and database services:

1. **Firebase Authentication**:
   - Enable Email/Password and Google Sign-In methods in the Firebase Authentication section.

2. **Firestore**:
   - Create a collection called `members` in Firestore to store the gym members' data.
   
3. **Admin User**:
   - Ensure that your admin email (`srimithun22110342@snuchennai.edu.in`) is used to login with admin privileges.

## Admin Access

The admin functionalities (add, edit, delete members) are restricted to the admin email:
```javascript
const adminEmail = 'srimithun22110342@snuchennai.edu.in';
```
Replace this with the email of your admin user. Any login attempts with this email will unlock the admin dashboard, allowing you to manage members.

## How to Use

1. **Login**:
   - Regular users and admins can log in using their email/password or Google Sign-In.

2. **Admin Dashboard**:
   - After logging in with the admin email, the admin dashboard will be visible.
   - Admins can add new members, update existing member details, and delete members from the database.

3. **BMI and Diet Plans**:
   - Regular users can input their BMI category and view a corresponding diet plan.
   
4. **Logout**:
   - Both users and admins can log out using the logout button, which ends the current session.



---
