import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateEducationalDto {
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsUrl({}, { message: 'Link must be a valid URL' })
  link?: string;

  @IsString({ message: 'Source must be a string' })
  source?: string;
}
