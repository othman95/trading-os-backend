import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dictionary, MinMax, Market as CcxtMarket } from 'ccxt';
import { Document } from 'mongoose';

@Schema()
export class Market implements CcxtMarket {
  id: string;

  symbol: string;

  base: string;

  quote: string;

  baseId: string;

  quoteId: string;

  active?: boolean;

  type?: string;

  spot?: boolean;

  margin?: boolean;

  swap?: boolean;

  future?: boolean;

  option?: boolean;

  contract?: boolean;

  settle?: string;

  settleId?: string;

  contractSize?: number;

  linear?: boolean;

  inverse?: boolean;

  expiry?: number;

  expiryDatetime?: string;

  strike?: number;

  optionType?: string;

  taker?: number;

  maker?: number;

  percentage?: boolean;

  tierBased?: boolean;

  feeSide?: string;

  precision: {
    amount: number;
    price: number;
  };

  limits: {
    amount?: MinMax;
    cost?: MinMax;
    leverage?: MinMax;
    price?: MinMax;
  };

  info: any;

  constructor() {
    this.id = '';
    this.symbol = '';
    this.base = '';
    this.quote = '';
    this.baseId = '';
    this.quoteId = '';
    this.active = false;
    this.type = '';
    this.spot = false;
    this.margin = false;
    this.swap = false;
    this.future = false;
    this.option = false;
    this.contract = false;
    this.settle = '';
    this.settleId = '';
    this.contractSize = 0;
    this.linear = false;
    this.inverse = false;
    this.expiry = 0;
    this.expiryDatetime = '';
    this.strike = 0;
    this.optionType = '';
    this.taker = 0;
    this.maker = 0;
    this.percentage = false;
    this.tierBased = false;
    this.feeSide = '';
    this.precision = { amount: 0, price: 0 };
    this.limits = {};
    this.info = {};
  }
}
export type MarketDocument = Market & Document;
export type MarketDocumentDic = Dictionary<MarketDocument>;
export const MarketSchema = SchemaFactory.createForClass(Market).set(
  'versionKey',
  false,
);
