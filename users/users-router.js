const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const { isValid } = require("./users-service.js");

router.use(restricted);

router.get("/", (req,res) => {
  Users.find().then(users => {
    console.log(users)
    res.status(200).json({data: users})
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

// Update a user as a seller or bidder
router.put("/:id", (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  Users.update(changes, id)
    .then(updatedUser => {
      updatedUser ?
      res.status(200).json(updatedUser)
      :
      res.status(404).json({ message: `Could not find user with id = ${id}`})
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// TODO - this middleware should be used within the items router to prevent anyone but a bidder from creating items


// // middleware
// function checkRole(user) {
//   return function (req, res, next) {
//     const seller = req.jwt.seller;

//     if (req.jwt && req.jwt.seller) {
//       next();
//     } else {
//       res.status(403).json({ you: "have no power here" });
//     }
//   };
// }

module.exports = router;
