import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { validateRegex } from '../../shared/validators';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-classroom',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-classroom.component.html',
  styleUrl: './create-classroom.component.scss',
})
export class CreateClassroomComponent {
  public classroomName = new FormControl('', [Validators.required, validateRegex()]);

  public pragmaIconUrl: string = '../../../../assets/images/pragma.png';

  public regexMessage: string = '';

  constructor(private router: Router) {
    if (sessionStorage.getItem('session_token') === null) {
      this.router.navigate(['login']);
    }
  }

  onInputChange(value: string): void {
    this.classroomName.patchValue(value); //.reset() method will reload the form.

    if (this.classroomName?.errors) {
      switch (this.classroomName?.errors['pattern']) {
        case 'regex':
          this.regexMessage = 'Solo se permiten carácteres alfanuméricos!';
          return;
        case 'lenght':
          this.regexMessage = 'El nombre debe tener entre 5 y 20 carácteres!';
          return;
        case 'numbers':
          this.regexMessage = 'No debe haber más de 3 números en el nombre!';
          return;
        default:
          this.regexMessage = '';
          return;
      }
    }
    this.regexMessage = '';
  }

  validateName(): void {
    if (this.classroomName.valid) this.goToClassroom();
  }

  goToClassroom(): void {
    this.router.navigate([
      'classroom/' + this.classroomName.value,
    ]);
  }

  logOut() {
    sessionStorage.removeItem('session_token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_username');
    this.router.navigate(['login']);
  }
}
