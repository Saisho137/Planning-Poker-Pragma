import { UserInRoomI } from './user-in-room-interface';

export interface ClassroomI {
  id: string;
  admin: string[];
  users: UserInRoomI[];
}
