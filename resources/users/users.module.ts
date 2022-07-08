import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'resources/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
