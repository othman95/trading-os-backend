import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import TradingController from './trading.controller';
import TradingService from './trading.service';
import { MarketSchema, Market } from './schemas/trading.schema';
import TradingRepository from './trading.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Market.name,
        schema: MarketSchema,
      },
    ]),
  ],
  controllers: [TradingController],
  providers: [TradingService, TradingRepository],
  exports: [TradingService, TradingRepository],
})
export default class TradingModule {}
