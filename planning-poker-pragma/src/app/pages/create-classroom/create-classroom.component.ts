import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { validateRegex } from '../../shared/validators';
import { GenericButtonComponent } from '../../components/atoms/generic-button/generic-button.component';
import { GenericInputComponent } from '../../components/atoms/generic-input/generic-input.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-classroom',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    GenericButtonComponent,
    GenericInputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-classroom.component.html',
  styleUrl: './create-classroom.component.scss',
})
export class CreateClassroomComponent {
  public pragmaIconUrl: string = '../../../../assets/images/pragma.png';
  public regexMessage: string = '';

  public classroomForm = new FormGroup({
    classroomName: new FormControl('', [Validators.required, validateRegex()]),
  });

  constructor(private router: Router) {
    if (sessionStorage.getItem('session_token') === null) {
      this.router.navigate(['login']);
    }
  }

  onInputChange(value: string): void {
    this.classroomForm.patchValue({ classroomName: value }); //Assign atom-input value to reactive form field

    const classroomNameControl = this.classroomForm.get('classroomName');

    if (classroomNameControl?.errors) {
      switch (classroomNameControl.errors['pattern']) {
        case 'regex':
          this.regexMessage = 'Solo se permiten carácteres alfanuméricos!';
          break;
        case 'lenght':
          this.regexMessage = 'El nombre debe tener entre 5 y 20 carácteres!';
          break;
        case 'numbers':
          this.regexMessage = 'No debe haber más de 3 números en el nombre!';
          break;
        default:
          this.regexMessage = '';
          break;
      }
    } else {
      this.regexMessage = '';
    }
  }

  validateName(): void {
    if (this.classroomForm.valid) this.goToClassroom();
  }

  goToClassroom(): void {
    this.router.navigate([
      'classroom/' + this.classroomForm.value.classroomName,
    ]);
  }

  logOut() {
    sessionStorage.removeItem('session_token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_username');
    this.router.navigate(['login']);
  }
}
