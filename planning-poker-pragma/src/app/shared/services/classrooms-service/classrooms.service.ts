import { Injectable } from '@angular/core';
import { UserInRoomI } from '../../../interfaces/user-in-room-interface';
import { ClassroomI } from '../../../interfaces/classroom-interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  ScoringModeI,
  ScoringModeItemI,
} from '../../../interfaces/scoring-mode-interface';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService {
  private userListSubject: BehaviorSubject<UserInRoomI[] | undefined> =
    new BehaviorSubject<UserInRoomI[] | undefined>([]);
  private userList$: Observable<UserInRoomI[] | undefined> =
    this.userListSubject.asObservable();

  public rooms: ClassroomI[] = [];
  public users: UserInRoomI[] = [];

  private scoringMode: ScoringModeI = {
    'fibonacci': [
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

  public createRoom(classroomId: string, user: UserInRoomI): ClassroomI {
    this.users.push(user);

    const newRoom: ClassroomI = {
      id: classroomId,
      admin: [user.id],
      users: this.users,
    };
    this.rooms.push(newRoom);

    return newRoom;
  }

  public getRoom(classroomId: string): ClassroomI | undefined {
    return this.rooms.find((room) => room.id === classroomId);
  }

  public createScoringMode(mode: 'fibonacci' | 'oneToFive' | 'oneHundred'): ScoringModeItemI[] {
    return this.scoringMode[mode];
  }

  public makeUserAdmin(classroomId: string, newAdminUser: string): boolean {
    const selectedRoom = this.getRoom(classroomId);
    if (selectedRoom && !selectedRoom?.admin.includes(newAdminUser)) {
          selectedRoom?.admin.push(newAdminUser);
          return true;
    }
    return false;
  }

  public updateUserState(
    classroomId: string,
    userId: string,
    username: string,
    rol: 'spectator' | 'player'
  ): void {
    const selectedRoom = this.getRoom(classroomId);
    selectedRoom?.users.find((user) => {
      if (user.id === userId) {
        user.username = username;
        user.rol = rol;
      }
    });
  }

  public userIsPlayer(classroomId: string, userId: string): boolean {
    const userTemp = this.getRoom(classroomId)?.users.find((user) => (user.id === userId));
    return userTemp ? userTemp.rol === 'player' : false;
  }

  public addUsersToRoom(classroomId: string, newUsers: UserInRoomI[]): void {
    const selectedRoom = this.getRoom(classroomId);
    if (selectedRoom) selectedRoom.users = [...selectedRoom.users, ...newUsers];
  }

  public selectCard(
    classroomId: string,
    userId: string,
    hostValue: string
  ): void {
    const selectedRoom = this.getRoom(classroomId);
    selectedRoom?.users.forEach((user) => {
      if (user.rol === 'player' && user.id === userId)
        user.cardSelected = hostValue;
    });
    this.userListSubject.next(selectedRoom?.users);
  }

  public clearSelectedCard(classroomId: string, userId: string): void {
    const selectedRoom = this.getRoom(classroomId);
    selectedRoom?.users.forEach((user) => {
      if (user.id === userId) user.cardSelected = '';
    });
    this.userListSubject.next(selectedRoom?.users);
  }

  public selectCardForMockUpUsers(
    mode: ScoringModeItemI[],
    classroomId: string,
    userId: string
  ): void {
    const selectedRoom = this.getRoom(classroomId);
    const numericMode = mode.slice(0, mode.length - 2);

    selectedRoom?.users.forEach((user) => {
      if (user.rol === 'player' && user.id !== userId) {
        if (!user.cardSelected) {
          user.cardSelected =
            mode[Math.floor(Math.random() * numericMode.length)].value;
        }
      }
    });
    this.userListSubject.next(selectedRoom?.users);
  }

  public clearSelectedCardForMockUpUsers(classroomId: string): void {
    const selectedRoom = this.getRoom(classroomId);

    selectedRoom?.users.forEach((user) => {
      user.cardSelected = '';
    });
    this.userListSubject.next(selectedRoom?.users);
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
    const selectedRoom = this.getRoom(classroomId);
    selectedRoom?.users.forEach((user) => {
      if (user.rol === 'player') {
        user.cardSelected = '';
      }
    });
    this.userListSubject.next(selectedRoom?.users);
  }

  public deleteRoom(classroomId: string): void {
    const index = this.rooms.findIndex((room) => room.id === classroomId);
    this.rooms.splice(index, 1);
    this.users.length = 0;
  }
}
