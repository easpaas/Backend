const router = require("express").Router();
const jwt = require("jsonwebtoken");


const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const { isValid } = require("./users-service.js");


router.get("/", (req,res) => {
  Users.find().then(users => {
    res.status(200).json({ data: users })
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  });
});

// Require JWT to access any endpoints below this line
router.use(restricted);

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

router.delete("/:id", (req, res) => {
  const {id} = req.params;

  Users.remove(id)
    .then(success => {
      res.status(200).json({ message: `Successfully removed user id ${id} `})
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message })
    });
});

module.exports = router;
