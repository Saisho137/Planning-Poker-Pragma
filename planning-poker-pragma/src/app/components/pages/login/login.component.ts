import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../atoms/generic-input/generic-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, GenericButtonComponent, GenericInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    const token: string | null | undefined =
      sessionStorage.getItem('session_token');
    if (token !== null && token !== undefined) {
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
