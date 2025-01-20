import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth-route.js"; // Authentication routes
import movieRoutes from "./routes/movie-route.js"; // Movie routes
// import reportRoutes from "./routes/reportRoutes"; // Report routes
// import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware"; // Error handlers

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging HTTP requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/movies", movieRoutes); // Movie routes
// app.use("/api/reports", reportRoutes); // Report routes

// // 404 Not Found Handler
// app.use(notFoundHandler);

// // Global Error Handler
// app.use(errorHandler);

export default app;
