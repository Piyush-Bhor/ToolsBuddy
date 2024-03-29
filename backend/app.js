// import dependencies
const express = require('express');
const path = require('path');
require("dotenv").config();
const mongoose = require('mongoose');
const session = require('express-session');
const request = require('request');
const { auth, requiresAuth } = require('express-openid-connect');
const cors = require('cors');


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

/* 
//oauth 
app.get('/outh_profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});
*/

app.post('/auth/oauth/callback', (req, res) => {
  // Process OAuth callback, get username
  const username = req.oidc.user.nickname;
  const itemsRented = [];
  const itemsLend = [];

  const newRental = new Rental({
    username : username,
    itemsRented: itemsRented,
    messages: { incoming: [], outgoing: [] },
    itemsLend: itemsLend,
  });

  newRental.save()
    .then(() => {
      return res.status(201).json({ message: 'User created successfully' });
    })
    .catch((error) => {
      console.error('Error saving user:', error);
      return res.status(500).json({ error: 'Error creating user' });
    });
});

// server
app.listen(8080);
console.log('Server running at http://localhost:8080');

module.exports = app;