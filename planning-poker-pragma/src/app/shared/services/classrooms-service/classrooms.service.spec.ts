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
    const user: UserInRoomI = { id: '1', username: 'user1', rol: 'player', cardSelected: '' };
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

});
