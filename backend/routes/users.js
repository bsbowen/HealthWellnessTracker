// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import the User model //corrected user path to ../src/models/User


// POST route to create a new user
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password_hash } = req.body;  // Extract user details from request body

  try {
    // Create a new user in the database
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password_hash
    });

    // Send a success response back to the client
    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });

  } catch (error) {
    // Handle errors (e.g., duplicate emails)
    res.status(400).json({
      message: 'Error creating user',
      error: error.message
    });
  }
});

// GET route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();  // Fetch all users
    res.status(200).json(users);  // Send the users as a response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// GET route to fetch a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);  // Fetch user by primary key (id)
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// PUT route to update a user by ID
router.put('/:id', async (req, res) => {
  const { first_name, last_name, email, password_hash } = req.body;  // Extract updated fields from request body

  try {
    const user = await User.findByPk(req.params.id);  // Fetch user by ID
    if (user) {
      await user.update({
        first_name,
        last_name,
        email,
        password_hash
      });
      res.status(200).json({ message: 'User updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

// DELETE route to delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);  // Fetch user by ID
    if (user) {
      await user.destroy();  // Delete the user
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});




// POST route to authenticate a user

//

module.exports = router;

//Explanation:
//
// 	•	POST /register: This will accept a JSON object containing full_name, email, and password_hash from the request body and create a new user in the database.
// 	•	Error Handling: If something goes wrong (like a duplicate email), it sends back a 400 error with a message.