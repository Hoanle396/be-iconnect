import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Users } from 'src/entities/user.entity';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports :[TypeOrmModule.forFeature([Users,Message]),CacheModule.register()],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}