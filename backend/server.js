const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const analysisRoutes = require('./routes/analysisRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'ScanSure API is running', status: 'OK' });
});

app.use('/api', analysisRoutes);

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scansure';

mongoose.connect(MONGO_URI).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});