export function notFoundHandler(req, res, next) {
    res.status(404).json({ message: "Resource not found" });
};
  
export function errorHandler(err, req, res, next){
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
  

  