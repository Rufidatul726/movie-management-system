import { Router } from "express";
import { getMovies, getMoviebyUser, createMovies, updateMovie, viewMovie, deleteMovie, updateMovieRating} from "../controllers/movie-controller.js";
import protect, { adminOnly } from '../middleware/auth-middleware.js'

const router = Router();

router.get("/", protect, getMovies);
router.get("/mymovies", protect, getMoviebyUser);
router.get("/:id", protect, viewMovie);
router.post("/", protect, createMovies);
router.put("/:id", protect, updateMovie);
router.put("/rating/:id", protect, updateMovieRating);
router.delete("/:id", protect, adminOnly, deleteMovie);

export default router;