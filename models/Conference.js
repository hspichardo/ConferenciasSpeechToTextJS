const { Model, DataTypes } = require('sequelize');
const sequelize = require("./../database/db");

class Conference extends Model {}

Conference.init({
  // Model attributes are defined here
  date: {
    type: DataTypes.DATE,
  },
  topic: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Conference' // We need to choose the model name
});

module.exports = Conference;