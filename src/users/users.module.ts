import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { UsersController } from './users.controller';
import { Influencer } from 'src/entities/influencer.entity';
import { Brand } from 'src/entities/brand.entity';
import { InfluencerService } from 'src/influencer/influencer.service';
import { BrandService } from 'src/brand/brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Influencer,Brand])],
  controllers: [UsersController],
  providers: [UsersService,InfluencerService,BrandService],
  exports: [UsersService],
})
export class UsersModule {}
