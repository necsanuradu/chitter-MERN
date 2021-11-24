const express = require("express");

// peepRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /peep.
const peepRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// npm install crypto
const crypto = require("crypto");

// This section will help you get a list of all the peeps.
peepRoutes.route("/peep").get(async function (req, res) {
  //let db_connect = dbo.getDb("employees");
  try {
    //listing messages in users mailbox
    await dbo
      .getDb("employees")
      .collection("peeps")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  } catch (err) {
      next(err);
  }
});

// This section will help you get a single peep by id
peepRoutes.route("/peep/:id").get(async function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("peeps").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new peep.
peepRoutes.route("/peep/add").post(async function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    user_name: req.body.user_name,
    peep_content: req.body.peep_content,
    peep_time: req.body.peep_time,
  };
  db_connect.collection("peeps").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a peep y id.
peepRoutes.route("/update/:id").post(async function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      user_name: req.body.user_name,
      peep_content: req.body.peep_content,
      peep_time: req.body.peep_time,
    },
  };
  db_connect
    .collection("peeps")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a peep
peepRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("peeps").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

// This section will help you create a new user.
peepRoutes.route("/user/xadd").post(async function (req, response) {
  let db_connect = dbo.getDb();
  let user_name = crypto
    .createHash("sha1")
    .update(req.body.user_name)
    .digest("hex");
  let user_password = crypto
    .createHash("sha1")
    .update(req.body.user_password)
    .digest("hex");
  let myobj = {
    user_name: user_name,
    user_password: user_password,
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you create a new user.
peepRoutes.route("/user/add").post(async function (req, res) {
  let db_connect = dbo.getDb();
  let user_name = crypto
    .createHash("sha1")
    .update(req.body.user_name)
    .digest("hex");
  let user_password = crypto
    .createHash("sha1")
    .update(req.body.user_password)
    .digest("hex");
  let myobj = {
    user_name: user_name,
    user_password: user_password,
  };
  let myquery = {
    user_name: user_name,
  };
  db_connect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    if (
      typeof result !== "object" ||
      result === null ||
      Object.keys(result).indexOf("user_name") < 0
    ) {
      db_connect.collection("users").insertOne(myobj, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    } else {
      res.json({});
    }
  });
});

// This section will help you get a single user by user_name and user_password and check if logged in
peepRoutes.route("/user/signin").post(async function (req, res) {
  let db_connect = dbo.getDb();
  let user_name = crypto
    .createHash("sha1")
    .update(req.body.user_name)
    .digest("hex");
  let user_password = crypto
    .createHash("sha1")
    .update(req.body.user_password)
    .digest("hex");
  let myquery = {
    user_name: user_name,
    user_password: user_password,
  };
  db_connect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

//get all the users
peepRoutes.route("/users").get(async function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = peepRoutes;
