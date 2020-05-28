exports.up = function (knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();

      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();
      tbl.boolean("seller").defaultTo(false);
    })

    .createTable("items", tbl => {
      tbl.increments();

      // .index() allows users to search by item name
      tbl.string("title").notNullable();
      tbl.string("image_url").notNullable();
      tbl.string("description").notNullable();
      tbl.string("category").notNullable().index();
      tbl.decimal("starting_bid").notNullable();

      // FOREIGN KEY
      tbl 
        .integer("seller_id")
        .unsigned()
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })

    .createTable("item_bids", tbl => {

      // FOREIGN KEY
      tbl
        .integer("item_id")
        .unsigned()
        .references("items.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl.decimal("current_bid").notNullable();
      
      // FOREIGN KEY
      tbl
        .integer("bidder_id")
        .unsigned()
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists("item_bids")
  .dropTableIfExists("items")
  .dropTableIfExists("users")
};
