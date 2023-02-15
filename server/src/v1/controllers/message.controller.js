import createHttpError from 'http-errors';

import { validation } from '../helpers/index.js';
import Message from '../models/Message.model.js';

async function createHandle(req, res, next) {
  try {
    const io = res.io;

    const { username } = req.payload;
  
    const content = req.body.content;
  
    const { error } = validation.message({ content });
  
    if ( error ) {
      throw createHttpError.BadRequest( error.details[0].message );
    }

    const message = await (new Message({ sender: username, content })).save();

    _io.emit('message', message);
  
    return res.json({ status: true });
  }
  catch ( err ) {
    return next( err );
  }
}

async function readHandle(req, res, next) {
  try {
    const messages = await Message.find();
    
    return res.json({ status: true, data: { messages } });
  }
  catch ( err ) {
    return next( err );
  }
}

export default {
  createHandle,
  readHandle,
}