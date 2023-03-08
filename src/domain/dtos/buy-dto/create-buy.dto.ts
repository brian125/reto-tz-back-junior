import {
  IsNumber,
  IsString,
  MinLength,
  IsPositive,
  IsDate,
} from 'class-validator';

export class CreateBuyDto {
  @IsString()
  @MinLength(1)
  id: string;

  @IsString()
  @MinLength(1)
  idType: string;

  date: Date;

  @IsString()
  @MinLength(1)
  clientName: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @MinLength(1)
  productId: string;
}
