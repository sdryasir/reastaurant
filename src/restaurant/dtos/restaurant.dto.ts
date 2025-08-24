import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";


export class ContactDto {
  @IsString()
  phone: string;

  @IsEmail()
  email: string;
}

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  postalCode: string;
}

export class LocationDto {

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CreateRestaurantDto {

  @IsString()
  name: string;

  @IsArray()
  cuisine: string[];

  @IsNumber()
  rating: number;

  @IsNumber()
  reviewsCount: number;

  @IsString()
  priceRange: string;


  @ValidateNested()
  @Type(()=>ContactDto)
  contact: ContactDto;

  @ValidateNested()
  @Type(()=>AddressDto)
  address: AddressDto;

  @ValidateNested()
  @Type(()=>LocationDto)
  location: LocationDto;

  @IsBoolean({message:'Please provide  a value that is true /false'})
  isOpen: boolean;

}