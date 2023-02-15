import { Server } from 'socket.io'
import express from 'express';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import cors from 'cors';

import routes from './v1/routes/index.js';
import socketSevice from './v1/services/socket.service.js';

import './v1/db/redis.db.js';
import './v1/db/mongo.db.js';

dotenv.config();

const PORT = process.env.PORT || 5500;

const app = express(); 
const server = createServer(app); 
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
  }
});

global._io = io;

global._io.on('connection', socketSevice.connection);

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  try {
    console.log(req.path);
  
    return next();
  }
  catch ( err ) {
    return next( err );
  }
});

app.use('/v1', routes);

app.use((req, res, next) => { 
  try {
    throw createHttpError.NotFound();
  }
  catch ( err ) {
    return next( err );
  }
});

app.use((err, req, res, next) => {
  const status = false;
  const message = (err.status === 500) ? 'Internal Server Error' : err.message || 'Internal Server Error';

  console.log(err);
  
  return res.json({ status, message });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});