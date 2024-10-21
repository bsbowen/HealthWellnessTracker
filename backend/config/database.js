// src/config/database.js

require('dotenv').config({ path: './backend/.env' }); // Load environment variables from .env

const { Sequelize } = require('sequelize');


// Create a new Sequelize instance with database credentials from the .env file
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name
    process.env.DB_USER,     // Database username
    process.env.DB_PASS,     // Database password
    {
        host: process.env.DB_HOST,    // Database host (usually localhost)
        dialect: 'mysql',             // Dialect to use (MySQL in this case)
    }
);

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);

// Export the Sequelize instance to be used in other parts of the app
module.exports = sequelize;