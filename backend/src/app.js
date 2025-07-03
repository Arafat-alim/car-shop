import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

import path from 'path';

import logger from './utils/logger.js';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

const morganFormat = ':method :url :status :response-time ms';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//! common middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);

app.use(cookieParser());

app.use(express.json({ limit: '16kb' })); // allowing request of json type data with limit 16kb (you can update this value)
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // handling the url route request coming from the client
// app.use(express.static('public')); // any images, css file, etc
app.use('/public', express.static(path.join(__dirname, '../public')));

// Route to serve the API docs HTML file
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/car-shop-apis.html'));
});

export { app };
