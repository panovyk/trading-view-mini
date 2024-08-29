module.exports = {
    port: process.env.PORT,
    binanceApiUrl: process.env.API_URL,
    mongodbUri: process.env.MONGODB_URI,
    logLevel: process.env.LOG_LEVEL || 'info',
    mongooseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    }
};
