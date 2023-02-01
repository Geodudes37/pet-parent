const pg = require('pg');
const db = require('../models/Model.js');

const petController = {};

// middleware to create a user/account in DB
petController.addPet = async (req, res, next) => {
  console.log('inside of addPet middleware')
  const { name, petfinder, score } = req.body;
  const cookies = req.cookies.user;
 
    /// query users table for usernameid using cookie

const userSQLQuery = `SELECT id FROM users WHERE cookies = ${cookies}`


  const SQLquery = `INSERT INTO pets (name, petfinder, score, usernameid)
    VALUES ($1, $2, $3, $4)`;

  try {
    console.log('COOKIES IS: ', cookies)
    const userQueryResponse = await db.query(userSQLQuery);
    const usernameid = userQueryResponse.rows[0].id;
    console.log('usernameid IS', usernameid);

    const SQLparams = [
        name,
        petfinder,
        score,
        usernameid, 
      ];

    const queryResponse = await db.query(SQLquery, SQLparams);
    console.log('posting to pets table completed')
    return next();
  } catch (error) {
    return next({
      log: `error in addPet middleware: ${error}`,
      status: 400,
      message: { error },
    });
  }
};

petController.getPet = async (req, res, next) => {
    console.log('inside of getPet middleware')
    const cookies = req.cookies.user;
   
      /// query users table for usernameid using cookie
  
  const userSQLQuery = `SELECT id FROM users WHERE cookies = ${cookies}`
  
  try {
      console.log('COOKIES IS: ', cookies)
      const userQueryResponse = await db.query(userSQLQuery);
      const usernameid = userQueryResponse.rows[0].id;
      console.log('usernameid IS', usernameid);
      
      const SQLquery = `SELECT * FROM pets WHERE usernameid = ${usernameid}`;
    //   const SQLparams = [
    //       usernameid, 
    //     ];
  
      const queryResponse = await db.query(SQLquery);
      const result = queryResponse.rows;
      console.log("RESULT FROM QUERY RESPONSE IS: ", result);
      res.locals.pet = result;
      return next();
    } catch (error) {
      return next({
        log: `error in addPet middleware: ${error}`,
        status: 400,
        message: { error },
      });
    }
  };

module.exports = petController;