import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateEducationalDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;
  @ApiProperty()

  @IsNotEmpty({ message: 'Link is required' })
  @IsUrl({}, { message: 'Link must be a valid URL' })
  link: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Source is required' })
  @IsString({ message: 'Source must be a string' })
  source: string;
}

