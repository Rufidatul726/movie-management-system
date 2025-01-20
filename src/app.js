import express from "express";
import cors from "cors";
import morgan from "morgan";
import pkg from "body-parser";

// import authRoutes from "./routes/authRoutes"; // Authentication routes
// import movieRoutes from "./routes/movieRoutes"; // Movie routes
// import reportRoutes from "./routes/reportRoutes"; // Report routes
// import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware"; // Error handlers

const app = express();
const { json } = pkg;

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging HTTP requests
app.use(json()); // Parse JSON body

// // Routes
// app.use("/api/auth", authRoutes); // Authentication routes
// app.use("/api/movies", movieRoutes); // Movie routes
// app.use("/api/reports", reportRoutes); // Report routes

// // 404 Not Found Handler
// app.use(notFoundHandler);

// // Global Error Handler
// app.use(errorHandler);

export default app;
