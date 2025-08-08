// src/controllers/logController.js

const logSchema = require('../validators/logSchema');
const redis = require('../config/redisClient');

const STREAM_KEY = process.env.REDIS_STREAM_KEY;


const logHandler = async (req, res) => {
  const { error, value } = logSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: 'Invalid log format', details: error.details });
  }

  try {
    // Convert to flat key-value pairs (Redis streams format)
    const flatLog = {};
    Object.entries(value).forEach(([key, val]) => {
        flatLog[key] = typeof val ==='object' ? JSON.stringify(val) : String(val);
    });

    await redis.xadd(STREAM_KEY, '*', ...Object.entries(flatLog).flat());
    console.log('📤 Log pushed to Redis Stream');

    console.log("Flatlog : ", flatLog);
    
    return res.status(200).json({ status: 'Log received '});
  } catch (err) {
    console.error('❌ Redis push error:', err);
    return res.status(500).json({ error: "Failed to queue log" });
  }
};

module.exports = { logHandler };
