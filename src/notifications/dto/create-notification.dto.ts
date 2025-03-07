import { IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
  @ApiProperty()
  @IsNumber({}, { message: "level must be a number" }) 
  @IsNotEmpty({ message: "level is required" })
  level: number;
}