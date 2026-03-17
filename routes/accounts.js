const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

router.post("/", (req, res) => {

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const id = uuidv4();

  db.run(
    "INSERT INTO accounts (id, name, balance) VALUES (?, ?, ?)",
    [id, name, 0],
    function (err) {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        id,
        name,
        balance: 0
      });
    }
  );
});

router.get("/:id", (req, res) => {

  db.get(
    "SELECT * FROM accounts WHERE id = ?",
    [req.params.id],
    (err, row) => {

      if (!row) {
        return res.status(404).json({ message: "Account not found" });
      }

      res.json(row);
    }
  );
});

module.exports = router;