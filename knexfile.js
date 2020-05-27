// Update with your config settings.
require("dotenv").config();

const pgConnection = process.env.DB_URL || "postgresql://postgres@localhost/silent_auction2";
const pgPassword = process.env.PG_PASSWORD;

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : pgPassword,
      database : 'silent_auction2'
    },
    // connection: pgConnection,
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.run("PRAGMA foreign_keys = ON", done);
    //   },
    // },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : pgPassword,
      database : 'silent_auction2',
      filename: './data/test.db3',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },


  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

};
