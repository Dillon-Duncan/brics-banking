const express = require('express');
const { dbConfigMongoose } = require('./src/configuration/dbConfig');
const userRoutes = require('./src/routes/userRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add CORS middleware
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Connect to the database and then start the server
dbConfigMongoose().then(() => {
  app.listen(port, () => {
    console.log(`Brics Banking is running on port ${port}`);
  });
});

// Use routes for users and transactions
app.use('/api/users', userRoutes);          // Prefix for user routes
app.use('/api/transactions', transactionRoutes);  // Prefix for transaction routes