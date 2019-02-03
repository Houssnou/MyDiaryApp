const router = require("express").Router();
const entriesHTMLRoutes = require("./htmlRoutes");

router.use("/", entriesHTMLRoutes);

module.exports = router;