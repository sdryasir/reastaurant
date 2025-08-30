import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";


export class ContactDto {
  @IsString()
  @ApiProperty({example:'+92 xxx xxxxxxx'})
  phone: string;

  @IsEmail()
  @ApiProperty({example:'example@example.com'})
  email: string;
}

export class AddressDto {
  @IsString()
  @ApiProperty({example:'address'})
  street: string;

  @IsString()
  @ApiProperty({example:'city'})
  city: string;

  @IsString()
  @ApiProperty({example:'state'})
  state: string;

  @IsString()
  @ApiProperty({example:'country'})
  country: string;

  @IsString()
  @ApiProperty({example:'4111'})
  postalCode: string;
}

export class LocationDto {

  @IsNumber()
  @ApiProperty({example:25.325256})
  lat: number;

  @IsNumber()
  @ApiProperty({example:47.32564})
  lng: number;
}

export class UpdateRestaurantDto {

  @IsString()
  @ApiProperty({example:'John Doe'})
  name: string;

  @IsArray()
  @ApiProperty({example:['Pakistani', 'Indian']})
  cuisine?: string[];

  @IsNumber()
  @ApiProperty({example:4})
  rating?: number;

  @IsNumber()
  @ApiProperty({example:10})
  reviewsCount?: number;

  @IsString()
  @ApiProperty({example:'$$'})
  priceRange?: string;


  @ValidateNested()
  @Type(()=>ContactDto)
  @ApiProperty({type: ()=>ContactDto})
  contact?: ContactDto;

  @ValidateNested()
  @Type(()=>AddressDto)
  @ApiProperty({type: ()=>AddressDto})
  address?: AddressDto;

  @ValidateNested()
  @Type(()=>LocationDto)
  @ApiProperty({type: ()=>LocationDto})
  location?: LocationDto;

  @IsBoolean({message:'Please provide  a value that is true /false'})
  @ApiProperty({example:true})
  isOpen?: boolean;

}