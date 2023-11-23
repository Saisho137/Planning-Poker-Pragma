import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserInterface } from '../../interfaces/user-interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  userJson: UserInterface =
    localStorage.getItem('user_object') !== null
      ? JSON.parse(localStorage.getItem('user_object')!)
      : {};
      
  username: string =
    this.userJson.username !== null ? this.userJson.username : '';

  constructor(private router: Router) {
    console.log('Token: ', sessionStorage.getItem('session_token'));
    console.log(
      'User: ',
      this.userJson._id,
      this.userJson.username,
      this.userJson.email
    );
  }

  ngOnInit() {
    if (sessionStorage.getItem('session_token') === null) {
      this.router.navigate(['login']);
    }
  }

  logOut() {
    sessionStorage.removeItem('session_token');
    localStorage.removeItem('user_object');
    this.router.navigate(['login']);
  }
}
