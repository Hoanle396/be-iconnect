import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'resources/auth/jwt-auth.guard';
import RoleGuard from 'resources/role/role.guard';
import { Role } from 'resources/role/user.enum';
import { ApiFileImages } from 'resources/utils/file.decorator';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { createBrandSchema } from './semcha/create-brand.semcha';
@ApiTags('/api/brand')
@Controller('/api/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiBearerAuth()
  @ApiFileImages('image')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: createBrandSchema,
  })
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    createBrandDto.image = '/uploads/image/' + file.filename;
    return await this.brandService.create(createBrandDto, req.user);
  }

  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.brandService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin))
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isdel = await this.brandService.remove(+id);
    if (isdel) {
      return res
        .status(HttpStatus.OK)
        .send({ status: 'OK', message: 'Delete successfuly!' });
    } else {
      return res
        .status(HttpStatus.NOT_IMPLEMENTED)
        .send({ status: 'OK', message: 'Delete failed!' });
    }
  }
}
