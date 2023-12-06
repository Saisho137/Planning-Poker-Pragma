import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { ValidatorService } from '../../../services/validator.service';
import { GenericButtonComponent } from '../../atoms/generic-button/generic-button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, GenericButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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
    this.validator.validateString(this.username)
      ? this.userService.createUSer(this.username, this.email, this.password)
      : null;
  }
}
