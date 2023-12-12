import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClassroomsService } from '../../../services/classrooms.service';
import { FormsModule } from '@angular/forms';
import { CreateVisualizationModeComponent } from '../../molecules/create-visualization-mode/create-visualization-mode.component';
import { UserCardComponent } from '../../atoms/user-card/user-card.component';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateVisualizationModeComponent,
    UserCardComponent,
    RouterLink,
  ],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css',
})
export class ClassroomComponent {
  roomId: string = '';
  visualization: 'player' | 'spectator' | '' = '';
  configurationWindow: boolean = true;
  
  constructor(
    private route: ActivatedRoute,
    private classrooms: ClassroomsService
  ) {}

  scoringMode = this.classrooms.createScoringMode('fibonacci')

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id')! !== null
      ? (this.roomId = this.route.snapshot.paramMap.get('id')!)
      : (this.roomId = '0'); //Get Classroom Id from URL
    console.log("COMPONENTE: ", this.scoringMode);
  }

  getUserVisualizationMode(): void {
    this.visualization = this.classrooms.userIsPlayer(
      this.roomId,
      sessionStorage.getItem('user_id')!
    )
      ? 'player'
      : 'spectator';
    console.log(this.classrooms.getRoom(this.roomId));
  }

  validateAdminUser(): boolean {
    if (
      sessionStorage.getItem('user_id') ===
      this.classrooms.getRoom(this.roomId)?.admin
    ) {
      return true;
    }
    return false;
  }
}
