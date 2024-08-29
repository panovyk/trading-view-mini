const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const symbolRoutes = require('./routes/symbolRoutes');
const logger = require('./utils/logger');
const config = require('./config/config');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongodbUri, config.mongooseOptions)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => {
        logger.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

mongoose.connection.on('error', err => {
    logger.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/symbols', symbolRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).send('Something went wrong!');
});

const PORT = config.port;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
