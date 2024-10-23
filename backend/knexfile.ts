// DO NOT TOUCH

import path from 'path';

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'eleven',
    password: process.env.DB_PASSWORD || 'eleven11',
    database: process.env.DB_NAME || 'eleven',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'src', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'seeds'),
  },
  pool: {
    min: 2,
    max: 10,
  },
  useNullAsDefault: true,
};

export default config;
