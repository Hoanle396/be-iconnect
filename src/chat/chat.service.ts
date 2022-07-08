import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Message } from 'src/entities/message.entity';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ChatGateway } from './chat.gateway';
import { CreateMessageDTO } from './dto/Create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @Inject(CACHE_MANAGER) private cacheManager,
    private gateway: ChatGateway,
  ) {}
  private async checkIfUsersExist(from: string, to: string): Promise<void> {
    if (!(await this.userRepository.findOne({ where: { email: to } }))) {
      throw new HttpException(
        "Receiver of the message doesn't exist in the system",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await this.userRepository.findOne({ where: { email: from } }))) {
      throw new HttpException(
        "Sender of the message doesn't exist in the system",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private async getRecipientToken(email: string): Promise<boolean> {
    return this.cacheManager.get(email);
  }
  async createMessage(data: CreateMessageDTO) {
    const { to, from } = data;
    await this.checkIfUsersExist(from, to);
    const message = this.messageRepository.create(data);
    // const token = await this.getRecipientToken(to);
    // if (token) {
      this.gateway.sendmess(message);
    // }
    message.delivered = true;
    message.seen = false;
    await this.messageRepository.save(message);
    return message;
  }
  async getConversation(convoWith:string, user, options: IPaginationOptions) {
    const queryBuilder = this.messageRepository.createQueryBuilder('message');
    if (convoWith !== user) {
      queryBuilder
        .where(
          'message.from = :from and message.to = :to or message.from = :to and message.to = :from',
          { from: user, to: convoWith },
        )
        .orderBy('message.createAt', 'DESC');
    } else {
      queryBuilder
        .where('message.from = :from and message.to = :to', {
          from: user,
          to: convoWith,
        })
        .orderBy('message.createAt', 'DESC');
    }
    const messages = await paginate<Message>(queryBuilder, options);
    const unseenCount = await this.messageRepository.count({
      where: {
        from: convoWith,
        to: user,
        seen: false,
      },
    });
    // Whenever conversations are retrieved we need to update the seen flag in the database indicating that
    // the messages have been seen by the user receiving it, since a request is being made to retrieve them.
    let seenCount = 0;
    if (messages.items) {
      for (const message of messages.items) {
        if (!message.seen) {
          ++seenCount;
          message.seen = true;
          this.messageRepository.save(message);
        }
      }
    }
    const { items, meta, links } = messages;
    return {
      items,
      meta,
      links,
      unseenItems: unseenCount - seenCount,
    };
  }
}
