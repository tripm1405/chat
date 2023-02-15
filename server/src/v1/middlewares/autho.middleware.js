import createHttpError from 'http-errors';

import { jwt } from '../helpers/index.js';

async function checkLogin(req, res, next) {
  try {
    const accessToken = req.headers['authorization']?.split(' ')?.[1];
  
    if ( !accessToken ) {
      throw createHttpError.Forbidden();
    };
  
    req.payload = await jwt.verify( accessToken );

    return next();
  }
  catch ( err ) {
    return next( err );
  }
}

async function checkAdmin(req, res, next) {
  try {
    const accessToken = req.headers['authorization']?.split(' ')?.[1];
  
    if ( !accessToken ) {
      throw createHttpError.Forbidden();
    };
  
    if (jwt.decode( accessToken )?.username !== 'admin') {
      throw createHttpError.Forbidden();
    }

    req.payload = await jwt.verify( accessToken );

    return next();
  }
  catch ( err ) {
    return next( err );
  }
}

export default {
  checkLogin,
  checkAdmin
}