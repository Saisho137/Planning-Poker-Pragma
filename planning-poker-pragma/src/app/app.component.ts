import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './shared/services/users-service/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'planning-poker-pragma';

  constructor() {
    if (sessionStorage.getItem('session_token')) {
      console.log('Token: ', sessionStorage.getItem('session_token'));
    }
  }
}
