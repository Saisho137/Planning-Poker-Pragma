import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../shared/services/users-service/users.service';
import {
  nameValidator,
  validateRegex,
} from '../../shared/validators/regex.validator';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { RegisterI } from '../../interfaces/register-interface';
import { UserResponseI } from '../../interfaces/user-response-interface';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterLink,
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {
  public userForm = new FormGroup({
    userUsername: new FormControl('', [Validators.required, validateRegex()]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  public regexMessage: string = '';

  public isLogin: boolean = false;
  public tittle: 'Sing up' | 'Register' = 'Register';

  public pragmaIconUrl: string = '../../../../assets/images/pragma.png';

  private createUserSubscription: Subscription | undefined;
  private validateUserSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private userService: UsersService,
    private location: Location
  ) {
    const token = sessionStorage.getItem('session_token')!;
    if (token) {
      this.router.navigate(['create-classroom']);
    }
    if (this.location.path() === '/login') {
      this.userForm.patchValue({
        userUsername: 'loginDefault',
      });
      this.isLogin = true;
      this.tittle = 'Sing up';
    }
  }

  onUsernameChange(value: string): void {
    this.userForm.patchValue({
      userUsername: value,
    });
    if (this.userForm.get('userUsername')?.errors) {
      switch (this.userForm.get('userUsername')!.errors!['pattern']) {
        case 'regex':
          this.regexMessage = 'Solo se permiten carácteres alfanuméricos!';
          return;
        case 'lenght':
          this.regexMessage = 'El nombre debe tener entre 5 y 20 carácteres!';
          return;
        case 'numbers':
          this.regexMessage = 'No debe haber más de 3 números en el nombre!';
          return;
        case 'spaces':
          this.regexMessage = 'Solo un espacio es permitido!';
          return;
        case 'required':
          this.regexMessage = 'No debes dejar ningún campo vacío!';
          return;
        default:
          this.regexMessage = '';
          return;
      }
    }
    this.regexMessage = '';
  }

  onEmailChange(value: string): void {
    this.userForm.patchValue({
      userEmail: value,
    });
    if (this.userForm.get('userEmail')?.hasError('required')) {
      this.regexMessage = 'No debes dejar ningún campo vacío!';
      return;
    }
    if (this.userForm.get('userEmail')?.hasError('email')) {
      this.regexMessage = 'Debes escribir un email válido!';
      return;
    }
    this.regexMessage = '';
  }

  onPasswordChange(value: string): void {
    this.userForm.patchValue({
      userPassword: value,
    });
    if (this.userForm.get('userPassword')?.hasError('required')) {
      this.regexMessage = 'No debes dejar ningún campo vacío!';
      return;
    }
    if (this.userForm.get('userPassword')?.hasError('minlength')) {
      this.regexMessage = 'La contraseña debe tener al menos 5 carácteres!';
      return;
    }
    this.regexMessage = '';
  }

  public createUser(): void {
    const { userEmail, userPassword, userUsername } = this.userForm.value;

    if (
      userUsername &&
      userEmail &&
      userPassword &&
      nameValidator(userUsername)
    ) {
      this.createUserSubscription = this.userService
        .createUser(userUsername, userEmail, userPassword)
        .subscribe({
          next: (res: RegisterI) => {
            res.userCreated === true
              ? this.validateUser()
              : alert('Something Went Wrong! Try again!');
          },
          error: (err) => {
            alert('Something Went Wrong! Try again!' + err);
            this.router.navigate(['register']);
          },
        });
    }
  }

  public validateUser(): void {
    const { userEmail, userPassword } = this.userForm.value;

    if (userEmail && userPassword) {
      this.validateUserSubscription = this.userService
        .validateUser(userEmail, userPassword)
        .subscribe({
          next: (res: UserResponseI) => {
            const token = res.token;
            sessionStorage.setItem('session_token', token);

            const user = res.user;

            this.userService.setUserId(user._id);
            sessionStorage.setItem('user_id', user._id);

            this.userService.setUsername(user.username);
            sessionStorage.setItem('user_username', user.username);

            this.router.navigate(['create-classroom']);
          },
          error: () => {
            alert('Wrong User!, try Again!');
            this.router.navigate(['login']);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.createUserSubscription) {
      this.createUserSubscription.unsubscribe();
    }
    if (this.validateUserSubscription) {
      this.validateUserSubscription.unsubscribe();
    }
  }
}
