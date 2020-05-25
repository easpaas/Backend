exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const roles = [
    {
      name: "Bidder", // will get id 1
    },
    {
      name: "Seller", // will get id 2
    },
  ];

  return knex("roles")
    .insert(roles)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
