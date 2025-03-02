import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Device Token must be a string' })
  deviceToken?: string;

  @IsString({ message: 'Device ID must be a string' })
  deviceId?: string;
}
