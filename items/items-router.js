const express = require("express");

const restricted = require("../auth/restricted-middleware.js");
const Items = require("./items-model.js");


const router = express.Router();

// Require JWT to access
router.use(restricted);

router.get("/", (req, res) => {
  Items.find()
    .then(items => {
      res.status(200).json({data: items});
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get Items" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Items.findById(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        res
          .status(404)
          .json({ message: "Could not find item with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get Items" });
    });
});

// router.get("/:id/steps", (req, res) => {
//   const { id } = req.params;

//   Items.findSteps(id)
//     .then(steps => {
//       if (steps.length) {
//         res.json(steps);
//       } else {
//         res
//           .status(404)
//           .json({ message: "Could not find steps for given item" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to get items" });
//     });
// });

router.post("/", (req, res) => {
  const itemData = req.body;

  Items.add(itemData)
    .then(item => {
      res.status(201).json(item);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new item" });
    });
});

router.post("/:id/steps", (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Items.findById(id)
    .then(scheme => {
      if (scheme) {
        Items.addStep({...stepData, scheme_id: id}).then(step => {
          res.status(201).json(step);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new step" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Items.update(changes, id)
    .then(updatedScheme => {
      updatedScheme ?
        res.status(200).json(updatedScheme)
        :
        res.status(404).json({ message: "Could not find scheme with given id" })
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update item" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Items.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find item with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete item" });
    });
});

module.exports = router;
