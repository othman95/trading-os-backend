import { HttpException, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import ccxt, { Dictionary, Market } from 'ccxt';
import DumpTradeDto from './dto/dumpTrade.dto';
import TradingRepository from './trading.repository';
// import talib from 'talib';

@Injectable()
export default class TradingService implements OnApplicationBootstrap {
  exchange;

  constructor(private readonly tradingRepository: TradingRepository) {
    // eslint-disable-next-line new-cap
    this.exchange = new ccxt.binance();
  }

  onApplicationBootstrap() {
    // this.dumpMarket();
  }

  dumpMarket = async () => {
    try {
      const symbolData: Dictionary<Market> = await this.exchange.loadMarkets();
      const symbols = Object.values(symbolData) as DumpTradeDto[];
      // Get the symbols from the exchange
      await this.tradingRepository.empty();
      return await this.tradingRepository.dumpMarket(symbols);
    } catch (error) {
      throw new HttpException('Failed to dump market', 500);
    }
  };

  getSymbolInfo = async (symbol: string) => {
    return this.exchange.fetchTicker(symbol);
  };

  getSymbols = async () => {
    return this.tradingRepository.getSymbols().then((data) => data?.filter(Boolean).map((d) => d.symbol) || []);
  };

  // test = async () => {
  //   const symbols = await this.tradingRepository.loadAllMarket();
  //   return symbols;
  // };

  // Import the required libraries
  // Define a function to execute the trend following strategy
  // trendFollowing = async (symbol: any) => {
  //   // Get the historical data of the asset
  //   const candles = await this.exchange.fetchOHLCV(symbol);

  //   // Use the TALIB library to calculate the moving average
  //   const smaResult = talib.SMA(
  //     candles.map((c: any[]) => c[4]),
  //     20,
  //   );

  //   // Get the current moving average value
  //   const currentMA = smaResult[smaResult.length - 1];

  //   // Get the last closing price
  //   const lastClose = candles[candles.length - 1][4];

  //   // Compare the last close price with the moving average
  //   if (lastClose > currentMA) {
  //     // If the last close price is above the moving average, open a long position
  //     return 'Trend is up, opening a long position';
  //   }
  //   // If the last close price is below the moving average, open a short position
  //   return 'Trend is down, opening a short position';
  // };

  // Define a function to execute the mean reversion strategy
  // meanReversion = async (exchange, symbol) => {
  //   // Get the historical data of the asset
  //   const candles = await exchange.fetchOHLCV(symbol);

  //   // Use the TALIB library to calculate the historical average
  //   const result = await talib.execute({
  //     name: 'AVGPRICE',
  //     startIdx: 0,
  //     endIdx: candles.length - 1,
  //     inOpen: candles.map((c) => c[1]),
  //     inHigh: candles.map((c) => c[2]),
  //     inLow: candles.map((c) => c[3]),
  //     inClose: candles.map((c) => c[4]),
  //   });

  //   // Get the historical average value
  //   const historicalAvg =
  //     result.result.outReal[result.result.outReal.length - 1];

  //   // Get the last closing price
  //   const lastClose = candles[candles.length - 1][4];

  //   // Compare the last close price with the historical average
  //   if (lastClose > historicalAvg) {
  //     // If the last close price is above the historical average, open a short position
  //     console.log(
  //       'Price is above historical average, opening a short position',
  //     );
  //   } else {
  //     // If the last close price is below the historical average, open a long position
  //     console.log('Price is below historical average, opening a long position');
  //   }
  // };

  // // Define a function to execute the breakout strategy
  // breakout = async (exchange, symbol) => {
  //   // Get the historical data of the asset
  //   const candles = await exchange.fetchOHLCV(symbol);

  //   // Get the last 20 closing prices
  //   const last20Closes = candles.slice(-20).map((c) => c[4]);

  //   // Get the highest and lowest price of the last 20 closing prices
  //   const highestPrice = Math.max(...last20Closes);
  //   const lowestPrice = Math.min(...last20Closes);

  //   // Get the last closing price
  //   const lastClose = candles[candles.length - 1][4];

  //   // Compare the last close price with the highest and lowest price
  //   if (lastClose > highestPrice) {
  //     // If the last close price is above the highest price, open a long position
  //     console.log('Price broke above resistance, opening a long position');
  //   } else if (lastClose < lowestPrice) {
  //     // If the last close price is below the lowest price, open a short position
  //     console.log('Price broke below support, opening a short position');
  //   } else {
  //     console.log('No breakout detected');
  //   }
  // };

  // // Define a function to execute the contrarian strategy
  // contrarian = async (exchange, symbol) => {
  //   // Get the historical data of the asset
  //   const candles = await exchange.fetchOHLCV(symbol);

  //   // Get the last 20 closing prices
  //   const last20Closes = candles.slice(-20).map((c) => c[4]);

  //   // Calculate the average of the last 20 closing prices
  //   const avg =
  //     last20Closes.reduce((a: any, b: any) => a + b, 0) / last20Closes.length;

  //   // Get the standard deviation of the last 20 closing prices
  //   const stdDev = Math.sqrt(
  //     last20Closes.map((x) => (x - avg) ** 2).reduce((a, b) => a + b, 0) /
  //       last20Closes.length,
  //   );

  //   // Get the last closing price
  //   const lastClose = candles[candles.length - 1][4];

  //   // Compare the last close price with the average and standard deviation
  //   if (lastClose > avg + 2 * stdDev) {
  //     // If the last close price is more than 2 standard deviations above the average, open a short position
  //     console.log('Price is overbought, opening a short position');
  //   } else if (lastClose < avg - 2 * stdDev) {
  //     // If the last close price is more than 2 standard deviations below the average, open a long position
  //     console.log('Price is oversold, opening a long position');
  //   } else {
  //     console.log('Price is within normal range');
  //   }
  // };
}
