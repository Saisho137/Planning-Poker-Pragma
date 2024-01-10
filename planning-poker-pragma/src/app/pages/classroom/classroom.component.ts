import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClassroomsService } from '../../services/classrooms.service';
import { CreateVisualizationModeComponent } from '../../components/templates/create-visualization-mode/create-visualization-mode.component';
import { ClassroomInterface } from '../../interfaces/classroom-interface';
import { ScoringModeInterface } from '../../interfaces/scoring-mode-interface';
import { CardMenuComponent } from '../../components/organisms/card-menu/card-menu.component';
import { UsersTableMenuComponent } from '../../components/organisms/users-table-menu/users-table-menu.component';
import { Subscription } from 'rxjs';
import { CardComponent } from '../../components/molecules/card/card.component';
import { InvitationLinkComponent } from '../../components/molecules/invitation-link/invitation-link.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';

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
  public scoringMode: ScoringModeInterface[];

  public selectedCard: string = '';
  public averageScore: string | undefined = undefined;
  public visualization: 'player' | 'spectator' | '' = '';
  public numberDictionary: Record<string, number> = { '0': 0 };

  private userId: string = sessionStorage.getItem('user_id')!;
  private subscription: Subscription | undefined;

  constructor(
    private routeService: ActivatedRoute,
    private classroomService: ClassroomsService
  ) {
    this.roomId = this.routeService.snapshot.paramMap.get('id')!;
    this.room = this.classroomService.getRoom(this.roomId);
    this.scoringMode = this.classroomService.createScoringMode('fibonacci');
  }

  initializeRoom(): void {
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

  isAdminUser(): boolean {
    return this.userId === this.room?.admin;
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

  revealCards(): void {
    if (this.isAdminUser()) {
      this.averageScore = this.classroomService.averageScore(this.roomId);
      this.numberDictionary = this.classroomService.votesCount(this.roomId);
      this.cardResultsRevealed = true;
    } else {
      alert('Debes ser administrador para presionar este botón!');
    }
  }

  restartGame(): void {
    if (this.isAdminUser()) {
      this.cardResultsRevealed = false;
      this.classroomService.resetGame(this.roomId);
      this.selectedCard = '';
      this.averageScore = undefined;
      this.numberDictionary = { '0': 0 };
    } else {
      alert('Debes ser administrador para presionar este botón!');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.classroomService.deleteRoom(this.roomId);
  }
}
