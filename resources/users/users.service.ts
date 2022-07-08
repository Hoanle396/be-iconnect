import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'resources/auth/dto/create-user.dto';
import { Users } from 'resources/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
   constructor(@InjectRepository(Users) private readonly UserRepo: Repository<Users>) { }
   
   async findOne(email: string) {
      return await this.UserRepo.findOne({where : {email: email}})
   }

   async save(user: CreateUserDto) {
      return await this.UserRepo.save(user)
   }
   async findAll(): Promise<Users[]>{
      try {
         const users = await this.UserRepo.find();
         return users
      }
      catch {
         throw new NotFoundException({status:404,message:'No data found'})
      }
   }
}
