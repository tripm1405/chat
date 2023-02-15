import mysql from 'mysql2';

const MYSQL_HOST = process.env.MYSQL_HOST || 'mysql';
const MYSQL_USER = process.env.MYSQL_USER || 'username';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'password';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'CHAT_APP';

const connect = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
});

export default {
  query: async (query) => {
    return await (new Promise((res, rej) => {
      connect.query(query, (err, result) => {
        if (err) return rej(err);
        return res(result);
      });
    }));
  }
}