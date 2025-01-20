# Movie Management System

## Overview

The Movie Management System is a secure and user-friendly platform built with Node.js. It allows users to log in, manage movies, and rate them. The system includes robust authentication, a dynamic rating mechanism, and an admin dashboard for managing reports. Users can create, update, and rate movies, while only admins have access to reported movie management.

## Features

### 1. **User Authentication**
- Secure login using either:
  - Username and Password
  - Email and Password
- Core functionalities are restricted for unauthenticated users.
- Ensures user data security and privacy.

### 2. **Movie Management**
- Users can:
  - View all movies.
  - View detailed information for each movie, including:
    - Description
    - Release Date
    - Duration
    - Genre
    - Created By
    - Average Rating
    - Total Ratings
    - Language
  - Create new movies (automatically linked to the creator).
  - Update their own movies.
- Updates do not alter the `updated_at` field unless metadata changes.

### 3. **Rating System**
- Users can rate movies on a scale of 1–5.
- Ratings are adjustable by the user.
- Each movie displays:
  - Average rating (calculated dynamically).
  - Total number of ratings.
- Updates to `avg_rating` do not affect the `updated_at` field.

### 4. **Admin Controls**
- Admins can:
  - View and manage reported movies.
  - Resolve user-submitted reports.

## Objectives

1. **Authentication**: 
   - Secure user authentication using username/password or email/password.
   - Restrict access to core features for unauthenticated users.

2. **Movie Viewing**: 
   - Allow authenticated users to view their movies and all movies in the system.
   - Provide detailed movie information for users.

3. **Movie Creation and Updates**: 
   - Enable authenticated users to create and update movies associated with them.

4. **Movie Rating**: 
   - Allow users to rate, update, and view ratings for movies.

5. **Admin Management**: 
   - Admin controls for managing reports and resolving issues.

## Detailed Requirements

### **1. Authentication**
- Implement login functionality supporting:
  - Username/Password
  - Email/Password
- Block unauthenticated users from accessing core features.
- A "Forgot Password" feature is not required.

### **2. Viewing Movies**
- Movies are accessible only to authenticated users.
- Authenticated users can view all movies and access detailed attributes such as:
  - Description, Release Date, Duration, Genre, Creator, Average Rating, Total Ratings, and Language.

### **3. Movie Creation and Updates**
- Only the movie creator can modify their movies.
- Ensure all new movies are associated with their creator.
- Changes to metadata are timestamped, excluding rating updates.

### **4. Rating System**
- Allow users to provide ratings from 1 to 5.
- Dynamically calculate and update `avg_rating` for each movie.
- Preserve `updated_at` during rating adjustments.

### **5. Admin Controls**
- Support reporting functionality for users.
- Allow admins to view and manage reported movies.

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Configure the environment variables:
   - Create a `.env` file and specify the following:
     ```
     PORT=3000
     DATABASE_URL=<your-database-url>
     JWT_SECRET=<your-secret-key>
     ```
4. Run database migrations:
   ```
   npm run migrate
   ```
5. Start the development server:
   ```
   npm start
   ```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB 
- **Authentication**: JWT (JSON Web Tokens) for secure sessions