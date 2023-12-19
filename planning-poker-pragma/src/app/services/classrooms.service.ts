import { Injectable } from '@angular/core';
import { ClassroomInterface } from '../interfaces/classroom-interface';
import { UserInRoomInterface } from '../interfaces/user-in-room-interface';
import { ScoringModeInterface } from '../interfaces/scoring-mode-interface';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService {
  constructor() {}

  private rooms: ClassroomInterface[] = [];
  private users: UserInRoomInterface[] = [];
  private scoringMode = [
    [
      { id: 1, value: '1' },
      { id: 2, value: '2' },
      { id: 3, value: '3' },
      { id: 4, value: '5' },
      { id: 5, value: '8' },
      { id: 6, value: '13' },
      { id: 7, value: '21' },
      { id: 8, value: '34' },
      { id: 9, value: '55' },
      { id: 10, value: '89' },
      { id: 11, value: '?' },
      { id: 12, value: '☕' },
    ],
    [
      { id: 1, value: '1' },
      { id: 2, value: '2' },
      { id: 3, value: '3' },
      { id: 4, value: '4' },
      { id: 5, value: '5' },
      { id: 6, value: '?' },
      { id: 7, value: '☕' },
    ],
    [
      { id: 1, value: '10' },
      { id: 2, value: '20' },
      { id: 3, value: '30' },
      { id: 4, value: '40' },
      { id: 5, value: '50' },
      { id: 6, value: '60' },
      { id: 7, value: '70' },
      { id: 8, value: '80' },
      { id: 9, value: '90' },
      { id: 10, value: '100' },
      { id: 11, value: '?' },
      { id: 12, value: '☕' },
    ],
  ];

  public createScoringMode(mode: string): ScoringModeInterface[] {
    switch (mode) {
      case 'fibonacci':
        return this.scoringMode[0];
      case 'oneToFive':
        return this.scoringMode[1];
      case 'oneHundred':
        return this.scoringMode[2];
    }
    return [{ id: 0, value: 'null' }];
  }

  public getRoom(classroomId: string): ClassroomInterface | undefined {
    const selectedRoom: ClassroomInterface | undefined = this.rooms.find(
      (room) => room.id === classroomId
    );
    return selectedRoom;
  }
  public deleteRoom(): void {
    this.users.pop();
    this.rooms.pop();
  }

  public createRoom(
    classroomId: string,
    user: UserInRoomInterface): ClassroomInterface {

    this.users.push(user);

    const newRoom: ClassroomInterface = {
      id: classroomId,
      admin: user.id,
      users: this.users,
    };
    this.rooms.push(newRoom);

    return newRoom;
  }

  public userIsPlayer(classroomId: string, userId: string): boolean {
    const room: ClassroomInterface | undefined = this.getRoom(classroomId);
    const user: UserInRoomInterface | undefined = room?.users.find(
      (user) => user.id === userId
    );
    return user ? user.rol === 'player' : false;
  }
}
