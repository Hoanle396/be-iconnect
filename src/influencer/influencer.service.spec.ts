import { Test, TestingModule } from '@nestjs/testing';
import { InfluencerService } from './influencer.service';

describe('InfluencerService', () => {
  let service: InfluencerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfluencerService],
    }).compile();

    service = module.get<InfluencerService>(InfluencerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
