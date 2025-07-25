import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export { User };
