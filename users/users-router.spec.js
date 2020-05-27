const request = require('supertest');
const db = require("../data/dbConfig.js");

const users = require('./users-router.js');

describe("users router", () => {

  it('can run test', () => {
    expect(true).toBeTruthy();
  });

  // describe("POST to users", () => {
    
  //   it('should recieve status code 201 on success', async () => {
  //     return request(users)
  //     const expectedStatusCode = 201;

  //     const response = await db(

  //   })
  // });
});