import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateEducationalDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Link is required' })
  @IsUrl({}, { message: 'Link must be a valid URL' })
  link: string;

  @IsNotEmpty({ message: 'Source is required' })
  @IsString({ message: 'Source must be a string' })
  source: string;
}

