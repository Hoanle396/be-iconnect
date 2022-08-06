import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { InfluencerService } from 'src/influencer/influencer.service';
import { BrandService } from 'src/brand/brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Influencer } from 'src/entities/influencer.entity';
import { Brand } from 'src/entities/brand.entity';
import { Users } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { InfluencerModule } from 'src/influencer/influencer.module';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([Influencer,Brand,Users]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2592000s' },
    }),
  ],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy,InfluencerService,BrandService],
  exports: [AuthModule],
})
export class AuthModule {}
