import {Schema, model} from "mongoose";

const movieSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    releasedAt: { type: Date },
    duration: { type: Number },
    genre: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    avgRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    ratings: [{ user: Schema.Types.ObjectId, rating: Number }],
  });
  
export default model('Movie', movieSchema);
  