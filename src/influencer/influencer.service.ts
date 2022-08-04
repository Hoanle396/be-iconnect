import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Influencer } from 'src/entities/influencer.entity';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateInfluencerDto } from './dto/create-influencer.dto';
import { updateFlow } from './dto/update-flow.dto';
import { UpdateInfluencerDto } from './dto/update-influencer.dto';

@Injectable()
export class InfluencerService {
  constructor(
    @InjectRepository(Influencer) private influencer: Repository<Influencer>,
    @InjectRepository(Users) private user: Repository<Users>
  ) {}
  async create(createInfluencerDto: CreateInfluencerDto,user:Users) {
    try {
      const users = await this.user.findOne({ where: { email: user.email } })
      createInfluencerDto.user=users
      return await this.influencer.save(createInfluencerDto);
    } catch {
      return new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.influencer.find();
    } catch {
      return new NotFoundException({ status: 404, message: 'No data found' });
    }
  }
  async findByUser(user_id: number) {
    try {
      return await this.influencer.createQueryBuilder('influencer').where("influencer.user_id=:user_id",{user_id:user_id}).getOne()
    }
    catch {
      return null
    }
  }
  async findOne(id: number) {
    try {
      return await this.influencer.findOne({
        where: { id: id },
        relations: { user: true },
      });
    } catch {
      return new NotFoundException({ status: 404, message: 'No data found' });
    }
  }

  async update(id: number, updateInfluencerDto: UpdateInfluencerDto) {
    try {
      return await this.influencer.update(id, updateInfluencerDto);
    }
    catch {
      return new NotImplementedException({status:'not implement',message:'Update failed!'})
    }
  }

  async remove(id: number) {
    try {
      const d = await this.influencer.findOne({ where: { id: id } });
      await d.remove();
      return true;
    } catch (error) {
      return false;
    }
  }

  async findAllusername() {
    try {
      return await this.influencer.createQueryBuilder('influencer').select('influencer.username').getMany();
    } catch {
      return new NotFoundException({ status: 404, message: 'No data found' });
    }
  }
  async updatePut(username: string, UpdateDto: updateFlow) {
    try {
      return await this.influencer.createQueryBuilder().update(Influencer).set(UpdateDto).where('username=:username',{username:username}).execute();
    }
    catch {
      return new NotImplementedException({status:'not implement',message:'Update failed!'})
    }
  }
}
