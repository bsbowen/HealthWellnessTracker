require('dotenv').config({ path: './backend/.env' });

// Import necessary modules
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Import Sequelize models and associations
const { User, CalorieEntry, ExerciseLog, SleepRecord } = require('./models');

// Import route files
const usersRouter = require('./routes/users');
const calorieEntriesRouter = require('./routes/calorieEntries');
const exerciseLogRouter = require('./routes/exerciseLogs');
const sleepRecordRouter = require('./routes/sleepRecords');

// Create an instance of an Express application
const app = express();

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());  // Use built-in middleware to parse JSON
app.use(cors());

// Optionally, add request logging
const morgan = require('morgan');
app.use(morgan('dev'));

// Route setup
app.use('/users', usersRouter);
app.use('/calorie-entries', calorieEntriesRouter);
app.use('/exercise-logs', exerciseLogRouter);
app.use('/sleep-records', sleepRecordRouter);

// Test route
app.get('/', (req, res) => {
    res.send('Health Wellness Tracker API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Sync the Sequelize models with the MySQL database and start the server
sequelize.sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = app;