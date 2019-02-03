const router = require("express").Router();
const entryController = require("../../controllers/entries");

// methods for /api/entries (GET, POST,PUT and DELETE)
router
  .route("/")
  .get(entryController.getAllEntries)
  .post(entryController.addEntry)
  .put(entryController.updateEntry)
  .delete(entryController.deleteEntry)
  .search(entryController.searchEntry);

module.exports = router;