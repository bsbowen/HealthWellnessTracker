// src/models/SleepRecord.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SleepRecord = sequelize.define('SleepRecord', {
    sleep_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hours_slept: {
        type: DataTypes.FLOAT,   // Number of hours slept
        allowNull: false,
    },
    sleep_quality: {
        type: DataTypes.STRING,   // Poor, Fair, Good, Excellent
        allowNull: false,
    },
    notes: {
        type: DataTypes.STRING,   // Optional notes on sleep
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
    tableName: 'SleepRecords',

});
module.exports = SleepRecord;