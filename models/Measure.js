// En models/Measure.js
const Sequelize = require('sequelize');
const { sequelize: db } = require('../db');
const Sensor = require('./Sensor');
  
const Measure = db.define('measure', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  temperature: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hour: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sensor_id: {
    type: Sequelize.BIGINT,
    references: {
      model: Sensor,
      key: 'id'
    }
  },
});
Measure.belongsTo(Sensor, {foreignKey: 'sensor_id'});

module.exports = Measure;