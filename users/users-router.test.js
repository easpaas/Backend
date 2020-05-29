const request = require('supertest');
const db = require("../data/dbConfig.js");
const server = require("../api/server.js");

test('register user', async () => {
  const res = await request(server)
    .post("/api/auth/register")
    .send({username: "Chris", password: "pass", seller: true});

    expect(res.status).toBe(201);
});

test('login user', async () => {
  const res = await request(server)
    .post("/api/auth/login")
    .send({username: "Evan", password: "password"});

    expect(res.body).toHaveProperty("token");

    expect(res.status).toBe(200)
});

test('GET /api/users is successful', async () => {
  const login = await request(server)
    .post("/api/auth/login")
    .send({username: "Evan", password: "password"});

  // assign token given back from server
  const token = login.body.token;
  
  const res = await request(server)
    .get("/api/users")
    .set('authorization', token)
    
    expect(res.status).toBe(200)
});