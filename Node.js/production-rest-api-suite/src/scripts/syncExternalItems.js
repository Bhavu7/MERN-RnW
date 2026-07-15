import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { connectDatabase } from '../database/mongodb.js';
import { User } from '../models/User.js';
import { ROLES } from '../constants/roles.js';
import { externalItemService } from '../services/externalItemService.js';

const seed = async () => {
  await connectDatabase();
  let admin = await User.findOne({ email: 'admin@example.com' });
  if (!admin) {
    admin = await User.create({ name: 'Admin User', email: 'admin@example.com', password: 'Admin1234', role: ROLES.ADMIN });
  }
  const items = await externalItemService.syncItems(admin._id);
  console.log(`Synced ${items.length} items from ${env.thirdPartyApiUrl}`);
  await mongoose.connection.close();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
