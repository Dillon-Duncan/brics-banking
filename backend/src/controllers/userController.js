const UserService = require('../services/userService');
const User = require('../models/user');

class UserController {
  /**
   * Create a new user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Get a user by account number.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getUserByAccountNumber(req, res) {
    try {
      const { accountNumber } = req.params;
      const user = await UserService.findUserByAccountNumber(accountNumber);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update a user by account number.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateUserByAccountNumber(req, res) {
    try {
      const { accountNumber } = req.params;
      const update = req.body;
      const updatedUser = await UserService.updateUserByAccountNumber(accountNumber, update);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Delete a user by account number.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteUserByAccountNumber(req, res) {
    try {
      const { accountNumber } = req.params;
      const deletedUser = await UserService.deleteUserByAccountNumber(accountNumber);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all users.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Login a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async loginUser(req, res) {
    try {
      const { username, accountNumber, password } = req.body;
      const user = await User.findOne({ username, accountNumber });
      if (!user || !(await user.isValidPassword(password))) {
        return res.status(401).json({ error: 'Invalid username, account number, or password' });
      }
      // Generate token or handle session (not implemented here)
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Register a new user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async registerUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
