import { Module } from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { InfluencerController } from './influencer.controller';
import { Influencer } from 'resources/entities/influencer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'resources/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Influencer,Users])],
  controllers: [InfluencerController],
  providers: [InfluencerService]
})
export class InfluencerModule {}
