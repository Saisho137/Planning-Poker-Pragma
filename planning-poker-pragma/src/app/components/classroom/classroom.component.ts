import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClassroomsService } from '../../services/classrooms.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css',
})
export class ClassroomComponent {
  roomId: string = '';
  visualization: string | undefined = '';

  constructor(
    private route: ActivatedRoute,
    private classrooms: ClassroomsService
  ) {}

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id')! !== null
      ? (this.roomId = this.route.snapshot.paramMap.get('id')!)
      : (this.roomId = '0'); //Get Classroom Id from URL
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
