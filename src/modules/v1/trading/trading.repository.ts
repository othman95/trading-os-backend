import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DumpTradeDto from './dto/dumpTrade.dto';
import { Market } from './schemas/trading.schema';

@Injectable()
export default class TradingRepository {
  constructor(
    @InjectModel(Market.name)
    private readonly TradingModel: Model<Market>,
  ) {}

  public async dumpMarket(symbols: DumpTradeDto[]) {
    return this.TradingModel.insertMany(symbols);
  }

  public async getSymbols(): Promise<Market[] | null> {
    return this.TradingModel.find().exec();
  }

  public async empty(): Promise<any> {
    return this.TradingModel.deleteMany({}).exec();
  }
}
