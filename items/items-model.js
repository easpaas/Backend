const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
  update,
  remove
}


function find() {
  return db("items");
}

async function add(item) {
  try {
    const [id] = await db("items").insert(item, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("items").where({ id });
}

function update(changes, id) {
  return db("items").where({id}).update(changes);
}

function remove(id) {
  return db("items").where({id}).del();
}