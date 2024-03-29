import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClassroomsService } from '../../shared/services/classrooms-service/classrooms.service';
import { CreateVisualizationModeComponent } from '../../components/organisms/create-visualization-mode/create-visualization-mode.component';
import { ClassroomI } from '../../interfaces/classroom-interface';
import { ScoringModeItemI } from '../../interfaces/scoring-mode-interface';
import { CardMenuComponent } from '../../components/organisms/card-menu/card-menu.component';
import { UsersTableMenuComponent } from '../../components/organisms/users-table-menu/users-table-menu.component';
import { Subscription } from 'rxjs';
import { CardComponent } from '../../components/atoms/card/card.component';
import { InvitationLinkComponent } from './invitation-link/invitation-link.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { UserInRoomI } from '../../interfaces/user-in-room-interface';
import { UsersService } from '../../shared/services/users-service/users.service';
import { UserI } from '../../interfaces/user-interface';
import { convertToUserInRoom } from '../../shared/functions/exportables';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    CommonModule,
    CreateVisualizationModeComponent,
    CardMenuComponent,
    CardComponent,
    UsersTableMenuComponent,
    InvitationLinkComponent,
    NavbarComponent,
    RouterLink,
  ],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss',
})
export class ClassroomComponent {
  public roomId = '';
  public room: ClassroomI | undefined;

  public pragmaIcon = '../../../../assets/images/pragma.png';

  public configurationWindow = true;
  public invitationWindow = false;

  public allPlayersSelected = false;
  public cardResultsRevealed = false;
  public usersAlreadySelectedCard = false;
  public alreadyInitialized = false;

  public scoringMode: ScoringModeItemI[] = [];
  public averageScore: string | undefined = undefined;
  public numberDictionary: Record<string, number> = { '0': 0 };

  public selectedCard = '';
  public visualization: 'player' | 'spectator' | '' = '';

  private userId = '';
  private username = '';

  private userIdSubscription: Subscription | undefined;
  private usernameSubscription: Subscription | undefined;

  private getAllUsersSubscription: Subscription | undefined;
  private allPlayerSelectedSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private classroomService: ClassroomsService
  ) {
    this.initializeValues();
  }

  ngOnInit() {
    this.userIdSubscription = this.userService.userId$.subscribe((userId) => {
      if (userId) this.userId = userId;
      else this.userId = '0000';
    });
    this.usernameSubscription = this.userService.username$.subscribe(
      (username) => {
        if (username) this.username = username;
        else this.username = 'ERR';
      }
    );

    this.allPlayerSelectedSubscription = this.classroomService
      .allPlayersSelectedCard()
      .subscribe((result: boolean) => {
        this.allPlayersSelected = result;
      });

    const user: UserInRoomI = {
      id: this.userId,
      username: this.username,
      rol: 'spectator',
      cardSelected: '',
    };
    this.classroomService.createRoom(this.roomId, user);
  }

  initializeValues(): void {
    this.roomId = this.route.snapshot.paramMap.get('id')!;
    this.room = this.classroomService.getRoom(this.roomId);
    this.scoringMode = this.classroomService.createScoringMode('fibonacci');
  }

  initializeRoom(): void {
    if (!this.alreadyInitialized) {
      this.addMockUpUsers();
      this.alreadyInitialized = true;
    }
    
    this.configurationWindow = !this.configurationWindow;
    this.setVisualization();
    this.updateRoom();
    
    if (this.visualization === 'spectator') {
      this.selectedCard = '?';
      this.selectCard('');
      this.allPlayersSelected = false;
    } 
  }

  setVisualization(): void {
    this.visualization = this.classroomService.userIsPlayer(
      this.roomId,
      this.userId
    )
      ? 'player'
      : 'spectator';
  }

  addMockUpUsers(): void {
    this.getAllUsersSubscription = this.userService.getAllUsers().subscribe({
      next: (users) => {
        const mockUpUsers: UserI[] = users;

        const usersToAdd: UserInRoomI[] = mockUpUsers
          .map(convertToUserInRoom)
          .filter((user) => user.id !== this.userId); //Filter host user from the room

        this.classroomService.addUsersToRoom(this.roomId, usersToAdd);
      },
      error: () => {
        throw new Error('Error fetching users.');
      },
    });
  }

  updateScoringMode(value: 'fibonacci' | 'oneToFive' | 'oneHundred') {
    this.selectedCard = '';
    this.usersAlreadySelectedCard = false;
    this.scoringMode = this.classroomService.createScoringMode(value);
  }

  updateRoom(): void {
    this.room = this.classroomService.getRoom(this.roomId);
  }

  switchInvitationWindow(): void {
    this.invitationWindow = !this.invitationWindow;
  }

  selectCard(value: string): void {
    if (this.selectedCard === value) {
      this.classroomService.clearSelectedCard(this.roomId, this.userId);
      this.selectedCard = '';
      this.updateRoom();
      return;
    }

    this.selectedCard = value;
    this.classroomService.selectCard(
      this.roomId,
      this.userId,
      this.selectedCard
    );

    if (!this.usersAlreadySelectedCard) {
      setTimeout(() => {
        this.classroomService.selectCardForMockUpUsers(
          this.scoringMode,
          this.roomId,
          this.userId
        );
        this.usersAlreadySelectedCard = true;
        this.updateRoom();
      }, 2000);
    }
  }

  votesCount(): void {
    if (this.room?.users) {
      const players = this.room.users.filter((user) => user.rol === 'player');
      //Creates a key-value pair object that counts the number of votes of each selected card
      this.numberDictionary = players.reduce(
        (accumulator: Record<string, number>, object: UserInRoomI) => {
          const value = object.cardSelected;
          accumulator[value] = (accumulator[value] || 0) + 1;
          return accumulator;
        },
        {}
      );
    }
  }

  makeAverageScore(): void {
    if (this.room) {
      const players = this.room.users.filter((user) => user.rol === 'player');
      //Split number into Integer and Decimal Part.
      let averageArray = (
        Math.round(
        (players.reduce( (accumulator, current) => accumulator + parseFloat(current.cardSelected), 0 ) / players.length) * 10
        ) / 10
      ).toString().split('.');
      //If number has Decimal part, replace '.' with ','.
      if (averageArray[1]) {
        this.averageScore = averageArray[0] + ',' + averageArray[1];
        return;
      }
      //If not, return number.
      this.averageScore = averageArray[0];
    }
  }

  revealCards(): void {
    if (this.room?.admin.includes(this.userId)) {
      this.makeAverageScore();
      this.votesCount();
      this.cardResultsRevealed = true;
      return;
    }
    alert('Debes ser administrador para presionar este botón!');
  }

  restartGame(): void {
    if (this.room?.admin && this.room?.admin.includes(this.userId)) {
      this.classroomService.resetGame(this.roomId);
      this.usersAlreadySelectedCard = false;
      this.cardResultsRevealed = false;
      this.averageScore = undefined;
      this.selectedCard = '';
      this.numberDictionary = { '0': 0 };
      this.configurationWindow = true;
      return;
    }
    alert('Debes ser administrador para presionar este botón!');
  }

  ngOnDestroy(): void {
    this.restartGame();
    if (this.allPlayerSelectedSubscription) {
      this.allPlayerSelectedSubscription.unsubscribe();
    }
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
    if (this.getAllUsersSubscription) {
      this.getAllUsersSubscription.unsubscribe();
    }

    this.classroomService.deleteRoom(this.roomId);
  }
}
