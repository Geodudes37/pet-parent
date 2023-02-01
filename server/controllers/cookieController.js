const db = require('../models/Model');
const { v4: uuidv4 } = require('uuid');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    res.cookie('user',res.locals.cookie,{
      httpOnly: true,
    });
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
  const SQLparams = [req.cookies.user];
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
