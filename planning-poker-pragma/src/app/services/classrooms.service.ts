import { Injectable } from '@angular/core';
import { ClassroomInterface } from '../interfaces/classroom-interface';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService {
  constructor() {}

  private rooms: ClassroomInterface[] = [];

  public createRoom(classroomId: string, user_id: string): ClassroomInterface {
    const newRoom = {
      id: classroomId,
      admin: user_id,
    };
    this.rooms.push(newRoom);
    return newRoom;
  }

  public getRoom(classroomId: string): ClassroomInterface | undefined {
    const selectedRoom: ClassroomInterface | undefined = this.rooms.find((room) => room.id === classroomId);
    return selectedRoom;
  }
}
