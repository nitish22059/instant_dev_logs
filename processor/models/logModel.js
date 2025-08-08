const pool = require('../config/db');

async function insertLogs(logs) {
    const query = `
        INSERT INTO LOGS (timestamp, level, message, app_name, meta)
        VALUES ($1, $2, $3, $4, $5)
    `;

    const client = await pool.connect();

    try {
        for( const log of logs ) {
            await client.query(query, [
                log.timestamp,
                log.level,
                log.message,
                log.app_name,
                log.meta
            ]);
        }
        console.log('✅ Batch inserted into DB')
    } catch (err) {
        console.error('❌ Failed to insert logs:', err);
    } finally {
        client.release();
    }
}

module.exports = { insertLogs } ;