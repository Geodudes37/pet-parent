const pg = require('pg');
const db = require('../models/Model.js');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const userController = {};
const salt = bcrypt.genSaltSync(10);

// middlware to verify password from user against hashed password saved in DB
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);
  // query the database for the username and saved hashed password
  const SQLquery = `SELECT (password) FROM users WHERE username = $1`;
  const SQLparams = [username];
  try {
    const queryResponse = await db.query(SQLquery, SQLparams);
    if (!queryResponse) {
      return next({
        log: `error in verifyUser middleware: ${error}`,
        status: 400,
        message: { error },
      });
    }
    res.locals.username = username;
    return next();
  } catch (error) {
    return next({
      log: `error in verifyUser middleware: ${error}`,
      status: 400,
      message: { error },
    });
  }
};

// middleware to create a user/account in DB
userController.createUser = async (req, res, next) => {
  const { username, password, firstname, lastname, zipcode} =
    req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);
  const cookies = res.locals.cookies;

  const SQLquery = `INSERT INTO users (username, password, firstname, lastname, zipcode, cookies)
    VALUES ($1, $2, $3, $4, $5)`;

  const SQLparams = [
    username,
    hashedPassword,
    firstname,
    lastname,
    zipcode,
    cookies
  ];

  try {
    const queryResponse = await db.query(SQLquery, SQLparams);
    console.log('posting to users table completed');
    return next();
  } catch (error) {
    next({
      log: `error in createUser middleware: ${error}`,
      status: 400,
      message: { error },
    });
  }
};

module.exports = userController;