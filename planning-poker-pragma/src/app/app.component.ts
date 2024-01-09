import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'planning-poker-pragma';

  constructor() {
    if (sessionStorage.getItem('session_token')) {
      console.log('Token: ', sessionStorage.getItem('session_token'));
      console.log(
        'User: ',
        sessionStorage.getItem('user_id'),
        sessionStorage.getItem('user_username')
      );
    }
  }
}
