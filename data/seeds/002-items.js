
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          id: 101, 
          title: 'Commuter Bicycle', 
          image_url: 'https://unsplash.com/photos/_cv8iKu2ONM', 
          description: 'Vintage Euro Commuter. Classic Ride',
          category:  "Bicycles",
          starting_bid: 1399, 
          seller_id: 2 
        },
        {
          id: 102, 
          title: 'Vintage Cowgirl Boots', 
          image_url: 'https://unsplash.com/photos/MSQX6YHzDsU', 
          description: 'Size 9 Womens Boots',
          category: "Womens Shoes",
          starting_bid: 99, 
          seller_id: 2
        }
      ]);
    });
};
