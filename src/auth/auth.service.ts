import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleUserDto } from './dto/login-google.dto';
import { google } from 'googleapis';
import { Users } from 'src/entities/user.entity';
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.GOOGLE_ID);
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    return null;
  }
  login(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      fullname: user.fullname,
      isVerify: user.isVerify,
      roles: user.roles,
      createAt: user.createAt,
      updateAt: user.updateAt,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
  async register(users: CreateUserDto): Promise<any> {
    try {
      users.password = await bcrypt.hash(users.password, 12);
      const { password, ...result } = await this.usersService.save(users);
      return result;
    } catch {
      throw new InternalServerErrorException({
        status: 'False',
        message: 'Could not register',
      });
    }
  }

  async logingoogle(logingoogle: GoogleUserDto) {
    const user = await this.usersService.findOne(logingoogle.email);
    if (user) {
      return this.login(user);
    } else {
      try {
        const res = await client.verifyIdToken({
          idToken: logingoogle.idToken,
        });
        const newUser = new Users();
        newUser.fullname =
          res.getPayload().given_name + ' ' + res.getPayload().family_name;
        newUser.email = res.getPayload().email;
        newUser.avatar = res.getPayload().picture;
        newUser.isVerify = true;
        const data = await this.usersService.save(newUser);
        return this.login(data);
      } catch (err) {
        console.log(err);
        throw new InternalServerErrorException({status:500, message:'Internal Server Error'})
      }
    }
  }
 
}
