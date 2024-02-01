import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationComponent } from './authentication.component';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/services/users-service/users.service';
import { of, throwError } from 'rxjs';
import { UserResponseI } from '../../interfaces/user-response-interface';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let usersService: UsersService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthenticationComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [UsersService],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;

    window.alert = jest.fn();

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');

    usersService = TestBed.inject(UsersService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Creation tests
  it('should initialize the userForm', () => {
    expect(component.userForm).toBeTruthy();
    expect(component.userForm.get('userUsername')).toBeDefined();
    expect(component.userForm.get('userEmail')).toBeDefined();
    expect(component.userForm.get('userPassword')).toBeDefined();
  });

  it('should initialize isLogin and title correctly when url its /register', () => {
    expect(component.isLogin).toBeFalsy();
    expect(component.title).toEqual('Register');
  });

  //Form tests
  it('should update form value and regexMessage on username change', () => {
    const newValue = 'newUsername';
    component.onUsernameChange(newValue);
    expect(component.userForm.get('userUsername')?.value).toEqual(newValue);
  });

  it('should update form value and regexMessage on email change', () => {
    const newValue = 'newemail@example.com';
    component.onEmailChange(newValue);
    expect(component.userForm.get('userEmail')?.value).toEqual(newValue);
  });

  it('should update form value and regexMessage on password change', () => {
    const newValue = 'newPassword123';
    component.onPasswordChange(newValue);
    expect(component.userForm.get('userPassword')?.value).toEqual(newValue);
  });

  //Method tests
  it('should call createUser method', () => {
    const createUserSpy = jest.spyOn(component, 'createUser');
    component.createUser();
    expect(createUserSpy).toHaveBeenCalled();
  });

  it('should call validateUser method', () => {
    const validateUserSpy = jest.spyOn(component, 'validateUser');
    component.validateUser();
    expect(validateUserSpy).toHaveBeenCalled();
  });

  //createUser()
  it('should call validateUser after successful user creation', () => {
    const userFormValue = {
      userUsername: 'testUser',
      userEmail: 'test@example.com',
      userPassword: 'testPassword',
    };

    component.userForm.setValue(userFormValue);

    const createUserResponse = { userCreated: true };
    jest
      .spyOn(usersService, 'createUser')
      .mockReturnValue(of(createUserResponse));

    const validateUserSpy = jest.spyOn(component, 'validateUser');

    component.createUser();

    expect(usersService.createUser).toHaveBeenCalledWith(
      userFormValue.userUsername,
      userFormValue.userEmail,
      userFormValue.userPassword
    );

    expect(validateUserSpy).toHaveBeenCalled();
  });

  it('should handle error during user creation', () => {
    const userFormValue = {
      userUsername: 'testUser',
      userEmail: 'test@example.com',
      userPassword: 'testPassword',
    };

    component.userForm.setValue(userFormValue);

    const errorResponse = 'Some error message';
    jest
      .spyOn(usersService, 'createUser')
      .mockReturnValue(throwError(() => errorResponse));

    component.createUser();

    expect(usersService.createUser).toHaveBeenCalledWith(
      userFormValue.userUsername,
      userFormValue.userEmail,
      userFormValue.userPassword
    );
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  //ValidateUser()
  it('should navigate to create-classroom after successful validation', () => {
    const userFormValue = {
      userUsername: 'loginDefault',
      userEmail: 'test@example.com',
      userPassword: 'testPassword',
    };

    component.userForm.setValue(userFormValue);

    const mockUserResponse: UserResponseI = {
      token: '1',
      user: {
        _id: '1',
        username: 'loginDefault',
        email: 'test@example.com',
        password: 'testPassword',
        __v: 0
      },
    };

    jest
      .spyOn(usersService, 'validateUser')
      .mockReturnValue(of(mockUserResponse));

    component.validateUser();

    expect(sessionStorage.getItem('session_token')).toEqual('1');
    expect(sessionStorage.getItem('user_id')).toEqual('1');
    expect(sessionStorage.getItem('user_username')).toEqual('loginDefault');
    expect(router.navigate).toHaveBeenCalledWith(['create-classroom']);
  });

  it('should show an alert and navigate to login on validation error', () => {
    const userFormValue = {
      userUsername: 'loginDefault',
      userEmail: 'test@example.com',
      userPassword: 'testPassword',
    };

    component.userForm.setValue(userFormValue);

    const errorResponse = 'Validation error';
    jest
      .spyOn(usersService, 'validateUser')
      .mockReturnValue(throwError(() => errorResponse));
    jest.spyOn(window, 'alert');

    component.validateUser();

    expect(window.alert).toHaveBeenCalledWith('Wrong User!, try Again!');
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
