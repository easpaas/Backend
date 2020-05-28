const request = require('supertest');
const db = require("../data/dbConfig.js");
const server = require("../api/server.js");


test('register user', async () => {
  const res = await request(server)
    .post("/api/auth/register")
    .send({username: "Evan", password: "password", seller: true});

    console.log(res)
    // expect(res.status).toBe(200);
});

test('login user', async () => {
  const res = await request(server)
    .post("/api/auth/login")
    .send({username: "Evan", password: "password"});

    expect(res.body).toHaveProperty("token");

    expect(res.status).toBe(200)
});

// test('GET /api/users returns list of users', async () => {
//   const login = await request(server)
//     .post("/api/auth/login")
//     .send({username: "Evan", password: "password"});
  
//   const res = await request(server)
//     .get("/api/users")
//     .withCredentials(login.body.token)
//     console.log(res)
// })

// test('GET /api/users returns list of users', async () => {
//   const user = {
//     username: "evan",
//     password: "password",
//     seller: true
//   };
//   const userLogin = {
//     username: "evan",
//     password: "password"
//   };

//   // post to Register
//   const register = await request(server)
//     .post("/api/auth/register")
//     .send(user);

//     console.log(register.body)

  // // post to Login 
  // const login = await request(server)
  //   .post("/api/auth/login")
  //   .send(userLogin);

  //   console.log(login);

  // TODO save token 
  
  // const res = request(server)
  //   .get("/api/users")
  //   .then(response => {
  //     console.log(response)
  //   })
// })

