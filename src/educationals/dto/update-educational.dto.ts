import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateEducationalDto {

    @ApiProperty()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @ApiProperty()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiProperty()
  @IsUrl({}, { message: 'Link must be a valid URL' })
  link?: string;

  @ApiProperty()
  @IsString({ message: 'Source must be a string' })
  source?: string;
}
