import { Schema, model } from "mongoose";

const reportSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reason: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  });

export default model('Report', reportSchema);
  