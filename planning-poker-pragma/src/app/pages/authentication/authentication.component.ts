/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, NgZone } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../shared/services/users-service/users.service';
import {
  nameValidator,
  /* alidateRegex, */
} from '../../shared/validators/regex.validator';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';
//import { RegisterI } from '../../interfaces/register-interface';
//import { UserResponseI } from '../../interfaces/user-response-interface';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CognitoService } from '../../shared/services/cognito-service/cognito.service';
import { SignUpParameters } from '../../interfaces/sign-up-parameters';

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
    userUsername: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  public verificationCode = new FormControl('', [
    Validators.required
  ]);
  public regexMessage = '';

  public isLogin = false;
  public needConfirmation = false;
  public title: 'Sign in' | 'Register' = 'Register';

  public pragmaIconUrl = '../../../../assets/images/pragma.png';

  public createUserSubscription: Subscription | undefined;
  public validateUserSubscription: Subscription | undefined;

  constructor(
    private userService: UsersService,
    private cognitoService: CognitoService,
    private router: Router,
    private location: Location,
    private ngZone: NgZone
  ) {
    this.navigateToCreateClassroom();
    this.initializeLogin();
  }

  navigateToCreateClassroom(): void {
    if (sessionStorage.getItem('session_token')!)
      this.router.navigate(['create-classroom']);
  }

  initializeLogin(): void {
    if (this.location.path() === '/login') {
      this.userForm.patchValue({ userUsername: 'loginDefault' });
      this.isLogin = true;
      this.title = 'Sign in';
    }
  }

  onUsernameChange(value: string): void {
    this.userForm.patchValue({
      userUsername: value,
    });
    if (this.userForm.get('userUsername')?.errors) {
      switch (this.userForm.get('userUsername')!.errors!['pattern']) {
        case 'lenght':
          this.regexMessage = 'El nombre debe tener entre 5 y 20 carácteres!';
          break;
        case 'numbers':
          this.regexMessage = 'No debe haber más de 3 números en el nombre!';
          break;
        case 'spaces':
          this.regexMessage = 'Solo un espacio es permitido!';
          break;
        default:
          this.regexMessage = 'Solo se permiten carácteres alfanuméricos!';
          break;
      }
    } else {
      this.regexMessage = '';
    }
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

  onCodeChange(value: string): void {
    this.verificationCode.patchValue(value);
  }

  async createUser(): Promise<void> {
    const { userEmail, userPassword, userUsername } = this.userForm.value;

    if (userUsername && userEmail && userPassword && nameValidator(userUsername)) {
      /* this.createUserSubscription = this.userService
        .createUser(/* userUsername, userEmail, userPassword )
        .subscribe({
          next: (res: RegisterI) => {
            if (res.userCreated === true) this.validateUser();
          },
          error: (err) => {
            alert('Something Went Wrong! Try again!' + err);
            this.ngZone.run(() => {
              this.router.navigate(['register']);
            });
          },
        });*/
      const user: SignUpParameters = {
        username: userUsername,
        nickname: userUsername,
        email: userEmail,
        password: userPassword,
      };

      const nextStep: any = await this.cognitoService.handleSignUp(user);
      
      if (nextStep?.signUpStep === 'CONFIRM_SIGN_UP') this.needConfirmation = true;
    }
  }

  async assignUserValues(isSignedIn: boolean) {
      if(isSignedIn) {
        const token = await this.cognitoService.currentSession();
        sessionStorage.setItem('session_token', token.toString());

        const {username, userId} = await this.cognitoService.currentAuthenticatedUser();

        this.userService.setUserId(userId);
        sessionStorage.setItem('user_id', userId);

        this.userService.setUsername(username);
        sessionStorage.setItem('user_username', username);

        this.router.navigate(['create-classroom']);
      } 
  }

  async confirmCreatedUser(): Promise<void> {
    const { userUsername } = this.userForm.value;
    const confirmation = {
        username: userUsername ?? '',
        confirmationCode: this.verificationCode.value ?? '',
    };
    const nextStep: any = await this.cognitoService.handleSignUpConfirmation(confirmation);

    if(nextStep?.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
      const isSignedIn: any = await this.cognitoService.handleAutoSignIn();

      this.assignUserValues(isSignedIn);
    }
  }
  

  async validateUser(): Promise<void> {
    const { userEmail, userPassword } = this.userForm.value;

    if (userEmail && userPassword) {
      const user = {
        username: userEmail,
        password: userPassword
      }
      const isSignedIn: any = await this.cognitoService.handleSignIn(user)
      
      this.assignUserValues(isSignedIn);
      /* this.validateUserSubscription = this.userService
        .validateUser(/* userEmail, userPassword)
        .subscribe({
          next: (res: UserResponseI) => {
            const token = res.token;
            sessionStorage.setItem('session_token', token);

            const user = res.user;

            this.userService.setUserId(user._id);
            sessionStorage.setItem('user_id', user._id);

            this.userService.setUsername(user.username);
            sessionStorage.setItem('user_username', user.username);

            this.ngZone.run(() => {
              this.router.navigate(['create-classroom']);
            });
          },
          error: () => {
            alert('Wrong User!, try Again!');
            this.ngZone.run(() => {
              this.router.navigate(['login']);
            });
          },
        });*/
        
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
