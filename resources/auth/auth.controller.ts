import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Request, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from 'resources/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleUserDto } from './dto/login-google.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import {LoginDto} from './dto/login.dto'
@ApiTags('/api/auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
  private readonly usersService: UsersService) { }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req, @Body() body:LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    const userexits = await this.usersService.findOne(user.email);
    if (userexits) {
       throw new BadRequestException({status:'Not register','message':'Email address already exists'});
    }
    return await this.authService.register(user);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/secret')
  async getUser(@Request() req) {
    const data=await this.usersService.findOne(req.user.email);
    if(data){
     const {password ,...result}=data
     return result
    }
    else{
      throw new UnauthorizedException()
    }
  }
  
  @Post('/login/google')
  async postLogin(@Body() createUserDto: GoogleUserDto, @Res() res: Response) {
    try {
      const data = await this.authService.logingoogle(createUserDto);
      if (data) {
        return res.status(HttpStatus.OK).send(data);
      } else {
        return res
          .status(401)
          .send({status:401, message: 'UnAuthorized !' });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({status:500, message:"Internal server error!"});
    }
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  getLogout(@Request() req) {
    return {data: req.headers.authorization}
  }
}
