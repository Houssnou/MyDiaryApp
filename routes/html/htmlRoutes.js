const router = require("express").Router();
const path = require("path");
//routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/entries", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/entries.html"));
});
router.get("/addEntry", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/addEntry.html"));
});

module.exports = router;