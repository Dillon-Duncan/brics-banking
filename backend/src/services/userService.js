const User = require('../models/user'); // Correct capitalization for the model

class UserService {
  /**
   * Create a new user.
   * @param {Object} userDetails - The details of the user to create.
   * @returns {Object} - The newly created user document.
   */
  async createUser(userDetails) {
    try {
      // Create a new user instance and save it to the database.
      const newUser = new User(userDetails);
      await newUser.save(); // Middleware (e.g., password hashing) will trigger automatically.
      return newUser;
    } catch (error) {
      // Handle specific errors, like duplicate keys or validation failures.
      if (error.name === 'ValidationError') {
        // Extract validation error details.
        const errors = Object.values(error.errors).map(err => err.message);
        throw new Error(`Validation Error: ${errors.join(', ')}`);
      }
      if (error.code === 11000) {
        // Detect the specific duplicate field(s).
        const duplicateField = Object.keys(error.keyPattern).join(', ');
        throw new Error(`Duplicate Error: A user with the same ${duplicateField} already exists.`);
      }
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Find a user by account number.
   * @param {String} accountNumber - The account number to find the user.
   * @returns {Object|null} - The found user document or null if not found.
   */
  async findUserByAccountNumber(accountNumber) {
    try {
      const foundUser = await User.findOne({ accountNumber });
      if (!foundUser) {
        throw new Error('User not found with the provided account number.');
      }
      return foundUser;
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  /**
   * Update a user by account number.
   * @param {String} accountNumber - The account number to find the user.
   * @param {Object} update - The update to apply to the user.
   * @returns {Object|null} - The updated user document or null if not found.
   */
  async updateUserByAccountNumber(accountNumber, update) {
    try {
      const updatedUser = await User.findOneAndUpdate({ accountNumber }, update, { new: true, runValidators: true });
      if (!updatedUser) {
        throw new Error('User not found for the provided account number.');
      }
      return updatedUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Extract validation error details.
        const errors = Object.values(error.errors).map(err => err.message);
        throw new Error(`Validation Error: ${errors.join(', ')}`);
      }
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  /**
   * Delete a user by account number.
   * @param {String} accountNumber - The account number to find and delete the user.
   * @returns {Object|null} - The deleted user document or null if not found.
   */
  async deleteUserByAccountNumber(accountNumber) {
    try {
      const deletedUser = await User.findOneAndDelete({ accountNumber });
      if (!deletedUser) {
        throw new Error('User not found for the provided account number.');
      }
      return deletedUser;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  /**
   * Retrieve all users.
   * @returns {Array} - An array of all user documents.
   */
  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error(`Error retrieving users: ${error.message}`);
    }
  }
}

module.exports = new UserService();
