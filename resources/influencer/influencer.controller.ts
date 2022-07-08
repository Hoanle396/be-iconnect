import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  InternalServerErrorException,
  Res,
  HttpStatus,
  Request,
  Put,
} from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { CreateInfluencerDto } from './dto/create-influencer.dto';
import { UpdateInfluencerDto } from './dto/update-influencer.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import RoleGuard from 'resources/role/role.guard';
import { Role } from 'resources/role/user.enum';
import { JwtAuthGuard } from 'resources/auth/jwt-auth.guard';
import { ApiFileImages } from 'resources/utils/file.decorator';
import { createInfluencerSchema } from './semcha/createInfluencer.semcha';
import { Response } from 'express';
import { updateFlow } from './dto/update-flow.dto';
@ApiTags('/api/influencer')
@Controller('api/influencer')
export class InfluencerController {
  constructor(private readonly influencerService: InfluencerService) {}

  @Post()
  @ApiBearerAuth()
  @ApiFileImages('avatar')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: createInfluencerSchema,
  })
  async create(
    @Body() createInfluencerDto: CreateInfluencerDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    try {
      createInfluencerDto.avatar = '/uploads/image/' + file.filename;
      return await this.influencerService.create(createInfluencerDto, req.user);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.influencerService.findAll();
    } catch {
      throw new InternalServerErrorException({
        status: 500,
        message: 'No data found',
      });
    }
  }

  @Get('/username')
  async usernameAll() {
    try {
      return await this.influencerService.findAllusername();
    } catch {
      throw new InternalServerErrorException({
        status: 500,
        message: 'No data found',
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.influencerService.findOne(+id);
  }
  @Patch(':username')
  async updatePut(
    @Param('username') username: string,
    @Body() updateFlow: updateFlow,
  ) {
    return await this.influencerService.updatePut(username, updateFlow);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateInfluencerDto: UpdateInfluencerDto,
  ) {
    return await this.influencerService.update(+id, updateInfluencerDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin))
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isdel = await this.influencerService.remove(+id);
    if (isdel) {
      return res
        .status(HttpStatus.OK)
        .send({ status: 'OK', message: 'Delete successfuly!' });
    } else {
      return res
        .status(HttpStatus.NOT_IMPLEMENTED)
        .send({ status: 'Failed', message: 'Delete failed!' });
    }
  }
}
