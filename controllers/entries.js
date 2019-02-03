const cnx = require("../db/cnx");

module.exports = {
  //select all query
  getAllEntries: (req, res) => {
    cnx.query("SELECT * FROM entries", (err, dbEntries) => {
      if (err) {
        console.log("Select Error: " + err);
        res.status(400).json(err);
      };
      res.json(dbEntries);
    });
  },

  //add a entry
  addEntry: (req, res) => {
    cnx.query("INSERT INTO entries SET ?", req.body, (err, result) => {
      if (err) {
        console.log("Insert Error: " + err);
        res.status(400).json(err);
      };

      //res.json(result);
      //page redirection
      res.redirect("/entries");

    });
  },

  //update a entry
  updateEntry: (req, res) => {
    //build the const to update data
    const paramData = {
      title: req.body.title,
      content: req.body.content,
      last_modification: req.body.last_modification
    };
    //build the const where to update
    const paramWhere = {
      id: req.body.id
    };

    //Update products set ? where ?
    cnx.query("update entries set ? where ?", [paramData, paramWhere], (err, result) => {
      if (err) {
        console.log("Update Error: " + err);
        res.status(400).json(err);
      };
      res.json(result);
    });
  },

  //delete a entry
  deleteEntry: (req, res) => {
    cnx.query("delete from entries where id = ?", req.body.id, (err, result) => {
      if (err) {
        console.log("Delete Error: " + err);
        res.status(400).json(err);
      };
      res.json(result);

    });
  },

  //seachentry
  searchEntry: (req, res) => {
    connection.query("SELECT * FROM entries WHERE title = ? LIMIT 1", [req.params.title], function (err, dbEntry) {
      if (err) throw err;

      if (dbEntry[0]) {
        res.json(dbEntry[0]);
      } else {
        res.json(null);
      }
    });
  }
}