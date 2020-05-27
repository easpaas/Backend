const express = require("express");

const restricted = require("../auth/restricted-middleware.js");
const Items = require("./items-model.js");


const router = express.Router();

// Require JWT to access
router.use(restricted);

router.get("/", (req, res) => {
  Items.find()
    .then(items => {
      res.status(200).json(items);
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
        res.status(200).json(item);
      } else {
        res
          .status(404)
          .json({ message: "Could not find item with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get items" });
    });
});

// Find all items belonging to seller by id
router.get("/seller/:id", (req, res) => {
  const {id} = req.params;

  Items.findSellersItems(id)
    .then(items => {
      if(items) {
        res.status(200).json(items);
      } else {
        res.status(404).json({ message: `cannot find seller with id ${id}` })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Failed to get items for seller' })
    });
});

// TODO 

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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Items.update(changes, id)
    .then(updatedItem => {
      updatedItem ?
        res.status(200).json(updatedItem)
        :
        res.status(404).json({ message: "Could not find item with given id" })
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
        res.json({ message: `Successfully removed item with id ${id} from database` });
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
