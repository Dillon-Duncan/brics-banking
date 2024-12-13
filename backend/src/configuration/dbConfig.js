const mongoose = require('mongoose');

const dbConfigMongoose = async () => {
  try {
    await mongoose.connect('mongodb+srv://duncan:n14mU6llUNNmlO3Q@brics2.lrg1y.mongodb.net/?retryWrites=true&w=majority&appName=BRICS2');
    console.log('Connected to the database');
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
};

module.exports = { mongoose, dbConfigMongoose };