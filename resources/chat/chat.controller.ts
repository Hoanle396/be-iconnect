import {
   Controller,
   Post,
   Body,
   UsePipes,
   ValidationPipe,
   UseGuards,
   Get,
   Query,
   Req,
   Request,
} from '@nestjs/common';
import { CreateMessageDTO } from './dto/Create-message.dto';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'resources/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/**
* @class
* Configures routing endpoint and delegates request to services.
*/
@ApiTags('api/chat')
@Controller()
@ApiBearerAuth()
export class ChatController {
   constructor(private messageService: ChatService) {}

   @Post('api/message')
   @UseGuards(JwtAuthGuard)
   @UsePipes(new ValidationPipe())
   async createMessage(@Body() data: CreateMessageDTO,@Request() req) {
       data.from=req.user.email
       return await this.messageService.createMessage(data);
   }

   @Get('api/conversation')
   @UseGuards(JwtAuthGuard)
   async index(@Query('with') convoWith: string, @Query('page') page: number = 0,
               @Query('limit') limit: number = 10,
               @Request() req) {
       limit = limit > 100 ? 100 : limit;
       return await this.messageService.getConversation(convoWith, req.user.email, { page, limit });
   }
}