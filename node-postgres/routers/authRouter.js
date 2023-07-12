const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");
const pool = require("../db");
const bcrypt = require("bcrypt");

router
  .route("/login")
  .get(async (req, res) => {
    req.session.user && req.session.user.username
      ? res.json({ loggedIn: true, username: req.session.user.username })
      : res.json({ loggedIn: false });
  })
  .post(async (req, res) => {
    validateForm(req, res);

    const potentialLogin = await pool.query(
      "SELECT id, username, passhash FROM users u WHERE u.username = $1",
      [req.body.username]
    );

    if (potentialLogin.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.password,
        potentialLogin.rows[0].passhash
      );
      if (isSamePass) {
        // login user
        req.session.user = {
          username: req.body.username,
          id: potentialLogin.rows[0].id,
        };
        console.log("logged in");
        res.json({ loggedIn: true, username: req.body.username });
      } else {
        // incorrect password
        console.log("incorrect password");
        res.json({ loggedIn: false, status: "Wrong username or password!" });
      }
    } else {
      // user does not exist
      console.log("user does not exist");
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  });

router.post("/signup", async (req, res) => {
  validateForm(req, res);

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    // register user
    const hashedPass = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds (how many times the password is hashed)
    const newUserQuery = await pool.query(
      "INSERT INTO users (username, passhash) VALUES ($1, $2) RETURNING id, username",
      [req.body.username, hashedPass]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };
    console.log("registered user");
    res.json({ loggedIn: true, username: req.body.username });
  } else {
    // user already exists
    console.log("user already exists");
    res.json({ loggedIn: false, status: "Username taken" });
  }
});

router.post;

module.exports = router;
