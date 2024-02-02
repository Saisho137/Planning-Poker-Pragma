import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

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
    this.printSessionStorage();
  }

  printSessionStorage(): void {
    if (sessionStorage.getItem('session_token')) {
      console.log('Token: ', sessionStorage.getItem('session_token'));
    }
  }
}
