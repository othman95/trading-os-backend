import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dictionary, Market as CcxtMarket } from 'ccxt';
import { Model } from 'mongoose';
import {
  Market,
  MarketDocument,
  MarketDocumentDic,
} from './schema/trading.schema';

@Injectable()
export default class TradingRepository {
  constructor(
    @InjectModel(Market.name) private TradingModel: Model<MarketDocument>,
  ) {}

  public async dumpMarket(symbols: CcxtMarket): Promise<MarketDocument> {
    const newDump = new this.TradingModel(symbols);
    newDump.save((err, succ) => {
      console.log(`dddd====>>${JSON.stringify(err)}`);
      if (err) {
        console.log(err);
      } else {
        console.log(succ);
      }
    });
    return newDump;
  }

  public async loadMarket(): Promise<MarketDocument | null> {
    return this.TradingModel.findOne().exec();
  }
}
