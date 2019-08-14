import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  userId: String,
  password: String,
});

UserSchema.index({ userId: 1 }, { unique: true });
