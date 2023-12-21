import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClassroomsService } from '../../../services/classrooms.service';
import { CreateVisualizationModeComponent } from '../../molecules/create-visualization-mode/create-visualization-mode.component';
import { ClassroomInterface } from '../../../interfaces/classroom-interface';
import { ScoringModeInterface } from '../../../interfaces/scoring-mode-interface';
import { CardMenuComponent } from '../../organisms/card-menu/card-menu.component';
import { UsersTableMenuComponent } from '../../organisms/users-table-menu/users-table-menu.component';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    CommonModule,
    CreateVisualizationModeComponent,
    CardMenuComponent,
    UsersTableMenuComponent,
    RouterLink,
  ],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css',
})
export class ClassroomComponent {
  roomId: string = '';
  room: ClassroomInterface | undefined = this.classrooms.getRoom(this.roomId);
  configurationWindow: boolean = true;
  allPlayersSelected: boolean = false;
  selectedCard: string = '';
  visualization: 'player' | 'spectator' | '' = '';
  scoringMode: ScoringModeInterface[] =
    this.classrooms.createScoringMode('fibonacci');
  userId: string = sessionStorage.getItem('user_id')!;

  constructor(
    private route: ActivatedRoute,
    private classrooms: ClassroomsService
  ) {}

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id')
      ? (this.roomId = this.route.snapshot.paramMap.get('id')!)
      : (this.roomId = '0'); //Get Classroom Id from URL
  }

  ngOnDestroy(): void {
    this.classrooms.deleteRoom(this.roomId);
  }

  selectCard(value: string): void {
    if (this.selectedCard === value) {
      this.classrooms.clearSelectedCard(this.roomId, this.userId);
      this.selectedCard = '';
      this.updateRoom();
      return;
    }
    this.selectedCard = value;

    setTimeout(() => {
      this.classrooms.selectCardForMockUpUsers(
        this.scoringMode,
        this.roomId,
        this.userId,
        this.selectedCard
      );
      this.updateRoom();
    }, 3000);
  }

  initializeRoom(): void {
    this.addUsers();
    this.setVisualization();
    this.updateRoom();
    this.classrooms.allPlayersSelectedCard().subscribe((result: boolean) => {
      this.allPlayersSelected = result;
    });
  }

  isAdminUser(): boolean {
    return this.userId === this.room?.admin;
  }
  addUsers(): void {
    this.classrooms.addMockUpUsers(this.roomId);
  }
  updateRoom(): void {
    this.room = this.classrooms.getRoom(this.roomId);
  }
  setVisualization(): void {
    this.visualization = this.classrooms.userIsPlayer(this.roomId, this.userId)
      ? 'player'
      : 'spectator';
  }
}
