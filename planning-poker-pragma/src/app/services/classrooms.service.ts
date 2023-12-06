import { Injectable } from '@angular/core';
import { ClassroomInterface } from '../interfaces/classroom-interface';
import { UserInRoomInterface } from '../interfaces/userInRoom-interface';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService {
  constructor() {}

  private rooms: ClassroomInterface[] = [];
  private users: UserInRoomInterface[] = [];

  public createRoom(classroomId: string, user_id: string, username: string, rol: 'player' | 'spectator' | ''): ClassroomInterface {
    rol === '' ? rol = 'player' : null

    const user: UserInRoomInterface = {
      id: user_id,
      username: username,
      rol: rol,
    };
    this.users.push(user)

    const newRoom = {
      id: classroomId,
      admin: user_id,
      users: this.users
    };
    this.rooms.push(newRoom);
    
    return newRoom;
  }

  public getRoom(classroomId: string): ClassroomInterface | undefined {
    const selectedRoom: ClassroomInterface | undefined = this.rooms.find((room) => room.id === classroomId);
    return selectedRoom;
  }
}
