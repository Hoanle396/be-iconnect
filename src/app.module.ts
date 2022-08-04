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
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_DBNAME || 'postgres',
      entities: [Users, Influencer, Brand],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port:  Number(process.env.REDIS_PORT) || 6379,
        // username: process.env.REDIS_USER || 'default',
        // password: process.env.REDIS_PASSWORD || 'redis',
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
    }),

    AuthModule,
    InfluencerModule,
    BrandModule,
    UsersModule,
    ChatModule,
    ContractModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
