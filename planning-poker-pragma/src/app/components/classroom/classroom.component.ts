import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClassroomsService } from '../../services/classrooms.service';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css',
})
export class ClassroomComponent {
  roomId: string = '';

  constructor(
    private route: ActivatedRoute,
    private classrooms: ClassroomsService
  ) {}

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id')! !== null
      ? (this.roomId = this.route.snapshot.paramMap.get('id')!)
      : (this.roomId = '0'); //Get Classroom Id from URL

    console.log(this.classrooms.getRoom(this.roomId))
  }

  validateAdminUser(): boolean {
    console.log(sessionStorage.getItem('user_id'), this.classrooms.getRoom(this.roomId)?.admin)
    if (sessionStorage.getItem('user_id') === this.classrooms.getRoom(this.roomId)?.admin){
      return true;
    }
    return false;
  }


}
