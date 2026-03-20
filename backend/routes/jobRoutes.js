const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Job route working");
});

module.exports = router;