import https, { ServerOptions } from 'https';
import fs from 'fs';
import express from 'express';
import env from '../configs/env';
import cookieParser from 'cookie-parser';

export const makeServer = () => {
  const app = express();

  app.use(cookieParser());

  if (!env.production) {
    return {app, server: app};
  }

  const options: ServerOptions = {
    key: fs.readFileSync(env.ssl.key, 'utf8'),
    cert: fs.readFileSync(env.ssl.certificate, 'utf8'),
  };

  return {app, server: https.createServer(options, app)};
}

/**
 * Might use in the future
 */
export const makeClientServer = () => {
  const app = express();

  app.use(express.static('../frontend/build'));
  app.get('/**', (req, res) => {
    res.sendFile('../frontend/build/index.html');
  });

  return app;
}