import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateNotificationDto {
  @IsNumber({}, { message: "level must be a number" }) 
  @IsNotEmpty({ message: "level is required" })
  level: number;
}
