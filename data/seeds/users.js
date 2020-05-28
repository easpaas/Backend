const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          username: "Bidder", 
          password: bcrypt.hashSync('password', 4),
          seller: false
        },
        {
          username: "Seller",
          password: bcrypt.hashSync("password", 4),
          seller: true
        }
      ]);
    });
};
