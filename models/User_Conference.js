const { Model, DataTypes } = require('sequelize');
const sequelize = require("./../database/db");
const User = require ('./User');
const Conference = require('./Conference');
const User_Conference = sequelize.define('User_Conference', {transcript: DataTypes.STRING}, {timestamps: false});
User.belongsToMany(Conference, {through: User_Conference});
Conference.belongsToMany(User, {through: User_Conference});

module.exports = User_Conference;