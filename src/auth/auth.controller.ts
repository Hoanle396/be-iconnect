import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Request, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
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
  async register(@Body() user: CreateUserDto,@Res() res: Response) {
    const userexits = await this.usersService.findOne(user.email);
    if (userexits) {
      return res.status(HttpStatus.BAD_REQUEST).json({status:'Not register',message:'Email address already exists'});
    }
    const result = await this.authService.register(user);
    if (result) {
      return res.status(HttpStatus.OK).json({status:200,message:"Resgiter Successfuly!",data:result})
    }
    else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({status:500,message:"Resgiter Failed!",data:null})
    }
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/secret')
  async getUser(@Request() req,@Res() res: Response) {
    const data=await this.usersService.findOne(req.user.email);
    if(data){
     const {password ,...result}=data
     return res.status(HttpStatus.OK).json({status:200,message:"Authorzied",data:result})
    }
    else{
      return res.status(HttpStatus.UNAUTHORIZED).json({status:401,message:"Unauthorzied",data:null})
    }
  }
  
  @Post('/login/google')
  async postLogin(@Body() createUserDto: GoogleUserDto, @Res() res: Response) {
    try {
      const data = await this.authService.logingoogle(createUserDto);
      if (data) {
        return res.status(HttpStatus.OK).json({status:200,message:"Login Successfuly!",data:data});
      } else {
        return res
          .status(401)
          .send({status:401, message: 'UnAuthorized !' });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({status:500, message:"Internal server error!"});
    }
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  getLogout(@Request() req) {
    return {data: req.headers.authorization}
  }
}
