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
      tbl.string("name").notNullable().index();
      tbl.string("image_url").notNullable();
      tbl.string("description").notNullable();
      tbl.decimal("starting_bid").notNullable();
      // tbl.date("list date").notNullable();
      tbl.boolean("sold").defaultTo(false);

      // FOREIGN KEY
      tbl 
        .integer("seller_id")
        .unsigned()
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items").dropTableIfExists("users");
};
