// src/models/ExerciseLog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const ExerciseLog = sequelize.define('ExerciseLog', {
    exercise_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    exercise_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,   // Duration in minutes
        allowNull: false,
    },
    calories_burned: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    intensity: {
        type: DataTypes.STRING,   // Low, Medium, High
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Use the table name to avoid importing User model
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'ExerciseLogs',
});

module.exports = ExerciseLog;