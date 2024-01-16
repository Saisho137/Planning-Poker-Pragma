import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../shared/services/users-service/users.service';
import { nameValidator } from '../../shared/validators';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink, InputComponent, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public isLogin: boolean = false;
  public tittle: 'Sing up' | 'Register' = 'Register';

  public pragmaIconUrl: string = '../../../../assets/images/pragma.png';

  public username: string = '';
  public email: string = '';
  public password: string = '';

  constructor(private userService: UsersService, private router: Router, private location: Location) {
    const token = sessionStorage.getItem('session_token')!;
    if (token) {
      this.router.navigate(['create-classroom']);
    }
    if (this.location.path() === '/login') {
      this.isLogin = true
      this.tittle = 'Sing up'
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

  temporal(event: any) {
    console.log(event);
  }

  public validateUser(): void {
    this.userService.validateUser(this.email, this.password);
  }
}
