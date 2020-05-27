const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
}

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users")
    .first()
    .where(filter);
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id });
}

function update(changes, id) {
  return db("users").where({id}).update(changes);
}
