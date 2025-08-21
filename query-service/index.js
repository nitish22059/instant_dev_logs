import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { pool } from './db.js';
import { buildQuery } from './queryBuilder.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // React and Vite default ports
    credentials: true
}));

app.use(express.json());


app.get('/logs', async (req, res) => {
    try {
        const { text, values } = buildQuery(req.query);
        console.log('Generated SQL:', text);
        console.log('Parameters:', values);
        const result = await pool.query(text, values);
        res.json({ logs: result.rows });
    } catch (err) {
        console.error('Query error : ', err);
        res.status(500).json({ error : 'Failed to fetch logs'});
    }
});


app.listen(PORT, () => {
    console.log(`🔍 Query Service running on http://localhost:${PORT}`);
})