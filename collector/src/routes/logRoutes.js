// src/routes/logRoutes.js

const express = require('express');
const { logHandler } = require('../controllers/logControllers');

const router = express.Router();

// POST /logs (mounted at /logs, so this becomes /)
router.post('/', logHandler);

module.exports = router;
