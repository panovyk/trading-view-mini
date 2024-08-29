const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const symbolController = require('../src/controllers/symbolController');
const Symbol = require('../src/models/symbolModel');
const binanceService = require('../src/services/binanceService');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Symbol.deleteMany({});
});

jest.mock('../src/services/binanceService');

describe('Symbol Controller', () => {
    describe('getSymbols', () => {
        it('should return symbols from binance service', async () => {
            const mockSymbols = [{ symbol: 'BTCUSDT', price: 50000 }];
            binanceService.getSymbolPrices.mockResolvedValue(mockSymbols);

            const req = {};
            const res = {
                json: jest.fn()
            };

            await symbolController.getSymbols(req, res);

            expect(res.json).toHaveBeenCalledWith(mockSymbols);
        });
    });

    describe('addToFavorites', () => {
        it('should add a symbol to favorites', async () => {
            const req = {
                body: { symbol: 'ETHUSDT' }
            };
            const res = {
                json: jest.fn()
            };

            await symbolController.addToFavorites(req, res);

            const savedSymbol = await Symbol.findOne({ symbol: 'ETHUSDT' });
            expect(savedSymbol).toBeTruthy();
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('getFavorites', () => {
        it('should return favorite symbols', async () => {
            await Symbol.create({ symbol: 'BTCUSDT' });
            await Symbol.create({ symbol: 'ETHUSDT' });

            const req = {};
            const res = {
                json: jest.fn()
            };

            await symbolController.getFavorites(req, res);

            expect(res.json).toHaveBeenCalled();
            const result = res.json.mock.calls[0][0];
            expect(result.length).toBe(2);
            expect(result[0].symbol).toBe('BTCUSDT');
            expect(result[1].symbol).toBe('ETHUSDT');
        });
    });
});
