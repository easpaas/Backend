// Update with your config settings.
require("dotenv").config();

// TODO make Heroku URL 
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
    connection: "",
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
