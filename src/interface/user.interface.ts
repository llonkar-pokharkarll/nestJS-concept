import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  name: string;
  userID: string;
  password: string;
}