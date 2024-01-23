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
});
