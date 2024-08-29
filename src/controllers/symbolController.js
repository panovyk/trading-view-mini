const binanceService = require('../services/binanceService');
const Symbol = require('../models/symbolModel');
const logger = require('../utils/logger');

exports.getSymbols = async (req, res) => {
    try {
        const symbols = await binanceService.getSymbolPrices();
        res.json(symbols);
    } catch (error) {
        logger.error('Error in getSymbols:', error);
        res.status(500).json({message: 'Error fetching symbols', error: error.message});
    }
};

exports.addToFavorites = async (req, res) => {
    try {
        const {symbol} = req.body;
        let favoriteSymbol = await Symbol.findOne({symbol});

        if (!favoriteSymbol) {
            favoriteSymbol = new Symbol({symbol});
            await favoriteSymbol.save();
            logger.info(`Symbol ${symbol} added to favorites`);
        }

        res.json({message: 'Symbol added to favorites', symbol: favoriteSymbol});
    } catch (error) {
        logger.error('Error in addToFavorites:', error);
        res.status(500).json({message: 'Error adding symbol to favorites', error: error.message});
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Symbol.find().sort('-createdAt');
        res.json(favorites);
    } catch (error) {
        logger.error('Error in getFavorites:', error);
        res.status(500).json({message: 'Error fetching favorite symbols', error: error.message});
    }
};

exports.removeFromFavorites = async (req, res) => {
    try {
        const {symbol} = req.body;
        await Symbol.deleteOne({symbol});
        logger.info(`Symbol ${symbol} removed from favorites`);
        res.json({message: 'Symbol removed from favorites', symbol});
    } catch (error) {
        logger.error('Error in removeFromFavorites:', error);
        res.status(500).json({message: 'Error removing symbol from favorites', error: error.message});
    }
};

