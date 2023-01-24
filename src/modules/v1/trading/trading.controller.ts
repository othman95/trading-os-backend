import {
  Body, Controller, Get, Param, Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import TradingService from './trading.service';

@ApiTags('Trading')
@Controller()
export default class TradingController {
  constructor(private readonly tradingService: TradingService) {}

  // @Get('trendFollowing')
  // async trade(@Body() dto: TradingDto): Promise<string> {
  //   return this.tradingService.trendFollowing(dto);
  // }

  @Get('symbols')
  async getSymbols(): Promise<string[]> {
    return this.tradingService.getSymbols();
  }

  @Get('symbol')
  async getSymbolInfo(@Query() query: {symbol:string}): Promise<any> {
    console.log(query.symbol);
    return this.tradingService.getSymbolInfo(query.symbol);
  }
}
