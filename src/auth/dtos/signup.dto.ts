import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class SignupDto {

  @IsString()
  @ApiProperty({example:'John Doe'})
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({example:'user@email.com'})
  email:string

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({example:'******'})
  password:string

}