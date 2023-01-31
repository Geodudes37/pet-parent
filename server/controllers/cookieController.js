const db = require('../models/Model');
const { v4: uuidv4 } = require('uuid');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  console.log('inside cookieController setSSIDCookie middleware')
  try {
    // const username = `${res.locals.username}`;
    res.locals.cookies = uuidv4();
    console.log(res.locals.cookies,'THIS IS THE COOKIES')
    // console.log(username);
    // console.log(res.locals.cookies);
    // const SQLquery = `UPDATE users SET cookies = $1 WHERE username = $2`;
    // const SQLparams = [res.locals.cookies, username];
    // const queryResponse = await db.query(SQLquery, SQLparams);
    return next();
  } catch (error) {
    return next({
      log: `error in setSSIDCookie middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to create cookie' },
    });
  }
};

cookieController.verifySSIDCookie = async (req, res, next) => {
  const SQLquery = `SELECT username from users where cookies=$1`;
  const SQLparams = [res.locals.cookies];
  try {
    const queryResponse = await db.query(SQLquery, SQLparams);
    if (!queryResponse) {
      return next({
        log: `error in verifySSIDCookie middleware: ${error}`,
        status: 400,
        message: { error },
      });
    }
    return next();
  } catch (error) {
    return next({
      log: `error in verifySSIDCookie middleware: ${error}`,
      status: 400,
      message: { error },
    });
  }
};

module.exports = cookieController;
