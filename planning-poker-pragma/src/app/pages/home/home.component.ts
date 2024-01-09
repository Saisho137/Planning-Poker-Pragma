import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CreateClassroomComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  pragmaIconUrl: string = '../../../../assets/images/pragma.png';
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
