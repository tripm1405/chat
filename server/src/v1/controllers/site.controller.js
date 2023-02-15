import createHttpError from 'http-errors';

import { redis, mysql } from '../db/index.js';
import { jwt, bcrypt, validation, func } from '../helpers/index.js';

async function signUpHandle(req, res, next) {
  try {
    const username = req.body.username?.trim().toLowerCase();
    const password = req.body.password;

    const { error } = validation.account({ username, password });

    if ( error ) {
      throw createHttpError.BadRequest( error.details[0].message );
    }

    if (username == 'admin') {
      throw createHttpError.Conflict( 'Please use another username' );
    }

    const isExistsAccount = (await mysql.query(
      `SELECT username ` + 
      `FROM Account ` +
      `WHERE username = '${func.addslashes( username )}'`
    )) != 0;

    if ( isExistsAccount ) {
      throw createHttpError.Conflict( 'Please use another username' );
    }

    const result = await mysql.query(
      `INSERT INTO Account (\`username\`, \`password\`) VALUES ` + 
      `('${func.addslashes( username )}', '${await bcrypt.hash( password )}')`
    );

    return res.json({ status: true, message: 'Sign up successful'});
  }
  catch ( err ) {
    return next( err );
  }
}

async function signInHandle(req, res, next) {
  try {
    const username = req.body.username?.trim().toLowerCase();
    const password = req.body.password;

    const { error } = validation.account({ username, password });

    if ( error ) {
      throw createHttpError.BadRequest( error.details[0].message );
    }

    if (username == 'admin') {
      if (await bcrypt.compare(password, '$2a$04$NeYqUNXXi6pbDuffY0eUr.9IFZCHtlclvk5NY0s2Q49TQHmzTGTua')) {
        const accessToken = await jwt.sign({ username });
        const refreshToken = await jwt.sign({ username }, false);

        return res.json({ status: 200, data: { accessToken, refreshToken } });
      }
      else {
        throw createHttpError.Unauthorized( 'Login failed' );
      }
    }

    const account = await mysql.query(
      `SELECT username, password ` + 
      `FROM Account ` +
      `WHERE username = '${func.addslashes( username )}'`
    );

    if (account.length < 1) {
      throw createHttpError.Unauthorized( 'Login failed' );
    }

    if (await bcrypt.compare(password, account[0]?.password)) {
      const accessToken = await jwt.sign({ username });
      const refreshToken = await jwt.sign({ username }, false);

      return res.json({ status: 200, data: { accessToken, refreshToken } });
    }
    else {
      throw createHttpError.Unauthorized( 'Login failed' );
    }
  }
  catch ( err ) {
    return next( err );
  }
}

async function signOutHandle(req, res, next) {
  try {
    const refreshToken = req.body.refreshToken;

    const { error } = validation.refreshToken({ refreshToken });

    if ( error ) {
      throw createHttpError.BadRequest( error.details[0].message );
    }

    const { username } = await jwt.verify(refreshToken, false);

    redis.del(username, (err, reply) => {
      if ( err ) throw err;

      return res.json({ status: true, message: 'Success' });
    });
  }
  catch ( err ) {
    return next( err );
  }
}

async function refreshTokenHandle(req, res, next) {
  try {
    const refreshToken = req.body.refreshToken;

    const { error } = validation.refreshToken({ refreshToken });

    if ( error ) {
      throw createHttpError.BadRequest( error.details[0].message );
    }

    const { username } = await jwt.verify( refreshToken, false );

    const accessToken = await jwt.sign({ username });
    const newRefreshToken = await jwt.sign({ username }, false);

    return res.json({ status: true, data: { accessToken, refreshToken: newRefreshToken } });

  }
  catch ( err ) {
    return next( err );
  }
}

export default {
  signUpHandle,
  signInHandle,
  signOutHandle,
  refreshTokenHandle
};