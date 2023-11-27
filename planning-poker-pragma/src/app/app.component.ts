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
  constructor() {
    console.log('Token: ', sessionStorage.getItem('session_token'));
    console.log(
      'User: ',
      sessionStorage.getItem('user_id'),
      sessionStorage.getItem('user_username')
    );
  }
  title = 'planning-poker-pragma';
}
