import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { nameValidator } from '../../shared/validators';
import { GenericButtonComponent } from '../../components/atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../components/atoms/generic-input/generic-input.component';
@Component({
  selector: 'app-create-classroom',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    GenericButtonComponent,
    GenericInputComponent,
  ],
  templateUrl: './create-classroom.component.html',
  styleUrl: './create-classroom.component.scss',
})
export class CreateClassroomComponent {
  public pragmaIconUrl: string = '../../../../assets/images/pragma.png';

  public classroomName: string = '';

  constructor(private router: Router) {
    if (sessionStorage.getItem('session_token') === null) {
      this.router.navigate(['login']);
    }
  }

  validateName(): void {
    if (nameValidator(this.classroomName)) this.goToClassroom();
  }

  goToClassroom(): void {
    this.router.navigate(['classroom/' + this.classroomName]);
  }

  logOut() {
    sessionStorage.removeItem('session_token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_username');
    this.router.navigate(['login']);
  }
}
