import { IsString } from 'class-validator';

export default class TradingDto {
  @IsString()
  readonly symbolName: string = '';
}
