import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWaterLevelDto {
  @IsOptional()
  @IsString({ message: 'location must be a string' })
  location?: string;

  @IsNotEmpty({ message: 'level is required' })
  @IsNumber({}, { message: 'level must be a number' })
  level: number;
}