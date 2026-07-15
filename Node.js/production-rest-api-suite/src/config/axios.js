import axios from 'axios';
import { env } from './env.js';

export const externalApiClient = axios.create({
  baseURL: env.thirdPartyApiUrl,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});