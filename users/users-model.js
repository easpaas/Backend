const db = require("../data/dbConfig.js");

module.exports = {
  add,
  findBy,
  findById,
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
