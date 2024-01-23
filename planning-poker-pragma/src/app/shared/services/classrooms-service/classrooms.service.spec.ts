import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { UserInRoomI } from '../../../interfaces/user-in-room-interface';
import { ClassroomsService } from './classrooms.service';

describe('ClassroomsService', () => {
  let service: ClassroomsService;

  beforeEach(() => {
    service = new ClassroomsService();
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
    expect(room.id).toEqual(roomId);
    expect(room.admin).toContain(user.id);
    expect(room.users).toContain(user);

    // Check if the user is added to the global users list
    expect(service['users']).toContain(user);

    // Check if the room is added to the global rooms list
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

    const room = service.createRoom(roomId, user);

    const retrievedRoom = service.getRoom(roomId);

    // Check if the retrieved room matches the created room
    expect(retrievedRoom).toEqual(room);
  });

  it('should return undefined for non-existent room ID', () => {
    const roomId = 'nonExistentRoom';

    const retrievedRoom = service.getRoom(roomId);

    // Check if undefined is returned for non-existent room ID
    expect(retrievedRoom).toBeUndefined();
  });

  //createScoringMode()
  it('should return the "fibonacci" scoring mode', () => {
    const mode = 'fibonacci';

    const scoringMode = service.createScoringMode(mode);

    // Check if the returned scoring mode matches the expected mode
    expect(scoringMode).toEqual(service['scoringMode'][mode]);
  });

  it('should return the "oneToFive" scoring mode', () => {
    const mode = 'oneToFive';

    const scoringMode = service.createScoringMode(mode);

    // Check if the returned scoring mode matches the expected mode
    expect(scoringMode).toEqual(service['scoringMode'][mode]);
  });

  it('should return the "oneHundred" scoring mode', () => {
    const mode = 'oneHundred';

    const scoringMode = service.createScoringMode(mode);

    // Check if the returned scoring mode matches the expected mode
    expect(scoringMode).toEqual(service['scoringMode'][mode]);
  });

  //makeUserAdmin()
  it('should make a user admin in the specified room', () => {
    const roomId = 'room1';
    const user: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };
    const newAdminUser = 'adminUser';

    const room = service.createRoom(roomId, user);
    const isAdminBefore = room.admin.includes(newAdminUser);

    const result = service.makeUserAdmin(roomId, newAdminUser);

    const isAdminAfter = room.admin.includes(newAdminUser);

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

    const room = service.createRoom(roomId, user);

    const result = service.makeUserAdmin(roomId, adminUser);

    // Check if the user remains admin
    expect(room.admin).toContain(adminUser);

    // Check if the method returns false indicating no change
    expect(result).toBe(false);
  });

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

    const room = service.createRoom(roomId, user);

    service.updateUserState(roomId, userId, username, rol);

    // Check if the user state is updated correctly
    const updatedUser = room.users.find((user) => user.id === userId);
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
    expect(room?.users.length).toBe(undefined);
  });

  //userIsPlayer()
  it('should return true if the user is a player in the specified room', () => {
    const roomId = 'room1';
    const userId = '1';

    const user: UserInRoomI = {
      id: '1',
      username: 'user1',
      rol: 'player',
      cardSelected: '',
    };

    service.createRoom(roomId, user);

    const isPlayer = service.userIsPlayer(roomId, userId);

    // Check if the method correctly identifies the user as a player
    expect(isPlayer).toBe(true);
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

    service.createRoom(roomId, user);

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
      id: '3',
      username: 'user3',
      rol: 'player',
      cardSelected: '',
    };
    const newUsers: UserInRoomI[] = [
      { id: '2', username: 'user2', rol: 'spectator', cardSelected: '' },
      { id: '3', username: 'user3', rol: 'player', cardSelected: '' },
    ];

    const room = service.createRoom(roomId, existingUser);

    service.addUsersToRoom(roomId, newUsers);

    // Check if the new users are added to the room
    expect(room.users).toContain(existingUser);
    newUsers.forEach((newUser) => {
      expect(room.users).toContain(newUser);
    });
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
    expect(room?.users.length).toBe(undefined);
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

    const room = service.createRoom(roomId, user);

    service.selectCard(roomId, userId, hostValue);

    // Check if the user's card is selected
    const selectedUser = room.users.find((user) => user.id === userId);
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

    const room = service.createRoom(roomId, user);

    service.selectCard(roomId, userId, hostValue);

    // Check if the user's card is selected
    const selectedUser = room.users.find((user) => user.id === userId);
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
    expect(room?.users.length).toBe(undefined);
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

    const room = service.createRoom(roomId, user);

    service.clearSelectedCard(roomId, userId);

    // Check if the user's card is cleared
    const clearedUser = room.users.find((user) => user.id === userId);
    expect(clearedUser?.cardSelected).toBe('');
  });

  it('should not clear the selected card for a non-existent player in the room', () => {
    const roomId = 'room1';
    const userId = 'nonExistentUser';

    // No room created
    service.clearSelectedCard(roomId, userId);

    // Check if no user is added to the non-existent user
    const room = service.getRoom(roomId);
    expect(room?.users.length).toBe(undefined);
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

    const room = service.createRoom(roomId, user1);
    room.users.push(user2);

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

    const room = service.createRoom(roomId, user1);
    room.users.push(user2);

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

    const room = service.createRoom(roomId, user1);
    room.users.push(user2);

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

    const room = service.createRoom(roomId, user1);
    room.users.push(user2);

    service.clearSelectedCardForMockUpUsers(roomId);

    // Check if the selected cards for mock-up users are cleared
    room.users.forEach((user) => expect(user.cardSelected).toBe(''));
  });

  it('should not clear selected cards for mock-up users if the room does not exist', () => {
    const roomId = 'nonExistentRoom';

    // No room created
    service.clearSelectedCardForMockUpUsers(roomId);

    // Check if no users are added to the non-existent room
    const room = service.getRoom(roomId);
    expect(room?.users.length).toBe(undefined);
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
    const user1: UserInRoomI = { id: '1', username: 'user1', rol: 'player', cardSelected: '3' };
    const user2: UserInRoomI = { id: '2', username: 'user2', rol: 'player', cardSelected: '5' };
    const userListSubject = new BehaviorSubject<UserInRoomI[] | undefined>([user1, user2]);

    // Mock userList$ observable
    service['userListSubject'] = userListSubject;
    service['userList$'] = userListSubject.asObservable();

    const room = service.createRoom(roomId, user1);
    room.users.push(user2);
    service.resetGame(roomId);

    room.users.forEach((user) => expect(user.cardSelected).toBe(''));
  });
});
