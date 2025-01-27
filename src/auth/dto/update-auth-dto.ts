import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateAuthDto {
  @IsEmail()
  email: string;

  @IsString({ message: 'The password must be a string' })
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  password: string;
}