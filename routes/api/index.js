const router = require("express").Router();
// import any api routes
const entriesRoutes = require("./entriesRoutes");

// prefix api routes with their specific endpoint name
router.use("/entries", entriesRoutes);

module.exports = router;