require('dotenv').config();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");
const router = require("express").Router();


router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = 5;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;

  Users.findBy({ username })
      // .first()
      .then(someone => {
          if (someone && bcryptjs.compareSync(password, someone.password)) {
              const token = createToken(someone);
              res.status(200).json({ data: someone, token})
          } else {
              res.status(401).json({ message: 'Invalid Credentials!' })
          }
      })
      .catch(err => {
          console.log('error logging in', err)
          res.status(500).json({ errorMessage: 'Could not log in!' })
      })
})

function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    seller: user.seller,
  };

  const secret = process.env.JWT_SECRET || "keepitsecret,keepitsafe!";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
