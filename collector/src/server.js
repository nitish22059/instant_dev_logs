// src/server.js

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const logRoutes = require('./routes/logRoutes');
app.use('/logs', logRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Collector service is running ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 Collector service running on port ${PORT}`);
});