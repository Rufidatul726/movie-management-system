import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releasedAt: { type: Date },
  duration: { type: String },
  genre: { type: String },
  language: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ratings: [{
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5 },
  }],
  avgRating: { type: Number, default: 0 }
});

movieSchema.methods.calculateAvgRating = function () {
  const totalRating = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  this.avgRating = totalRating / this.ratings.length;
};

const Movie = model("Movie", movieSchema);

export default Movie;
