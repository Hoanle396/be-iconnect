import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { get } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BrandService } from 'src/brand/brand.service';
import { InfluencerService } from 'src/influencer/influencer.service';
import { UsersService } from './users.service';

@ApiTags('/api/users')
@Controller('/api/users')
export class UsersController {
  constructor(
    private  usersService: UsersService,
    private  influencerService: InfluencerService,
    private  brandService: BrandService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/userInfor')
  async getInforByUser(@Req() req, @Res() res: Response) {
    const user = await this.usersService.findOne(req.user.email);
    let data = null;
    if (user.roles == 'brand') {
      data = await this.brandService.findByUser(req.user.id);
    } else if (user.roles == 'influencer') {
      data = await this.influencerService.findByUser(req.user.id);
    }
    return res
      .status(HttpStatus.OK)
      .json({ status: 200, message: 'Fetch data success', data: data });
  }
}
