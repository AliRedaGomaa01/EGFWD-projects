// Setup empty JS object to act as endpoint for all routes
var projectData = {};

// Require Express to run server and routes
const express = require('express');   // methods .use() & .static() 

// Start up an instance of app
const app = express();

/// * Dependencies 
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(3000, () => { console.log(`running on location :3000`) });


// Post Route
app.post("/add", (req, res) => {
  projectData = req.body;
  res.send(projectData);
  return projectData;
});


//// GET Route

app.get("/all", (req, res) => { res.send(projectData); });

// If you find any problem with web app please stop all chrome extensions & also open terminal in admin mode  

