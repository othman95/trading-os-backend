import { IsNumber } from 'class-validator';

export default class MinMax {
  @IsNumber()
    min: number = 0;

  @IsNumber()
    max: number = 0;
}
