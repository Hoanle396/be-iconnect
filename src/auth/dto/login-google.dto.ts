import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class GoogleUserDto{
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   idToken: string;
   
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   email:string;
}