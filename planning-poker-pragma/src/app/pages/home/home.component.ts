import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { ValidatorService } from '../../services/validator.service';
import { GenericButtonComponent } from '../../components/atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../components/atoms/generic-input/generic-input.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CreateClassroomComponent,
    NavbarComponent,
    GenericButtonComponent,
    GenericInputComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pragmaIconUrl: string = '../../../../assets/images/pragma.png';
  partyName: string = '';

  constructor(private router: Router, private validator: ValidatorService) {}

  validateName(): void {
    if (this.validator.validateString(this.partyName)) this.createPary();
  }

  createPary(): void {
    this.router.navigate(['classroom/' + this.partyName]);
  }

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
