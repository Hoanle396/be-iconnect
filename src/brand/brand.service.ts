import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brand.entity';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private brand: Repository<Brand>,
    @InjectRepository(Users) private uesrRep: Repository<Users>,
  ) {}
  async create(createBrandDto: CreateBrandDto, user: Users) {
    try {
      const users = await this.uesrRep.findOne({ where: { email: user.email } });
      createBrandDto.user = users;
      return await this.brand.save(createBrandDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.brand.find();
    } catch {
      throw new NotFoundException({ status: 404, message: 'No data found' });
    }
  }

  async findOne(id: number) {
    try {
      return await this.brand.findOne({
        where: { id: id },
        relations: { user: true },
      });
    } catch {
      throw new NotFoundException({ status: 404, message: 'No data found' });
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      return await this.brand.update(id, updateBrandDto);
    }
    catch {
      throw new NotImplementedException({status:'Not implement',message:'Update failed!'})
    }
  }

  async remove(id: number) {
    try {
      const d = await this.brand.findOne({ where: { id: id } });
      await d.remove();
      return true;
    } catch (error) {
      return false;
    }
  }
}
