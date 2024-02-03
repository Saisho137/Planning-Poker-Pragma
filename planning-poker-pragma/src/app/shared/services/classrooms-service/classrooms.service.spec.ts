import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { UserInRoomI } from '../../../interfaces/user-in-room-interface';
import { ClassroomsService } from './classrooms.service';
import { ClassroomI } from '../../../interfaces/classroom-interface';
import { TestBed } from '@angular/core/testing';

describe('ClassroomsService', () => {
  let service: ClassroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassroomsService]
    });
    service = TestBed.inject(ClassroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //createRoom()
  it('should create a new room with the given user', () => {
    const user: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };
    const roomId = 'room1';

    const room = service.createRoom(roomId, user);

    // Check if the room is created correctly
    expect(room.id).toBe(roomId);
    expect(room.users).toContain(user);
    expect(room.admin).toContain(user.id);
    // Check if the user & room is added to the global users list
    expect(service['users']).toContain(user);
    expect(service['rooms']).toContain(room);
  });

  //getRoom()
  it('should return the room with the specified ID', () => {
    const user: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };
    const roomId = 'room1';

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user.id],
      users: [user],
    };
    service.rooms.push(newRoom);

    const retrievedRoom = service.getRoom(roomId);

    // Check if the retrieved room matches the created room
    expect(retrievedRoom).toBe(newRoom);
    expect(retrievedRoom?.id).toBe(roomId);
    expect(retrievedRoom?.users).toContain(user);
    expect(retrievedRoom?.admin).toContain(user.id);
  });

  it('should return undefined for non-existent room ID', () => {
    const retrievedRoom = service.getRoom('nonExistentRoom');
    // Check if undefined is returned for non-existent room ID
    expect(retrievedRoom).toBeUndefined();
  });

  //createScoringMode()
  it('should return the "fibonacci" scoring mode', () => {
    const scoringMode = service.createScoringMode('fibonacci');
    // Check if the returned scoring mode matches the expected mode
    expect(scoringMode).toEqual(service['scoringMode']['fibonacci']);
  });

  it('should return the "oneToFive" scoring mode', () => {
    const scoringMode = service.createScoringMode('oneToFive');
    // Check if the returned scoring mode matches the expected mode
    expect(scoringMode).toEqual(service['scoringMode']['oneToFive']);
  });

  it('should return the "oneHundred" scoring mode', () => {
    const scoringMode = service.createScoringMode('oneHundred');
    // Check if the returned scoring mode matches the expected mode
    expect(scoringMode).toEqual(service['scoringMode']['oneHundred']);
  });

  //makeUserAdmin()
  it('should make a user admin in the specified room', () => {
    const roomId = 'room1';
    const user: UserInRoomI = {id: '1',} as any;
    const newAdminUser = '2';

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user.id],
      users: [user],
    };
    service.rooms.push(newRoom);
    const isAdminBefore = newRoom.admin.includes(newAdminUser);

    const result = service.makeUserAdmin(roomId, newAdminUser);

    const isAdminAfter = newRoom.admin.includes(newAdminUser);

    // Check if the user is not admin before and becomes admin after
    expect(isAdminBefore).toBe(false);
    expect(isAdminAfter).toBe(true);

    // Check if the method returns true indicating successful admin change
    expect(result).toBe(true);
  });

  it('should not make a user admin if already admin in the specified room', () => {
    const roomId = 'room1';
    const user: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };
    const adminUser = '1';

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user.id],
      users: [user],
    };
    service.rooms.push(newRoom);

    const result = service.makeUserAdmin(roomId, adminUser);

    // Check if the user remains admin
    expect(newRoom.admin).toContain(adminUser);

    // Check if the method returns false indicating no change
    expect(result).toBe(false);
  });

  it('should not make a user admin in non-exist room', () => {
    const roomId = 'room1';
    const user: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };
    
    const result = service.makeUserAdmin(roomId, user.id);

    // Check if the method returns false indicating user is not admin
    expect(result).toBe(false);
  })

  //updateUserState()
  it('should update user state in the specified room', () => {
    const roomId = 'room1';
    const userId = '1';
    const username = 'newUsername';
    const rol = 'spectator';

    const user: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user.id],
      users: [user],
    };
    service.rooms.push(newRoom);

    service.updateUserState(roomId, userId, username, rol);

    // Check if the user state is updated correctly
    const updatedUser = newRoom.users.find((user) => user.id === userId);
    expect(updatedUser?.username).toEqual(username);
    expect(updatedUser?.rol).toEqual(rol);
  });

  it('should not update user state if user is not in the specified room', () => {
    const roomId = 'room1';
    const userId = '1';
    const username = 'newUsername';
    const rol = 'spectator';

    // No room created
    service.updateUserState(roomId, userId, username, rol);

    // Check if no user is added to unexisting room
    const room = service.getRoom(roomId);
    expect(room?.users.length).toBeUndefined();
  });

  //userIsPlayer()
  it('should return true if the user is a player in the specified room', () => {
    const roomId = 'room1';
    const userId = '1';

    const user: UserInRoomI = {
      id: userId,
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user.id],
      users: [user],
    };
    service.rooms.push(newRoom);

    // Check if the method correctly identifies the user as a player
    expect(service.userIsPlayer(roomId, userId)).toBe(true);
  });

  it('should return false if the user is not a player in the specified room', () => {
    const roomId = 'room1';
    const userId = '1';

    const user: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'spectator',
      cardSelected: '',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user.id],
      users: [user],
    };
    service.rooms.push(newRoom);

    const isPlayer = service.userIsPlayer(roomId, userId);

    // Check if the method correctly identifies the user as not a player
    expect(isPlayer).toBe(false);
  });

  it('should return false if the user is not in the specified room', () => {
    const roomId = 'room1';
    const userId = '1';

    // No user added to the room

    const isPlayer = service.userIsPlayer(roomId, userId);

    // Check if the method correctly returns false for a non-existent user
    expect(isPlayer).toBe(false);
  });

  //addUsersToRoom()
  it('should add new users to the specified room', () => {
    const roomId = 'room1';
    const existingUser: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };
    const newUsers: UserInRoomI[] = [
      { id: '2', username: 'user2', rol: 'spectator', cardSelected: '' },
      { id: '3', username: 'user3', rol: 'player', cardSelected: '' },
    ];

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [existingUser.id],
      users: [existingUser],
    };
    service.rooms.push(newRoom);

    service.addUsersToRoom(roomId, newUsers);

    // Check if the new users are added to the room
    expect(newRoom.users).toContain(existingUser);
    expect(newRoom.users).toContain(newUsers[0]);
    expect(newRoom.users).toContain(newUsers[1]);
  });

  it('should not add new users if the room does not exist', () => {
    const roomId = 'nonExistentRoom';
    const newUsers: UserInRoomI[] = [
      { id: '2', username: 'user2', rol: 'spectator', cardSelected: '' },
      { id: '3', username: 'user3', rol: 'player', cardSelected: '' },
    ];

    // No room created
    service.addUsersToRoom(roomId, newUsers);

    // Check if no users are added to the non-existent room
    const room = service.getRoom(roomId);
    expect(room?.users.length).toBeUndefined();
  });

  //selectCard()
  it('should select a card for the specified player in the room', () => {
    const roomId = 'room1';
    const userId = '1';
    const hostValue = '5';

    const user: UserInRoomI = {
      id: userId,
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user.id],
      users: [user],
    };
    service.rooms.push(newRoom);

    service.selectCard(roomId, userId, hostValue);

    // Check if the user's card is selected
    const selectedUser = newRoom.users.find((user) => user.id === userId);
    expect(selectedUser?.cardSelected).toBe(hostValue);
  });

  it('should not select a card for a non-player player in the room', () => {
    const roomId = 'room1';
    const userId = '1';
    const hostValue = '5';

    const user: UserInRoomI = {
      id: userId,
      username: 'user1',
      rol: 'spectator',
      cardSelected: '',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user.id],
      users: [user],
    };
    service.rooms.push(newRoom);

    service.selectCard(roomId, userId, hostValue);

    // Check if the user's card is selected
    const selectedUser = newRoom.users.find((user) => user.id === userId);
    expect(selectedUser?.cardSelected).toBe('');
  });

  it('should not select a card for a non-existent player in the room', () => {
    const roomId = 'room1';
    const userId = 'nonExistentUser';
    const hostValue = '5';

    // No room created
    service.selectCard(roomId, userId, hostValue);

    // Check if no user is added to the non-existent user
    const room = service.getRoom(roomId);
    expect(room?.users.length).toBeUndefined();
  });

  //clearSelectedCard()
  it('should clear the selected card for the specified player in the room', () => {
    const roomId = 'room1';
    const userId = '1';

    const user: UserInRoomI = {
      id: userId,
      username: 'user1',
      rol: 'player',
      cardSelected: '8',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user.id],
      users: [user],
    };
    service.rooms.push(newRoom);

    service.clearSelectedCard(roomId, userId);

    // Check if the user's card is cleared
    const clearedUser = newRoom.users.find((user) => user.id === userId);
    expect(clearedUser?.cardSelected).toBe('');
  });

  it('should not clear the selected card for a non-existent player in the room', () => {
    const roomId = 'room1';
    const userId = 'nonExistentUser';

    // No room created
    service.clearSelectedCard(roomId, userId);

    // Check if no user is added to the non-existent user
    const room = service.getRoom(roomId);
    expect(room?.users.length).toBeUndefined();
  });

  //selectCardForMockUpUsers()
  it('should select a card from fibonacci for mock-up users in the room', () => {
    const roomId = 'room1';
    const userId = '1';
    const mode = service.createScoringMode('fibonacci');

    const user1: UserInRoomI = {
      id: userId,
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };
    const user2: UserInRoomI = {
      id: '2',
      username: 'user2',
      rol: 'player',
      cardSelected: '',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user1.id],
      users: [user1],
    };
    service.rooms.push(newRoom);
    newRoom.users.push(user2);

    // Set up a spy on Math.random to control its return value
    const randomSpy = jest.spyOn(globalThis.Math, 'random');
    randomSpy.mockReturnValue(0.4);

    service.selectCardForMockUpUsers(mode, roomId, userId);

    // Check if the mock-up user's card is selected based on Math.random()
    expect(user2.cardSelected).toBe('8');

    // Restore the original Math.random function
    randomSpy.mockRestore();
  });

  it('should select a card from oneToFive for mock-up users in the room', () => {
    const roomId = 'room1';
    const userId = '1';
    const mode = service.createScoringMode('oneToFive');

    const user1: UserInRoomI = {
      id: userId,
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };
    const user2: UserInRoomI = {
      id: '2',
      username: 'user2',
      rol: 'player',
      cardSelected: '',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user1.id],
      users: [user1],
    };
    service.rooms.push(newRoom);
    newRoom.users.push(user2);

    // Set up a spy on Math.random to control its return value
    const randomSpy = jest.spyOn(globalThis.Math, 'random');
    randomSpy.mockReturnValue(0.4);

    service.selectCardForMockUpUsers(mode, roomId, userId);

    // Check if the mock-up user's card is selected based on Math.random()
    expect(user2.cardSelected).toBe('3');

    // Restore the original Math.random function
    randomSpy.mockRestore();
  });

  it('should select a card from oneHundred for mock-up users in the room', () => {
    const roomId = 'room1';
    const userId = '1';
    const mode = service.createScoringMode('oneHundred');

    const user1: UserInRoomI = {
      id: userId,
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };
    const user2: UserInRoomI = {
      id: '2',
      username: 'user2',
      rol: 'player',
      cardSelected: '',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user1.id],
      users: [user1],
    };
    service.rooms.push(newRoom);
    newRoom.users.push(user2);

    // Set up a spy on Math.random to control its return value
    const randomSpy = jest.spyOn(globalThis.Math, 'random');
    randomSpy.mockReturnValue(0.4);

    service.selectCardForMockUpUsers(mode, roomId, userId);

    // Check if the mock-up user's card is selected based on Math.random()
    expect(user2.cardSelected).toBe('50');

    // Restore the original Math.random function
    randomSpy.mockRestore();
  });

  //clearSelectedCardForMockUpUsers()
  it('should clear selected cards for mock-up users in the room', () => {
    const roomId = 'room1';
    const userId = '1';

    const user1: UserInRoomI = {
      id: userId,
      username: 'user1',
      rol: 'player',
      cardSelected: '3',
    };
    const user2: UserInRoomI = {
      id: '2',
      username: 'user2',
      rol: 'player',
      cardSelected: '1',
    };

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user1.id],
      users: [user1],
    };
    service.rooms.push(newRoom);
    newRoom.users.push(user2);

    service.clearSelectedCardForMockUpUsers(roomId);

    // Check if the selected cards for mock-up users are cleared
    newRoom.users.forEach((user) => expect(user.cardSelected).toBe(''));
  });

  it('should not clear selected cards for mock-up users if the room does not exist', () => {
    const roomId = 'nonExistentRoom';

    // No room created
    service.clearSelectedCardForMockUpUsers(roomId);

    // Check if no users are added to the non-existent room
    const room = service.getRoom(roomId);
    expect(room?.users.length).toBeUndefined();
  });

  //allPlayersSelectedCard()
  it('should return true when all players have selected a card', async () => {
    const user1: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '3',
    };
    const user2: UserInRoomI = {
      id: '2',
      username: 'user2',
      rol: 'player',
      cardSelected: '5',
    };
    const userListSubject = new BehaviorSubject<UserInRoomI[] | undefined>([
      user1,
      user2,
    ]);

    // Mock userList$ observable
    service['userListSubject'] = userListSubject;
    service['userList$'] = userListSubject.asObservable();

    const result = firstValueFrom(service.allPlayersSelectedCard());
    expect(await result).toEqual(true);
  });

  it('should return false when at least one player has not selected a card', async () => {
    const user1: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '3',
    };
    const user2: UserInRoomI = {
      id: '2',
      username: 'user2',
      rol: 'player',
      cardSelected: '',
    };
    const userListSubject = new BehaviorSubject<UserInRoomI[] | undefined>([
      user1,
      user2,
    ]);

    // Mock userList$ observable
    service['userListSubject'] = userListSubject;
    service['userList$'] = userListSubject.asObservable();

    const result = firstValueFrom(service.allPlayersSelectedCard());
    expect(await result).toEqual(false);
  });

  //resetGame()
  it('should reset the game for players in the room', () => {
    const roomId = 'room1';
    const user1: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '3',
    };
    const user2: UserInRoomI = {
      id: '2',
      username: 'user2',
      rol: 'player',
      cardSelected: '5',
    };
    const userListSubject = new BehaviorSubject<UserInRoomI[] | undefined>([
      user1,
      user2,
    ]);

    // Mock userList$ observable
    service['userListSubject'] = userListSubject;
    service['userList$'] = userListSubject.asObservable();

    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user1.id],
      users: [user1],
    };
    service.rooms.push(newRoom);
    newRoom.users.push(user2);
    service.resetGame(roomId);

    newRoom.users.forEach((user) => expect(user.cardSelected).toBe(''));
  });

  it('should delete the room and remove all users', () => {
    const roomId = 'room1';
    const user1: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '3',
    };
    const user2: UserInRoomI = {
      id: '2',
      username: 'user2',
      rol: 'player',
      cardSelected: '5',
    };

    // Create a room
    const newRoom: ClassroomI = {
      id: roomId,
      admin: [user1.id],
      users: [user1],
    };
    service.rooms.push(newRoom);
    newRoom.users.push(user2);
    // Delete the room
    service.deleteRoom(roomId);

    // Check if the room is deleted
    const selectedRoom = service.getRoom(roomId);
    expect(selectedRoom).toBeUndefined();

    // Check if all users are removed
    expect(service['users'].length).toBe(0);
  });
});
