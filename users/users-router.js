const router = require("express").Router();
const jwt = require("jsonwebtoken");


const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const { isValid } = require("./users-service.js");

router.use(restricted);

router.get("/", (req,res) => {
  Users.find().then(users => {
    res.status(200).json({ data: users })
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  });
});

router.post("/", (req, res) => {
  const user = req.body;

  if (isValid(user)) {
    Users.add(user)
      .then(saved => {
        res.status(201).json({ data: saved });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ message: "please provide all user information" });
  }
});

// // Update a user as a seller or bidder
// // Returns a updated JWT 
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   Users.update(changes, id)
//     .then(success => {
//       Users.findById(id)
//         .then(updatedUser => {
//           const token = createToken(updatedUser)
//           res.status(200).json({ data: token })
//         })
//         .catch(err => {
//           res.status(404).json({ message: `Could not find user with id = ${id}`})
//         });
//     })
//     .catch(err => {
//       res.status(500).json({ message: err.message });
//     });
// });


// function createToken(user) {
//   const payload = {
//     sub: user[0].id,
//     username: user[0].username,
//     seller: user[0].seller,
//   };

//   const secret = process.env.JWT_SECRET || "keepitsecret,keepitsafe!";

//   const options = {
//     expiresIn: "1d",
//   };

//   return jwt.sign(payload, secret, options);
// }

module.exports = router;
