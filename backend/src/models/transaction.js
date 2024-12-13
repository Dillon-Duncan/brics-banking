const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromAccount: {
    type: String,
    required: [true, 'Path `fromAccount` is required.'],
    match: /^[0-9]{10}$/, // Ensures the account number is exactly 10 digits.
  },
  toAccount: {
    type: String,
    required: [true, 'Path `toAccount` is required.'],
    match: /^[0-9]{10}$/, // Ensures the account number is exactly 10 digits.
  },
  amount: {
    type: Number,
    required: [true, 'Path `amount` is required.'],
    min: 0.01, // Minimum transfer amount must be greater than zero.
  },
  currency: {
    type: String,
    required: [true, 'Path `currency` is required.'],
    enum: ['ZAR', 'BRL', 'RUB', 'INR', 'CNY'], // Restricts to specific supported currencies.
  },
  swiftCode: {
    type: String,
    required: [true, 'Path `swiftCode` is required.'],
    match: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, // Ensures SWIFT code is valid.
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'Rejected'], // Restricts status to specific options.
    default: 'Pending', // Default status is "Pending".
  },
  date: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time.
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields.

transactionSchema.statics.getAllTransactions = function() {
  return this.find({});
};

module.exports = mongoose.model('Transaction', transactionSchema);
