import bcrypt from 'bcryptjs';

const BCRYPT_SALT = Number(process.env.BCRYPT_SALT || 4);

async function hash(str) {
  return await bcrypt.hash(str, BCRYPT_SALT);
}

async function compare(str, hash) {
  return await bcrypt.compare(str, hash);
}

export default {
  hash,
  compare
};