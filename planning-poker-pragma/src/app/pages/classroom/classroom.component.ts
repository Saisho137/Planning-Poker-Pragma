import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClassroomsService } from '../../shared/services/classrooms-service/classrooms.service';
import { CreateVisualizationModeComponent } from '../../components/organisms/create-visualization-mode/create-visualization-mode.component';
import { ClassroomInterface } from '../../interfaces/classroom-interface';
import { ScoringModeItemI } from '../../interfaces/scoring-mode-interface';
import { CardMenuComponent } from '../../components/organisms/card-menu/card-menu.component';
import { UsersTableMenuComponent } from '../../components/organisms/users-table-menu/users-table-menu.component';
import { Subscription } from 'rxjs';
import { CardComponent } from '../../components/atoms/card/card.component';
import { InvitationLinkComponent } from './invitation-link/invitation-link.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { UserInRoomInterface } from '../../interfaces/user-in-room-interface';

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
  public roomId: string;
  public room: ClassroomInterface | undefined;

  public pragmaIcon: string = '../../../../assets/images/pragma.png';

  public configurationWindow: boolean = true;
  public invitationWindow: boolean = false;

  public allPlayersSelected: boolean = false;
  public cardResultsRevealed: boolean = false;
  public scoringMode: ScoringModeItemI[];

  public selectedCard: string = '';
  public averageScore: string | undefined = undefined;
  public visualization: 'player' | 'spectator' | '' = '';
  public numberDictionary: Record<string, number> = { '0': 0 };

  private userId: string = sessionStorage.getItem('user_id')!;
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassroomsService
  ) {
    this.roomId = this.route.snapshot.paramMap.get('id')!;
    this.room = this.classroomService.getRoom(this.roomId);
    this.scoringMode = this.classroomService.createScoringMode('fibonacci');
    console.log(this.scoringMode);
  }

  initializeRoom(): void {
    this.configurationWindow = !this.configurationWindow;
    this.addUsers();
    this.setVisualization();
    this.updateRoom();
    this.subscription = this.classroomService
      .allPlayersSelectedCard()
      .subscribe((result: boolean) => {
        this.allPlayersSelected = result;
      });
  }

  setVisualization(): void {
    this.visualization = this.classroomService.userIsPlayer(
      this.roomId,
      this.userId
    )
      ? 'player'
      : 'spectator';
  }

  addUsers(): void {
    this.classroomService.addMockUpUsers(this.roomId);
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

    setTimeout(() => {
      this.classroomService.selectCardForMockUpUsers(
        this.scoringMode,
        this.roomId,
        this.userId,
        this.selectedCard
      );
      this.updateRoom();
    }, 3000);
  }

  public votesCount(): void {
    if (this.room?.users) {
      const players = this.room.users.filter((user) => user.rol === 'player');
      //Creates a key-value pair object that counts the number of votes of each selected card
      this.numberDictionary = players.reduce(
        (accumulator: Record<string, number>, object: UserInRoomInterface) => {
          const value: string = object.cardSelected;
          accumulator[value] = (accumulator[value] || 0) + 1;
          return accumulator;
        },
        {}
      );
    }
  }

  public makeAverageScore(): void {
    if (this.room) {
      const players = this.room.users.filter((user) => user.rol === 'player');
      //Split number into Integer and Decimal Part.
      let averageArray: string[] = (
        Math.round(
          (players.reduce(
            (accumulator, current) =>
              accumulator + parseFloat(current.cardSelected),
            0
          ) /
            players.length) *
            10
        ) / 10
      )
        .toString()
        .split('.');
      //If number has Decimal part, replace '.' with ','.
      if (averageArray[1]) {
        const average = averageArray[0] + ',' + averageArray[1];
        this.averageScore = average;
      }
      //If not, return number.
      this.averageScore = averageArray[0];
    }
  }

  revealCards(): void {
    if (this.userId === this.room?.admin) {
      this.makeAverageScore();
      this.votesCount();
      this.cardResultsRevealed = true;
      return;
    }
    alert('Debes ser administrador para presionar este botón!');
  }

  restartGame(): void {
    if (this.userId === this.room?.admin) {
      this.cardResultsRevealed = false;
      this.classroomService.resetGame(this.roomId);
      this.selectedCard = '';
      this.averageScore = undefined;
      this.numberDictionary = { '0': 0 };
      return;
    }
    alert('Debes ser administrador para presionar este botón!');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.classroomService.deleteRoom(this.roomId);
  }
}
