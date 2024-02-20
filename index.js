const express =require("express");
const mongoose=require("mongoose");
const cors =require("cors")
const dotenv =require("dotenv");
const  route  = require("./routes/route");
const app=express()
dotenv.config()
const bodyParser = require("body-parser");



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//const mongoose = require('mongoose');
const User = require('./Models/UserModel'); // Assuming 'user.js' is in the same directory


// mongoose.connect('mongodb+srv://modassar123:modassar1234@test.ahxnnau.mongodb.net/bank', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Example usage of the User model
// const newUser = new User({
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   phone: 1234567890,
//   password: 'securepassword',
// });

// newUser.save()
//   .then(() => {
//     console.log('User saved successfully');
//   })
//   .catch(error => {
//     console.error('Error saving user:', error);
//   });

mongoose.connect(process.env.MOG_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(error => {
  console.error('Error connecting to MongoDB Atlas:', error);
});
app.post('/users', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.use("/",route)
   const PORT=process.env.PORT||8080
    app.listen(PORT,()=>{
        console.log("server is running")
    })
