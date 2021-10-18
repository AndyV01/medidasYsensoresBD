const express = require('express');
const router = express.Router();

// En routes/sensor.js
const Sensor = require('../models/Sensor');

// Obtener los sensores
router.get('/', async (req, res) => {
  try {
    
    const sensors = await Sensor.findAll({
      attributes: ['id', 'name', 'createdAt'],
      where: {
        deleted: false
      }
    });

    return res.json({ 
      success: true,
      sensors: sensors
    });
  } catch(exception) {
    return res.json({ 
      success: false, sensors: [], error: exception 
    });
  }
});

// Agregar un nuevo sensor
router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.json({
        success: false,
        message: 'Missing the name of the sensor'
      });
    }

    const { name } = req.body;

    const sensor = await Sensor.create({
      name: name
    });
    return res.json({ 
      success: true, newSensor: sensor
    });
  } catch(exception) {
    return res.json({ 
      success: false, newSensor: null, error: exception
    });
  }
});

router.delete('/:sensorId', async (req, res) => {
  try {
    const sensorId = req.params.sensorId;

    await Sensor.update({ deleted: true }, {
      where: {
        id: sensorId
      }
    });
    const sensors = await Sensor.findAll({
      attributes: ['id', 'name', 'createdAt'],
      where: { deleted: false }
    });

    return res.json({ 
      success: true, sensors: sensors
    });
  } catch(exception) {
    return res.json({ 
      success: false, error: exception
    });
  }
});

module.exports = {
  router: router
}
