import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class LoginDto {

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({example:'user@email.com'})
  email:string

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({example:'******'})
  password:string

}