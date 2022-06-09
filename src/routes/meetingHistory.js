var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("meetingHistory", { title: "Express" });
});

module.exports = router;
