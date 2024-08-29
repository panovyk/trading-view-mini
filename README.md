# TradingView Mini

This is a simplified version of TradingView, providing sell (ask) and buy (bid) prices for a list of trading symbols with a 5% spread.

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/tradingview-mini.git
   cd tradingview-mini
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tradingview_app
   LOG_LEVEL=info
   ```

## Running the Server

To start the server, run:

```
npm start
```

The server will start on the port specified in your `.env` file (default is 3000).

## Running Tests

To run the tests, use:

```
npm test
```

## API Endpoints[github-actions-config.txt](..%2F..%2FDownloads%2Fgithub-actions-config.txt)

- GET `/api/symbols`: Get all symbols with their prices
- POST `/api/symbols/favorites`: Add a symbol to favorites
- DELETE `/api/symbols/favorites`: Remove a symbol from favorites
- GET `/api/symbols/favorites`: Get all favorite symbols

## Deployment

This project is set up for automatic deployment to Heroku via GitHub Actions. Push to the `main` branch to trigger a deployment.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
