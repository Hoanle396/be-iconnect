import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  
  async validate(payload: any) {
    return {
       id: payload.id,
       fullname: payload.fullname ,
       email: payload.email ,
       avatar:payload.avatar ,
       roles: payload.roles, 
       isVerify:payload.isVerify , 
       createAt: payload.createAt,
       updateAt: payload.updateAt ,
      };
  }
}