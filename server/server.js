const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// server static files

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// serves static files
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

// global error handling
app.use((req, res) => res.sendStatus(404));

// middleware error handling
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Caught Unknown middleware error.',
    status: 500,
    message: { err: 'An unknown error occured.' },
  };
  const { log, status, message } = Object.assign(defaultErr, err);
  console.log('ERROR: ', log);
  return res.status(status).send(message);
});

console.log(`listening on ${PORT}`);
app.listen(PORT);
