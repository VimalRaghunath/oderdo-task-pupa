const asyncHandler = require("express-async-handler");
const User = require("../Model/userSchema");
const generateToken = require("../Middleware/generateToken");


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User Already exists");
    }  
      const user = await User.create({
        name,
        email,
        password
      });

      if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
      } else {
        res.status(400);
        throw new Error("User Not Found")
      }
});

  const authUser = asyncHandler(async (req, res) => {
    

      const { email, password } = req.body;
      console.log(email,'------------------');


      const user = await User.findOne({ email });

      if(user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
      } else {
        res.send(401);
        throw new Error("Invalid Email or Password")
      }
  })


module.exports = { registerUser, authUser }
