import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ValidatorService } from '../../services/validator.service';
import { RegisterFormComponent } from '../../components/templates/register-form/register-form.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, NavbarComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  pragmaIconUrl: string = '../../../../assets/images/pragma.png';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private userService: UsersService,
    private validator: ValidatorService,
    private router: Router
  ) {}

  ngOnInit() {
    const token: string | null | undefined =
      sessionStorage.getItem('session_token');
    if (token !== null && token !== undefined) {
      this.router.navigate(['']);
    }
  }

  public createUser(): void {
    if (!this.email || !this.password || !this.username) {
      window.alert('You should fill all the fields.');
      return;
    }
    if (this.validator.validateString(this.username))
      this.userService.createUSer(this.username, this.email, this.password);
  }
}
