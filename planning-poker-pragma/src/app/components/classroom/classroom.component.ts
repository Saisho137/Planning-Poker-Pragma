import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css',
})
export class ClassroomComponent {
  roomId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id')! !== null ? this.roomId = this.route.snapshot.paramMap.get('id')!
    : this.roomId = '0'; //Get Classroom Id from URL
  }
}
