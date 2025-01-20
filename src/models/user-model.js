import { Schema, model } from 'mongoose';
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcryptjs.hashSync(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcryptjs.compareSync(enteredPassword, this.password);
};

const User= model('User', userSchema);

export default User;
