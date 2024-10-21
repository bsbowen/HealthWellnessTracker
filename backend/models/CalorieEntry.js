// backend/models/CalorieEntry.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CalorieEntry = sequelize.define('CalorieEntry', {
    intake_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    meal_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    food_item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    protein: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    carbohydrates: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    fat: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Use the table name instead of the model
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'CalorieIntakes',
});

module.exports = CalorieEntry;