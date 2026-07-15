import mongoose from 'mongoose';
import { env } from '../config/env.js';

export const connectDatabase = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongodbUri);
};
