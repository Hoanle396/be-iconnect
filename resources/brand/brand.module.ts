import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'resources/entities/user.entity';
import { Brand } from 'resources/entities/brand.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users,Brand])],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
