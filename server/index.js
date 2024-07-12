const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

// Importing the routes
const routes = require('./routes/index');
const connectToDB = require('./utils/connectDB');
require('./utils/passport');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

connectToDB();

app.use('/v1/user', routes.user);
app.use('/v1/projects', routes.project);

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    // Temporary workaround
    return next(error); // Pass the error further along
  }

  return res.status(error.statusCode).json({ error: error.toString() });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});