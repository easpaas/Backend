
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Bid', password: 'silent', role: 1},
        {id: 2, username: 'Sell', password: 'auction', role: 2},
      ]);
    });
};
