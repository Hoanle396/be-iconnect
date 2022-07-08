import { Test, TestingModule } from '@nestjs/testing';
import { InfluencerController } from './influencer.controller';
import { InfluencerService } from './influencer.service';

describe('InfluencerController', () => {
  let controller: InfluencerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfluencerController],
      providers: [InfluencerService],
    }).compile();

    controller = module.get<InfluencerController>(InfluencerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
