import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Device Token is required' })
  @IsString({ message: 'Device Token must be a string' })
  deviceToken: string;
}

