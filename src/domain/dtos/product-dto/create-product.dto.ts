import { IsBoolean, IsNumber, IsString, MinLength, IsPositive } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    name: string; 
    
    @IsNumber()
    @IsPositive()
    inInventory: number;
    
    @IsBoolean()
    enabled: boolean;
    
    @IsNumber()
    @IsPositive()
    min: number;
    
    @IsNumber()
    @IsPositive()
    max: number; 
}