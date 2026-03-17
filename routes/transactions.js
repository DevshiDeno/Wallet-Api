const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

router.post("/transfer", (req, res) => {

  const { senderId, receiverId, amount } = req.body;

  if (!senderId || !receiverId || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  if (senderId === receiverId) {
    return res.status(400).json({ message: "Cannot transfer to same account" });
  }

  db.get(
    "SELECT * FROM accounts WHERE id = ?",
    [senderId],
    (err, sender) => {

      if (!sender) {
        return res.status(404).json({ message: "Sender not found" });
      }

      if (sender.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      db.get(
        "SELECT * FROM accounts WHERE id = ?",
        [receiverId],
        (err, receiver) => {

          if (!receiver) {
            return res.status(404).json({ message: "Receiver not found" });
          }

          const senderBalance = sender.balance - amount;
          const receiverBalance = receiver.balance + amount;

          db.run("UPDATE accounts SET balance = ? WHERE id = ?", [senderBalance, senderId]);
          db.run("UPDATE accounts SET balance = ? WHERE id = ?", [receiverBalance, receiverId]);

          db.run(
            `INSERT INTO transactions 
             (id, type, amount, sender_account_id, receiver_account_id)
             VALUES (?, ?, ?, ?, ?)`,
            [uuidv4(), "transfer", amount, senderId, receiverId]
          );

          res.json({ message: "Transfer successful" });

        }
      );
    }
  );
});
module.exports = router;