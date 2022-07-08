import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Users } from "src/entities/user.entity";

export class CreateInfluencerDto {
   @ApiProperty()
   @IsString()
   platform: string;

   @ApiProperty({
      description: 'Username of the platform'
   })
   @IsString()
   @IsNotEmpty()
   username: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   services: string;

   @ApiProperty()
   avatar: string;

   @ApiProperty({nullable:true})
   @IsString()
   location: string;

   user:Users
}
