import app from './src/app.js';
import { env } from './src/config/env.js';
import { connectDatabase } from './src/database/mongodb.js';

const startServer = async () => {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception', error);
  process.exit(1);
});
