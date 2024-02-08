import { UserInRoomI } from '../../interfaces/user-in-room-interface';
import { UserI } from '../../interfaces/user-interface';
import { convertToUserInRoom } from './exportables';

describe('convertToUserInRoom', () => {
  it('should map users properly to "player" role', () => {
    const users: UserI[] = [
      { _id: '1', username: 'user1' } as any,
      { _id: '2', username: 'user2' } as any,
    ];
    jest.spyOn(globalThis.Math, 'random').mockReturnValue(0.1);

    const result: UserInRoomI[] = users.map(convertToUserInRoom);

    result.forEach((user) => {
      expect(user.rol).toBe('player');
    });
  });

  it('should map users properly to "spectator" role', () => {
    const users: UserI[] = [
      { _id: '1', username: 'user1' } as any,
      { _id: '2', username: 'user2' } as any,
    ];
    jest.spyOn(globalThis.Math, 'random').mockReturnValue(0.8);

    const result: UserInRoomI[] = users.map(convertToUserInRoom);

    result.forEach((user) => {
      expect(user.rol).toBe('spectator');
    });
  });
});
