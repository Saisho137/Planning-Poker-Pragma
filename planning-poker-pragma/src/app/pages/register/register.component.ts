import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../shared/services/users-service/users.service';
import { nameValidator } from '../../shared/validators';
import { RegisterFormComponent } from '../../components/templates/register-form/register-form.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, NavbarComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  pragmaIconUrl: string = '../../../../assets/images/pragma.png';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UsersService, private router: Router) {
    const token = sessionStorage.getItem('session_token')!;
    if (token) {
      this.router.navigate(['']);
    }
  }

  public createUser(): void {
    if (!this.email || !this.password || !this.username) {
      window.alert('You should fill all the fields.');
      return;
    }
    if (nameValidator(this.username))
      this.userService.createUSer(this.username, this.email, this.password);
  }
}
