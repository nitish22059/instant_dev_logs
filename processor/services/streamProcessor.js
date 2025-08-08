const redis = require('../config/redisClient');
const { insertLogs } = require('../models/logModel');

const STREAM_KEY = process.env.REDIS_STREAM_KEY;
let lastId = '0';

async function startStreamProcessor() {
  console.log('🔁 Starting stream processor...');

  while (true) {
    try {
      const response = await redis.xread(
        'BLOCK', 5000,
        'COUNT', 10,
        'STREAMS', STREAM_KEY, lastId
      );

      if (!response) continue;

      const [_, messages] = response[0];
      const logs = [];

      for (const [id, entries] of messages) {
        lastId = id;
        const logObj = {};
        for (let i = 0; i < entries.length; i += 2) {
          const key = entries[i];
          let value = entries[i + 1];

          try {
            value = JSON.parse(value);
          } catch (_) {}

          logObj[key] = value;
        }
        logs.push(logObj);
      }

      if (logs.length) {
        await insertLogs(logs);
      }

    } catch (err) {
      console.error('❌ Error in stream processor:', err);
    }
  }
}

module.exports = { startStreamProcessor };
