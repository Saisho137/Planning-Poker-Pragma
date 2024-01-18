import { UserI } from './user-interface';

export interface UserResponseI {
  user: UserI;
  token: string;
}
