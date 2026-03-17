const express = require("express");
const app = express();

const accountRoutes = require("./routes/accounts");
const transactionRoutes = require("./routes/transactions");

app.use(express.json());

app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
});