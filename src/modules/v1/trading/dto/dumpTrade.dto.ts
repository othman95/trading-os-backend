import { Prop } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import MinMax from '../schemas/minmax.class';

export default class DumpTradeDto {
  @Prop({ type: String })
    id: string;

  @Prop({ type: String })
    symbol: string;

  @Prop({ type: String })
    base: string;

  @Prop({ type: String })
    quote: string;

  @Prop({ type: String })
    baseId: string;

  @Prop({ type: String })
    quoteId: string;

  @Prop({ type: Boolean, required: false })
    active?: boolean;

  @Prop({ type: String, required: false })
    type?: string;

  @Prop({ type: Boolean, required: false })
    spot?: boolean;

  @Prop({ type: Boolean, required: false })
    margin?: boolean;

  @Prop({ type: Boolean, required: false })
    swap?: boolean;

  @Prop({ type: Boolean, required: false })
    future?: boolean;

  @Prop({ type: Boolean, required: false })
    option?: boolean;

  @Prop({ type: Boolean, required: false })
    contract?: boolean;

  @Prop({ type: String, required: false })
    settle?: string;

  @Prop({ type: String, required: false })
    settleId?: string;

  @Prop({ type: Number, required: false })
    contractSize?: number;

  @Prop({ type: Boolean, required: false })
    linear?: boolean;

  @Prop({ type: Boolean, required: false })
    inverse?: boolean;

  @Prop({ type: Number, required: false })
    expiry?: number;

  @Prop({ type: String, required: false })
    expiryDatetime?: string;

  @Prop({ type: Number, required: false })
    strike?: number;

  @Prop({ type: String, required: false })
    optionType?: string;

  @Prop({ type: Number, required: false })
    taker?: number;

  @Prop({ type: Number, required: false })
    maker?: number;

  @Prop({ type: Boolean, required: false })
    percentage?: boolean;

  @Prop({ type: Boolean, required: false })
    tierBased?: boolean;

  @Prop({ type: String, required: false })
    feeSide?: string;

  @Prop({
    type: {
      amount: { type: Number },
      price: { type: Number },
    },
    required: true,
  })
    precision: {
    amount: number;
    price: number;
  };

  @Prop({
    type: {
      amount: { type: MinMax },
      cost: { type: MinMax },
      leverage: { type: MinMax },
      price: { type: MinMax },
    },
    required: true,
  })
    limits: {
    amount?: MinMax;
    cost?: MinMax;
    leverage?: MinMax;
    price?: MinMax;
  };

  @Prop({ type: SchemaTypes.Mixed, required: true })
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
