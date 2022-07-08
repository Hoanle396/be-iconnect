import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { Users } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { InfluencerModule } from './influencer/influencer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Influencer } from './entities/influencer.entity';
import { Brand } from './entities/brand.entity';
import { BrandModule } from './brand/brand.module';
import { ChatModule } from './chat/chat.module';
import { ContractModule } from './contracts/contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DBNAME,
      entities: [Users,Influencer,Brand],
      synchronize: true,
      autoLoadEntities: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
    }),

    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USER,
        password:process.env.REDIS_PASSWORD
      }
    }),
    AuthModule,
    UsersModule,
    InfluencerModule,
    BrandModule,
    ChatModule,
    ContractModule,
  ],
  controllers: [AppController,AuthController],
  providers: [AppService],
})
export class AppModule {}
