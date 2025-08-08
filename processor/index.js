require('dotenv').config();

const { startStreamProcessor} = require('./services/streamProcessor');

startStreamProcessor();