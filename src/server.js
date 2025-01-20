import 'dotenv/config';
import app from "./app.js"; 
import connectDB from "./config/db.js"; 

connectDB()
  .then(() => {
    console.log("Database connected successfully.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
