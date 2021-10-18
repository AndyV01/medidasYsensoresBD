const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { sequelize } = require('./db');

const { router: sensorRouter } = require('./routes/sensor');
const { router: measureRouter } = require('./routes/measure');

const app = express();
const PORT =  4000;

app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Solo en desarrollo
app.use(cors());

app.use('/sensors', sensorRouter);
app.use('/measures', measureRouter);

app.get('/ping', (request, response) => {
  
  response.send('Pong!');
});

// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((error) => {
    console.log('Error connecting Sequelize:', error);
  });



app.listen(PORT, async () => {
  console.log(`Server listening at port ${PORT}`);  
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});