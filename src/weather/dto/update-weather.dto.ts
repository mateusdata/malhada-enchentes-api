import { PartialType } from '@nestjs/swagger';
import { CreateWeatherDto } from './create-weather.dto';

export class UpdateWeatherDto extends PartialType(CreateWeatherDto) {}
