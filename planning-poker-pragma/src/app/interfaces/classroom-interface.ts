import { UserInRoomInterface } from "./userInRoom-interface";

export interface ClassroomInterface {
  id: string;
  admin: string;
  users: UserInRoomInterface[]
}
