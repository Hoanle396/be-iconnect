import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class updateFlow {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  subscribers: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  views: number;
}
