const express = require("express");

const router = express.Router();

const { verifyEmailRequest } = require("../middleware/emailValidator");
const { createEmail } = require("../middleware/transportEmail");
const { send } = require("../controller/SendEmail");

router.get("/", (req, res) => {
  res.json({ message: "Hello from my portfolio API!" });
});

router.post("/send-email", verifyEmailRequest, createEmail, send);

module.exports = router;
