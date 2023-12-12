import { Injectable } from '@angular/core';
import { ClassroomInterface } from '../interfaces/classroom-interface';
import { UserInRoomInterface } from '../interfaces/user-in-room-interface';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService {
  constructor() {}

  private rooms: ClassroomInterface[] = [];
  private users: UserInRoomInterface[] = [];
  private scoringMode = [
    ['1', '2', '3', '5', '8', '13', '21', '?', '☕'],
    ['1', '2', '3', '4', '5', '?', '☕'],
    ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '?', '☕'],
  ];

  public createScoringMode(mode: string) {
    switch (mode) {
      case 'fibonacci':
        console.log(this.scoringMode[0]);
        return this.scoringMode[0];
      case 'oneToFive':
        console.log(this.scoringMode[1]);
        return this.scoringMode[1];
      case 'oneHundred':
        console.log(this.scoringMode[2]);
        return this.scoringMode[2];
    }
    return ['void'];
  }

  public createRoom(
    classroomId: string,
    user_id: string,
    username: string,
    rol: 'player' | 'spectator' | ''
  ): ClassroomInterface {
    rol === '' ? (rol = 'player') : null;

    const user: UserInRoomInterface = {
      id: user_id,
      username: username,
      rol: rol,
    };
    this.users.push(user);

    const newRoom = {
      id: classroomId,
      admin: user_id,
      users: this.users,
    };
    this.rooms.push(newRoom);

    return newRoom;
  }

  public getRoom(classroomId: string): ClassroomInterface | undefined {
    const selectedRoom: ClassroomInterface | undefined = this.rooms.find(
      (room) => room.id === classroomId
    );
    return selectedRoom;
  }

  public userIsPlayer(classroomId: string, userId: string): boolean {
    const room: ClassroomInterface | undefined = this.getRoom(classroomId);
    const user: UserInRoomInterface | undefined = room?.users.find(
      (user) => user.id === userId
    );
    return user ? user.rol === 'player' : false;
  }
}
