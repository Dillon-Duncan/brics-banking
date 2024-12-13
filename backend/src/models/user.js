const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true,
    match: /^[a-zA-Z0-9_]{3,30}$/, // Restricting to alphanumeric and underscores only, between 3-30 characters.
  },
  accountNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Ensuring accountNumber is exactly 10 digits
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/, // Ensuring valid email format
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Enforcing minimum password length for better security
  },
  currency: {
    type: String,
    required: true,
    enum: ['ZAR', 'BRL', 'RUB', 'INR', 'CNY'], // Limiting to specific currencies
  },
  balance: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10); // 10 rounds of salting
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Instance method to compare password with the hashed version
userSchema.methods.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Static method to retrieve all users
userSchema.statics.getAllUsers = function() {
  return this.find({});
};

module.exports = mongoose.model('User', userSchema);
