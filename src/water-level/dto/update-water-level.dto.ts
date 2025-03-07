import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWaterLevelDto } from './create-water-level.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateWaterLevelDto extends PartialType(CreateWaterLevelDto) {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'location must be a string' })
  location?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'level is required' })
  @IsNumber({}, { message: 'level must be a number' })
  level: number;
}