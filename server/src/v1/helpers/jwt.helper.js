import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import createHttpError from 'http-errors';

import redis from '../db/redis.db.js';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET';
const JWT_ACCESS_EX = process.env.JWT_ACCESS_EX || '5m';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET';
const JWT_REFRESH_EX = process.env.JWT_REFRESH_EX || '1h';

async function sign(payload, isAccess = true) {
  return new Promise((res, rej) => {
    const secret = isAccess ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
    const options = {
      expiresIn: isAccess ? JWT_ACCESS_EX : JWT_REFRESH_EX,
    };

    jwt.sign(payload, secret, options, (err, code) => {
      if ( err ) return rej(err);

      if ( isAccess ) {
        return res(code);
      }

      redis.set(payload.username, code, 'EX', (60 * 60), (err, reply) => {
        if ( err ) return rej(createHttpError.InternalServerError());

        return res(code);
      });
    }); 
  });
}

async function verify(token, isAccess = true) {
  return new Promise((res, rej) => {
    const secret = isAccess ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

    jwt.verify(token, secret, (err, payload) => {
      if ( err ) {
        if ( !isAccess ) return rej(createHttpError.Unauthorized());

        return rej(createHttpError.Unauthorized(err.name));
      }

      if ( isAccess ) return res(payload);

      redis.get(payload.username, (err, reply) => {
        if ( err ) return rej(createHttpError.InternalServerError());
        if (token !== reply) return rej(createHttpError.Unauthorized());

        return res(payload);
      });
    });
  });
}

function decode(token) {
  return jwtDecode(token);
}

export default {
  sign,
  verify,
  decode
};