import { Injectable } from '@angular/core';
import { UserI } from '../../../interfaces/user-interface';
import { UsersService } from '../users-service/users.service';
import { UserInRoomI } from '../../../interfaces/user-in-room-interface';
import { ClassroomI } from '../../../interfaces/classroom-interface';
import {ScoringModeI, ScoringModeItemI} from '../../../interfaces/scoring-mode-interface';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService {
  private userListSubject: BehaviorSubject<UserInRoomI[] | undefined> =
    new BehaviorSubject<UserInRoomI[] | undefined>([]);
  private userList$: Observable<UserInRoomI[] | undefined> =
    this.userListSubject.asObservable();

  private rooms: ClassroomI[] = [];
  private users: UserInRoomI[] = [];

  private scoringMode: ScoringModeI = {
    "fibonacci": [
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
    'oneToFive': [
      { id: 1, value: '1' },
      { id: 2, value: '2' },
      { id: 3, value: '3' },
      { id: 4, value: '4' },
      { id: 5, value: '5' },
      { id: 6, value: '?' },
      { id: 7, value: '☕' },
    ],
    'oneHundred': [
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
  };

  constructor() {}

  public userIsPlayer(classroomId: string, userId: string): boolean {
    const room: ClassroomI | undefined = this.getRoom(classroomId);
    const user: UserInRoomI | undefined = room?.users.find(
      (user) => user.id === userId
    );
    return user ? user.rol === 'player' : false;
  }

  public createScoringMode(mode: 'fibonacci' | 'oneToFive' | 'oneHundred'): ScoringModeItemI[] {
    return this.scoringMode[mode];
  }

  public createRoom(
    classroomId: string,
    user: UserInRoomI
  ): ClassroomI {
    this.users.push(user);

    const newRoom: ClassroomI = {
      id: classroomId,
      admin: user.id,
      users: this.users,
    };
    this.rooms.push(newRoom);

    return newRoom;
  }

  public getRoom(classroomId: string): ClassroomI | undefined {
    const selectedRoom: ClassroomI | undefined = this.rooms.find(
      (room) => room.id === classroomId
    );
    return selectedRoom;
  }

  public addUsersToRoom(
    classroomId: string,
    newUsers: UserInRoomI[]
  ): void {
    const selectedRoom: ClassroomI | undefined =
      this.getRoom(classroomId);

    if (selectedRoom) {
      selectedRoom.users = [...selectedRoom.users, ...newUsers];
    }
  }

  public selectCardForMockUpUsers(
    mode: ScoringModeItemI[],
    classroomId: string,
    userId: string,
    hostValue: string
  ): void {
    const selectedRoom: ClassroomI | undefined =
      this.getRoom(classroomId);
    const numericMode = mode.slice(0, mode.length - 2);

    if (selectedRoom) {
      selectedRoom.users.forEach((user) => {
        if (user.rol === 'player') {
          if (user.id === userId) {
            user.cardSelected = hostValue;
            return;
          }
          user.cardSelected =
            mode[Math.floor(Math.random() * numericMode.length)].value;
        }
      });
      this.userListSubject.next(selectedRoom.users);
    }
  }

  public clearSelectedCard(classroomId: string, userId: string): void {
    const selectedRoom: ClassroomI | undefined =
      this.getRoom(classroomId);
    if (selectedRoom) {
      selectedRoom.users.forEach((user) => {
        if (user.id === userId) user.cardSelected = '';
      });
      this.userListSubject.next(selectedRoom.users);
    }
  }

  public allPlayersSelectedCard(): Observable<boolean> {
    return this.userList$.pipe(
      map((users) => {
        if (users!.length === 0) {
          return false;
        }
        const players = users!.filter((user) => user.rol === 'player');
        return players.every((player) => player.cardSelected !== '');
      })
    );
  }

  public resetGame(classroomId: string): void {
    const selectedRoom: ClassroomI | undefined =
      this.getRoom(classroomId);
    if (selectedRoom) {
      selectedRoom.users.forEach((user) => {
        if (user.rol === 'player') {
          user.cardSelected = '';
        }
      });
      this.userListSubject.next(selectedRoom.users);
    }
  }

  public deleteRoom(classroomId: string): void {
    const index = this.rooms.findIndex((room) => room.id === classroomId);
    this.rooms.splice(index, 1);
    this.users.length = 0;
  }
}
