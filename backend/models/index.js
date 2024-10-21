// models/index.js
const User = require('./User');
const CalorieEntry = require('./CalorieEntry');
const ExerciseLog = require('./ExerciseLog');
const SleepRecord = require('./SleepRecord');

// Define associations
User.hasMany(CalorieEntry, { foreignKey: 'userId' });
CalorieEntry.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ExerciseLog, { foreignKey: 'userId' });
ExerciseLog.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(SleepRecord, { foreignKey: 'userId' });
SleepRecord.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    CalorieEntry,
    ExerciseLog,
    SleepRecord,
};