const pool = require("../db");
const bcrypt = require("bcrypt");

module.exports.handleLogin = (req, res) => {
  if (req.session.user && req.session.user.username) {
    res.json({ loggedIn: true, username: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports.attemptLogin = async (req, res) => {
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
};

module.exports.attemptRegister = async (req, res) => {
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
};
