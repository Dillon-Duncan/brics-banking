const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Route to create a new user
router.post('/', UserController.createUser);

// Route to get a user by account number
router.get('/:accountNumber', UserController.getUserByAccountNumber);

// Route to get all users
router.get('/usersAll', UserController.getAllUsers);

// Route to update a user by account number
router.put('/:accountNumber', UserController.updateUserByAccountNumber);

// Route to delete a user by account number
router.delete('/:accountNumber', UserController.deleteUserByAccountNumber);

// Route for user login
router.post('/login', UserController.loginUser);

// Route for user registration
router.post('/register', UserController.registerUser);

// Example route definition
router.post('/example', (req, res) => {
  // Handle the request
  res.send('Example POST route');
});

module.exports = router;
