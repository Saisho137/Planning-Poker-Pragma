import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('session_token');
    if (token !== null && token !== undefined) {
      this.router.navigate(['']);
    }
  }

  public createUser(): void {
    if (!this.email || !this.password || !this.username) {
      window.alert('You should fill all the fields.');
      return;
    }
    this.userService.createUSer(this.username, this.email, this.password);
  }
}
