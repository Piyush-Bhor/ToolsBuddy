// import dependencies
const express = require('express');
const path = require('path');
require("dotenv").config();
const mongoose = require('mongoose');
const session = require('express-session');
const request = require('request');
const { auth, requiresAuth } = require('express-openid-connect');
const cors = require('cors')


// routers
const indexRoutes = require('./routes/index');
const rentalRoutes = require('./routes/rental');
const profileRoutes = require('./routes/profile');

// models

app = express();

// paths, ejs, and url setup
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// enable cors
app.use(cors());

// database connection
mongoose.set("strictQuery", false);

const url = process.env.CONNECTIONSTRING;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(url);
  console.log('Connected to MongoDB');
}

// oauth
const config = {
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  secret: process.env.SECRET,
  authRequired: false,
  auth0Logout: true,
};

app.use(auth(config));

// session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
})); 

// routes
app.use('/', indexRoutes); 
app.use('/rentals', rentalRoutes);
app.use('/profile', profileRoutes);


// server
app.listen(8080);
console.log('Server running at http://localhost:8080');

module.exports = app;