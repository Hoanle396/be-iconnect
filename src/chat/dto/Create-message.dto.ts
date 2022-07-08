import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';


export class CreateMessageDTO {
    
    from?: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    to: string;

    @IsNotEmpty()
    @ApiProperty()
    message: string;
}