const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
  
const app = express();
const port = 6000;

const validatorRoute = require('./Routes/route.js');
  
app.use(cors());

app.use(express.json({
    limit: "30mb", extended: true
  }));
  
  app.use(express.urlencoded({
    limit: "30mb", extended: true
  }));

app.use('/', validatorRoute);

app.listen(port, '0.0.0.0', (error) => {
    if(!error)
    {
        console.log("Running properly on port " + port);
    }
    else
    {
        console.log("Error", error);
    }
});