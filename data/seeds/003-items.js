
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          id: 101, 
          name: 'Commuter Bicycle', 
          image_url: 'https://unsplash.com/photos/_cv8iKu2ONM', 
          description: 'Vintage Euro Commuter. Classic Ride', 
          starting_bid: 1399, 
          seller: 2 
        },
        {
          id: 102, 
          name: 'Vintage Cowgirl Boots', 
          image_url: 'https://unsplash.com/photos/MSQX6YHzDsU', 
          description: 'Size 9 Womens Boots', 
          starting_bid: 99, 
          seller: 2
        }
      ]);
    });
};
