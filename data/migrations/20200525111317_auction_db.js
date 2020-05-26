exports.up = function (knex) {
  return knex.schema
    .createTable("roles", tbl => {
      tbl.increments();

      tbl.string("name", 128).notNullable().unique();
    })
    .createTable("users", tbl => {
      tbl.increments();

      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();

      // FOREIGN KEY
      tbl
        .integer("role")
        .unsigned()
        .references("roles.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("items", tbl => {
      tbl.increments();

      // .index() allows users to search by item name
      tbl.string("name").notNullable().index();
      tbl.string("image_url").notNullable();
      tbl.string("description").notNullable();
      tbl.decimal("starting_bid").notNullable();
    // tbl.date("list date").notNullable();
    // tbl.boolean("sold").default("false")

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
  return knex.schema.dropTableIfExists("items").dropTableIfExists("users").dropTableIfExists("roles");
};
