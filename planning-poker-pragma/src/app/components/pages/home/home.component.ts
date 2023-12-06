import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreateClassroomComponent } from '../../molecules/create-classroom/create-classroom.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CreateClassroomComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username: string | null =
    sessionStorage.getItem('user_username') !== null
      ? sessionStorage.getItem('user_username')
      : null;

  createWindow: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if (sessionStorage.getItem('session_token') === null) {
      this.router.navigate(['login']);
    }
  }

  logOut() {
    sessionStorage.removeItem('session_token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_username');
    this.router.navigate(['login']);
  }

  switchWindow(): void {
    this.createWindow = !this.createWindow;
  }
}
