import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username: string =
    localStorage.getItem('user_username') !== null
      ? localStorage.getItem('user_username')!
      : '';
  constructor(private router: Router) {
    console.log('Token: ', sessionStorage.getItem('session_token'));
    console.log(
      'User: ',
      localStorage.getItem('user_id'),
      localStorage.getItem('user_username'),
      localStorage.getItem('user_email')
    );
  }

  ngOnInit() {
    if (sessionStorage.getItem('session_token') === null) {
      this.router.navigate(['login']);
    }
  }

  logOut() {
    sessionStorage.removeItem('session_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_email');
    this.router.navigate(['login']);
  }
}
