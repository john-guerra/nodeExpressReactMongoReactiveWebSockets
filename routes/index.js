var express = require("express");
var router = express.Router();

const myDB = require("../db/MyDB.js");
const mySockets = require("../socket/MySocket.js");

myDB.listenForChanges(mySockets.notifyAll);

/* GET home page. */
router.get("/posts", async (req, res) => {
  const posts = await myDB.getPosts();
  res.status(200).send({ posts });
});

module.exports = router;
