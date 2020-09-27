/* eslint-disable */
const dotenv = require('dotenv');
const path = require('path');
/* eslint-enable */

const env = process.env.NODE_ENV;

const envPath = env === 'production'
  ? path.resolve(__dirname, '../dotenv/prod.env')
  : env === 'development'
    ? path.resolve(__dirname, '../dotenv/dev.env')
    : env === 'test'
      ? path.resolve(__dirname, '../dotenv/test.env')
      : path.resolve(__dirname, '../dotenv/.env');

dotenv.config({ path: envPath });

let config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  define: {
    underscored: false,
  },
};


module.exports = config;