export interface UserInRoomI {
  id: string;
  username: string;
  rol: 'player' | 'spectator';
  cardSelected: string;
}
