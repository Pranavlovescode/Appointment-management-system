// Imports
const app = require("express");
const mongoose = require("mongoose");
const { makeSignupUser } = require("./routes/signup_route");
const { outletRoute } = require("./routes/outlet_route");
const cors = require('cors')

// Server configuration
const server = app();
const port = 5000

// Middlewares
server.use(cors());  // should always be kept at the top
server.use(app.json());
server.use(app.urlencoded({ extended: true }));
server.use('/api', makeSignupUser)
server.use('/api', outletRoute)

require("dotenv").config();


// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(port, () => {
      console.log("Mongo DB is connected and Server is running on port 5000");
    });

  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


// Checking the server
server.get('/', (req, res) => {
  res.json({ "message": "Server is running !!!" })
  console.log('Server is running !!!')
})




