import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsString } from "class-validator";
import { Users } from "src/entities/user.entity";
import { IsNullable } from "src/utils/nullable.util";

export class CreateBrandDto {

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   company_name: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   services: string;

   @ApiProperty()
   @IsNullable()
   @IsString()
   website: string;

   @ApiProperty()
   image: string;

   @ApiProperty()
   @IsNullable()
   @IsString()
   description: string;

   @ApiProperty()
   @IsString()
   location: string;

   user: Users;
}
