const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  //Create a token using the ID provided
  //Expires in one day
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' });
};

// Login a user
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    console.log('Login Request Body:', req.body); // Log the request body
    const user = await User.login(identifier, password); // Get the user from the model > db 

    // Create a token
    // Get the user id from the model and pass it as argument to the createToken function
    const token = createToken(user._id);

    //Response on local storage
    res.status(200).json({ 
      token,
      role: user.role,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    
    });
    //user: user.email
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Signup a user
const signupUser = async (req, res) => {
  const {
    role,
    username,
    firstname,
    lastname,
    gender,
    birthdate,
    region,
    province,
    city,
    barangay,
    email,
    password
  } = req.body;

  try {
    console.log('Signup Request Body:', req.body); // Log the request body
    // Check if all required fields are provided
    if (!role || !username || !firstname || !lastname || !gender || !birthdate || !region || !province || !city || !barangay || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await User.signup(
      role,
      username,
      firstname,
      lastname,
      gender,
      birthdate,
      region,
      province,
      city,
      barangay,
      email,
      password);

    // Create a token
    const token = createToken(user._id);

    //response on local storage
    res.status(200).json({ 
      token,
      role: user.role,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    });

    //user: user.email
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};

  // get all the users
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  //update the user profile
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userData = req.body;
    try {
      // Logic to update user data
      res.status(200).json(/* updated user data */);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


module.exports = { signupUser, loginUser, getAllUsers, updateUser };
