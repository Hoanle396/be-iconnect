import { PartialType } from '@nestjs/swagger';
import { CreateInfluencerDto } from './create-influencer.dto';

export class UpdateInfluencerDto extends PartialType(CreateInfluencerDto) {}
