import mongoose from "mongoose";

const MONGO_USER = process.env.MONGO_USER || 'username';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'password';
const MONGO_IP = process.env.MONGO_IP || 'mongo';
const MONGO_PORT = process.env.MONGO_PORT || '27017';

mongoose.set('strictQuery', false);

const connection = uri => {
  const db = mongoose.createConnection(uri);

  db.on('connected', function () {
    console.log(`MongoDB(${this.name}) connected`);
  })

  db.on('disconnected', function (err) {
    console.log(`MongoDB(${this.name}) disconnected`);
  });

  db.on('error', function(err) {
    console.log(`MongoDB(${this.name}) error: ${JSON.stringify(err)}`);

    db.close().catch(function() {
      console.log(`MongoDB close error: ${this.name}`);
    });
  });

  return db;
};

export const chatApp = connection(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`);

export default {
  chatApp,
};