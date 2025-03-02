import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Device Token is required' })
  @IsString({ message: 'Device Token must be a string' })
  deviceToken: string;

  @IsNotEmpty({ message: 'Device ID is required' })
  @IsString({ message: 'Device ID must be a string' })
  deviceId: string;
}

