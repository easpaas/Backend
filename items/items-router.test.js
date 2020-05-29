const request = require('supertest');
const db = require("../data/dbConfig.js");
const server = require("../api/server.js");

test("GET /api/items is successful", async () => {
  const login = await request(server)
  .post("/api/auth/login")
  .send({username: "Evan", password: "password"});

  expect(login.body).toHaveProperty("token");

  const res = await request(server)
    .get("/api/items")
    .set("authorization", login.body.token)

  expect(res.status).toBe(200);
});

test('GET /api/items/:id is successful', async () => {
  const login = await request(server)
  .post("/api/auth/login")
  .send({username: "Evan", password: "password"});

  let token = login.body.token;

  const addItem = await request(server)
    .post("/api/items")
    .set("authorization", token)
    .send({
      title: "adding an item",
      image_url: "no image url",
      description: "some sort of describing text",
      category: "homer",
      starting_bid: 100, 
      seller_id: 1
    });

  const itemId = addItem.body[0].id;

  const res = await request(server)
    .get(`/api/items/${itemId}`)
    .set("authorization", token);

  expect(res.body).toHaveLength(1);
  expect(res.status).toBe(200);
});

test("POST /api/items successful", async () => {
  const login = await request(server)
  .post("/api/auth/login")
  .send({username: "Evan", password: "password"});

  let token = login.body.token;

  const res = await request(server)
    .post("/api/items")
    .set("authorization", token)
    .send({
      title: "",
      image_url: "",
      description: "",
      category: "",
      starting_bid: 10, 
      seller_id: 1
    });

    const item = res.body[0];

    expect(res.status).toBe(201);
    
    expect(item).toHaveProperty("title");
});

test("PUT /api/items/:id is successful", async () => {
  const login = await request(server)
  .post("/api/auth/login")
  .send({username: "Evan", password: "password"});

  let token = login.body.token;

  const addItem = await request(server)
    .post("/api/items")
    .set("authorization", token)
    .send({
      title: "adding an item",
      image_url: "no image url",
      description: "some sort of describing text",
      category: "homer",
      starting_bid: 100, 
      seller_id: 1
    });

  const itemId = addItem.body[0].id;

  const res = await request(server)
    .put(`/api/items/${itemId}`)
    .set("authorization", token)
    .send({
      title: "A title lives here",
    });

    expect(res.body).toBe(1);
    expect(res.status).toBe(200);
});

test("DELETE /api/items/:id is successful", async () => {
  const login = await request(server)
  .post("/api/auth/login")
  .send({username: "Evan", password: "password"});

  let token = login.body.token;

  const addItem = await request(server)
    .post("/api/items")
    .set("authorization", token)
    .send({
      title: "adding an item",
      image_url: "no image url",
      description: "some sort of describing text",
      category: "homer",
      starting_bid: 100, 
      seller_id: 1
    });

  const itemId = addItem.body[0].id;

  const res = await request(server)
    .delete(`/api/items/${itemId}`)
    .set("authorization", token);

  expect(res.status).toBe(204)
})