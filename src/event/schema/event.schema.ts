import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  status: String,
});