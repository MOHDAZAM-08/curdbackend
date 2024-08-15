// Import required modules
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require("cors");
const UserModel = require("./models/Users.js")

// Create an instance of Express app
const app = express();
app.use(cors());
app.use(express.json())

// Define a route
app.get('/get', (req, res) => {
  UserModel.find({})
  .then(users => res.json(users))
  .catch(err => res.json(err))
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({_id:id})
  .then(users => res.json(users))
  .catch(err => res.json(err))
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id:id})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});



app.post("/CreateUser",(req,res)=>{
  UserModel.create(req.body)
  .then(users => res.json(users))
  .catch(err => res.json(err))
})



// Define the port for the server to listen on
const PORT = process.env.PORT || 5001;

// Start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to DB");
      console.log("Server is running on port", PORT);
    });
  })
  .catch(err => {
    console.error("Error connecting to DB:", err);
  });
