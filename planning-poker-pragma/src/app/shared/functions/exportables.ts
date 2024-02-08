import { UserInRoomI } from '../../interfaces/user-in-room-interface';
import { UserI } from '../../interfaces/user-interface';

export function convertToUserInRoom(user: UserI): UserInRoomI {
  return {
    id: user._id,
    username: user.username,
    rol: Math.random() <= 0.7 ? 'player' : 'spectator',
    cardSelected: '',
  };
}
