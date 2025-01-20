import Movie from '../models/movie-model.js';

export async function getMovies(req, res) {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
}

export async function createMovies(req, res) {
    const { title, description, releasedAt, duration, genre, language } = req.body;

  try {
    const movie = new Movie({
      title,
      description,
      releasedAt,
      duration,
      genre,
      language,
      createdBy: req.user,  
    });

    await movie.save();
    res.status(201).json({ message: "Movie created successfully", movie });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateMovie(req, res) {try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (movie.createdBy.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized to update this movie" });
    }

    movie.title = req.body.title || movie.title;
    movie.description = req.body.description || movie.description;
    movie.releasedAt = req.body.releasedAt || movie.releasedAt;
    movie.duration = req.body.duration || movie.duration;
    movie.genre = req.body.genre || movie.genre;
    movie.language = req.body.language || movie.language;

    await movie.save();
    res.status(200).json({ message: "Movie updated ", movie });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function viewMovie(req, res) {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
          return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
}

export async function deleteMovie(req, res) {
    try{
        const deletedmovie = await Movie.findByIdAndDelete(req.params.id);
        if(!deletedmovie){
            res.status(500).json({message: "Movie could not be deleted"});
        }
        res.status(200).json(deletedmovie);
    }catch (error) {
        res.status(500).json({ message: "Server error" });
      }
}

export async function updateMovieRating(req, res){
  const { rating } = req.body;

  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if user already rated the movie
    const existingRating = movie.ratings.find(r => r.user.toString() === req.user);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      movie.ratings.push({ user: req.user, rating });
    }

    movie.calculateAvgRating();
    await movie.save();

    res.status(200).json({ message: "Movie rated successfully", movie });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export async function getMoviebyUser(req, res) {
    try {
        const movies = await Movie.find({user: req.user});
        res.status(200).json(movies);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
}