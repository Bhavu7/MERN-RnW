import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import { env } from './config/env.js';
import { loggerStream } from './config/logger.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { apiRateLimiter } from './middlewares/rateLimiter.js';
import { successResponse } from './utils/apiResponse.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev', { stream: loggerStream }));
app.use('/api', apiRateLimiter);

app.get('/health', (req, res) => {
  res.json(successResponse({ message: 'API is healthy', data: { uptime: process.uptime() } }));
});

app.use('/api', routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
