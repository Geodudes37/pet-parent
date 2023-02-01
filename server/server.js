const express = require('express');
const cors = require('cors');
const path = require('path');

const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const cookieController = require('../server/controllers/cookieController.js');
const userController = require('../server/controllers/userController.js');
// const pfController = require('../server/controllers/PFController.js');
const PFRouter = require('../server/routers/PFRouter.js');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: 'http://localhost:8080',
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// serves static files
// app.use('/build', express.static(path.join(__dirname, '../build')));
// app.post('/checkVerifyCookie',cookieController.verifySSIDCookie,(req,res)=>{
//   return res.status(200).send('verified ' + req.cookies);
// });
// route to log in / authentication
app.post('/login', userController.verifyUser, (req, res) => {
  return res
    .status(200).send('hello verify worked is worked haha');
});
// // route to create a new user
app.post('/createUser', userController.createUser,cookieController.setSSIDCookie, (req, res) => {
  return res
    .status(200).send('successful user creation');
});

// routes to landing page
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});
// route to external petfinder API
app.use('/api', PFRouter);

// route to userRouter for adding/linking pets to user and pet interactions data stuff
// app.use('/dashboard/pets', userRouter);

// global error handling
app.use((req, res) => res.sendStatus(404));

// middleware error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Caught Unknown middleware error.',
    status: 500,
    message: { err: 'An unknown error occurred.' },
  };
  const { log, status, message } = Object.assign({}, defaultErr, err);
  console.log('ERROR is: ', log);
  return res.status(status).send(message);
});

console.log(`listening on ${PORT}`);
app.listen(PORT);

module.exports = app;
