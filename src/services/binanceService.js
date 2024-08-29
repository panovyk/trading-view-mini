const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');

class BinanceService {
    constructor() {
        this.apiUrl = config.binanceApiUrl;
    }

    async getSymbolPrices() {
        try {
            const response = await axios.get(`${this.apiUrl}/fapi/v1/ticker/price`);
            return response.data.map(item => ({
                symbol: item.symbol,
                price: parseFloat(item.price),
                askPrice: this.calculateAskPrice(item.price),
                bidPrice: this.calculateBidPrice(item.price)
            }));
        } catch (error) {
            logger.error('Error fetching symbol prices from Binance API:', error);
            throw error;
        }
    }

    calculateAskPrice(price) {
        return parseFloat((price * 1.05).toFixed(8));
    }

    calculateBidPrice(price) {
        return parseFloat((price * 0.95).toFixed(8));
    }
}

module.exports = new BinanceService();
