import mongoose from 'mongoose';
import { chatApp } from '../db/mongo.db.js';

const Message = new mongoose.Schema(
  {
    sender: { type: String, required: true }, 
    content: { type: String, required: true },
  }, 
  {
    timestamps: true,
  }
);

export default chatApp.model('Message', Message);