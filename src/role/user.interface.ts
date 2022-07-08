import { Request } from 'express';
import {Users} from '../entities/user.entity';
 
interface RequestWithUser extends Request {
  user: Users;
}
 
export default RequestWithUser;