const pg = require('pg');
const db = require('../models/Model.js');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const userController = {};


// middlware to verify password from user against hashed password saved in DB
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  // query the database for the username and saved hashed password
  const SQLquery = `SELECT (password) FROM users WHERE username = $1`;
  const SQLparams = [username];
  try {
    const queryResponse = await db.query(SQLquery, SQLparams);
    console.log(queryResponse,'QUER RESPONSE')
    if (!queryResponse.rows[0]) {
      return next({
        log: `User not found during verifyUser: ${error}`,
        status: 400,
        message: { error },
      });
    }
    else {
      const result = bcrypt.compareSync(hashedPassword, queryResponse[0].password)
      if (result) {
        return next()
      }
      else {
       return  next({
          log: `Incorrect password`,
          status: 400,
          message: { error },
        });
      }
    }
    res.locals.username = username;
    return next();
    }catch(error){
      return  next({
        log: `Error found in verifyUser`,
        status: 400,
        message: { error },
      });
    }

  } 

// middleware to create a user/account in DB
userController.createUser = async (req, res, next) => {
  console.log('')
  const { username, password, firstname, lastname, zipcode} =
    req.body;
    console.log(req.body,'ASDFUAOBWERIUFBLAIU')
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  res.locals.cookies = uuidv4();
  const cookies = res.locals.cookies;

  const SQLquery = `INSERT INTO users (username, password, firstname, lastname, zipcode, cookies,salt)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

  const SQLparams = [
    username,
    hashedPassword,
    firstname,
    lastname,
    zipcode,
    cookies,
    salt
  ];

  try {
    const queryResponse = await db.query(SQLquery, SQLparams);
    console.log('posting to users table completed');
    return next();
  } catch (error) {
    return next({
      log: `error in createUser middleware: ${error}`,
      status: 400,
      message: { error },
    });
  }
};

module.exports = userController;