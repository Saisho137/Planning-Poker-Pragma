import { UserInRoomInterface } from './user-in-room-interface';

export interface ClassroomInterface {
  id: string;
  admin: string;
  users: UserInRoomInterface[];
}
