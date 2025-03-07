import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWaterLevelDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'location must be a string' })
  location?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'level is required' })
  @IsNumber({}, { message: 'level must be a number' })
  level: number;
}