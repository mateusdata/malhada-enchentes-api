import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString({ message: 'Device Token must be a string' })
  deviceToken?: string;
}
