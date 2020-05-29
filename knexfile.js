// Update with your config settings.
require("dotenv").config();

const pgConnection = process.env.DB_URL || "postgres://ihamevkkrfgpmz:8f31542774757ccf5c42df0617866c0879efa48b0f00bd4ccce5bc0e16a610e4@ec2-54-165-36-134.compute-1.amazonaws.com:5432/dei74gp0736j0i";
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
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
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
    // seeds: {
    //   directory: "./data/seeds",
    // },
  },

};
