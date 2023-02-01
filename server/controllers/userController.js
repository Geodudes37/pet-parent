const pg = require('pg')
const db = require('../models/Model.js')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

const userController = {}

// middlware to verify password from user against hashed password saved in DB
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body
  console.log("USERNAME AND PASSWORD INSIDE VERIFYUSER MIDDLEWARE IS: ", username, password)
  // query the database for the username and saved hashed password
  const SQLquery = `SELECT password,cookies FROM users WHERE username = $1`
  const SQLparams = [username]
  try {
    // console.log(queryResponse,'QUERYRESPONSE');
    const queryResponse = await db.query(SQLquery, SQLparams)
    console.log(queryResponse,'QUERYRESPONSE');
    if (!queryResponse.rows[0]) {
      return next({
        log: `User not found during verifyUser: ${error}`,
        status: 400,
        message: { error },
      })
    }
    const { rows } = queryResponse
    const result = bcrypt.compareSync(password, rows[0].password)
    if (!result) {
      return next({
        log: `Incorrect password`,
        status: 400,
        message: { error },
      })
    }
    //set the user cookie if they exist in db
    res.cookie('user', rows[0].cookies)
    return next()
  } catch (error) {
    return next({
      log: `Error found in verifyUser`,
      status: 400,
      message: { error },
    })
  }
}

// middleware to create a user/account in DB
userController.createUser = async (req, res, next) => {
  try {
    res.locals.cookie = uuidv4();
    console.log('inside of creatUser middleware')
    const { username, password, firstname, lastname, zipcode } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
  
    const SQLquery = `INSERT INTO users (username, password, firstname, lastname, zipcode, cookies,salt)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`
  
    const SQLparams = [
      username,
      hashedPassword,
      firstname,
      lastname,
      zipcode,
      res.locals.cookie,
      salt,
    ]
    const queryResponse = await db.query(SQLquery, SQLparams)
    console.log('posting to users table completed')
    
    res.locals.username = username;
    return next()
  } catch (error) {
    return next({
      log: `error in createUser middleware: ${error}`,
      status: 400,
      message: { error },
    })
  }
}

module.exports = userController
