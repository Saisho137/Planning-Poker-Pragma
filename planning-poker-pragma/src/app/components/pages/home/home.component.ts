import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreateClassroomComponent } from '../../molecules/create-classroom/create-classroom.component';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';
import { CreateVisualizationModeComponent } from '../../molecules/create-visualization-mode/create-visualization-mode.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CreateClassroomComponent, GenericButtonComponent, CreateVisualizationModeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username: string | null =
    sessionStorage.getItem('user_username') !== null
      ? sessionStorage.getItem('user_username')
      : null;

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
}
