import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import TradingDto from './dto/trading.service.dto';
import TradingService from './trading.service';

@ApiTags('Trading')
@Controller()
export default class TradingController {
  constructor(private readonly tradingService: TradingService) {}

  @Get('trendFollowing')
  async trade(@Body() dto: TradingDto): Promise<string> {
    return this.tradingService.trendFollowing(dto);
  }

  @Get('symbols')
  async getSymbols(): Promise<string[]> {
    return this.tradingService.getSymbols();
  }
}
