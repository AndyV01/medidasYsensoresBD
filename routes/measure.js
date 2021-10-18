const express = require('express');
const router = express.Router();

// En routes/measure.js
const Measure = require('../models/Measure');
const Sensor = require('../models/Sensor');

//Agregar una medida
router.post('/:sensorId', async (req, res) => {
  try {
    if (!req.body.temperature) {
      return res.json({
        success: false,
        message: 'Missing the temperature'
      });
    }

    if (!req.body.hour) {
      return res.json({
        success: false,
        message: 'Missing the hour'
      });
    }

    const { temperature, hour } = req.body;
    const sensorId = req.params.sensorId;

    const measure = await Measure.create({
      temperature,
      hour,
      sensor_id: sensorId
    });

    return res.json({
      success: true, newMeasure: measure
    });
  } catch(exception) {
    return res.json({
      success: false, error: exception
    });
  }
});

// Obtener las medidas dado un Sensor Id
router.get('/:sensorId', async (req, res) => {
  try {   
    const sensorId = req.params.sensorId;
    const measures = await Measure.findAll({
      where: {
        sensor_id: sensorId
      }
    });

    return res.json({ 
      success: true, measures: measures
    });
  } catch(exception) {
    return res.json({ 
      success: false, error: exception
    });
  }
});

// Obtener todas las medidas y sus sensores
router.get('/', async (req, res) => {
  try {

    const measures = await Measure.findAll({
      include: {
        model: Sensor
      }
    });

    return res.json({ 
      success: true, measures: measures
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
