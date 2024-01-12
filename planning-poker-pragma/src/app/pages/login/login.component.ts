import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../shared/services/users-service/users.service';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { LoginFormComponent } from '../../components/templates/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NavbarComponent, LoginFormComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public pragmaIconUrl: string = '../../../../assets/images/pragma.png';
  
  public email: string = '';
  public password: string = '';

  constructor(private userService: UsersService, private router: Router) {
    const token = sessionStorage.getItem('session_token')!;
    if (token) {
      this.router.navigate(['']);
    }
  }

  public validateUser(): void {
    if (!this.email || !this.password) {
      window.alert('You should fill all the fields.');
      return;
    }
    this.userService.validateUser(this.email, this.password);
  }
}
