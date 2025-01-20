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

## API Routes and Formats

### **Authentication Routes**

| Route             | Method | Description                | Input                                  | Output                              |
|--------------------|--------|----------------------------|----------------------------------------|-------------------------------------|
| `/api/auth/register` | POST   | Register a new user        | `{ username, email, password, role }` | `User created successfully.`        |
| `/api/auth/login`    | POST   | Login to the system        | `{ email, password }`                 | `{ token, userId, username, role }` |

---

### **Movie Routes**

| Route                        | Method | Description                 | Input Format                                             | Output Format |
|-------------------------------|--------|-----------------------------|----------------------------------------------------------|---------------|
| `/api/movies/`               | GET    | View all movies             | Requires JWT in the header.                              | List of movies with details. |
| `/api/movies/mymovies`       | GET    | View user-created movies    | Requires JWT in the header.                              | Movies created by the user.  |
| `/api/movies/:id`            | GET    | View a movie’s details      | Requires JWT in the header.                              | Full movie details.          |
| `/api/movies/`               | POST   | Create a movie              | `{ title, description, released_at, duration, genre }`   | `Movie created successfully.` |
| `/api/movies/:id`            | PUT    | Update a movie              | `{ title, description, released_at, duration, genre }`   | `Movie updated successfully.` |
| `/api/movies/rating/:id`     | PUT    | Update movie rating         | `{ rating: <number between 1-5> }`                       | Updated movie details with average rating. |
| `/api/movies/:id`            | DELETE | Delete a movie (Admin Only) | Requires JWT in the header.                              | `Movie deleted successfully.` |

---

### **Report Routes**

| Route                        | Method | Description                      | Input Format              | Output Format                            |
|-------------------------------|--------|----------------------------------|---------------------------|------------------------------------------|
| `/api/reports/`              | GET    | View all reported movies (Admin) | Requires JWT and admin role. | List of reported movies with statuses.  |
| `/api/reports/:id`           | POST   | Create a report for a movie      | `{ reason }`              | `Report created successfully.`          |
| `/api/reports/:id`           | PUT    | Approve or reject a report (Admin) | `{ status: "approved" }` or `{ status: "rejected" }` | `Report updated successfully.` |

---

## Input and Output Formats

### Movie Example:
**Input (Create a movie):**
```json
{
  "title": "Inception",
  "description": "A mind-bending thriller by Christopher Nolan.",
  "released_at": "2010-07-16",
  "duration": 148,
  "genre": "Sci-Fi",
  "language": "English"
}
```

**Output (Get movie):**
```json
{
  "_id": "64a6a5f7858945c45e7fa1",
  "title": "Inception",
  "description": "A mind-bending thriller by Christopher Nolan.",
  "released_at": "2010-07-16",
  "duration": 148,
  "genre": "Sci-Fi",
  "created_by": "user1",
  "avg_rating": 4.8,
  "total_ratings": 10,
  "language": "English"
}
```

### Rating Example:
**Input (Update movie rating):**
```json
{
  "rating": 5
}
```

**Output:**
```json
{
  "avg_rating": 4.9,
  "total_ratings": 11
}
```

---

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