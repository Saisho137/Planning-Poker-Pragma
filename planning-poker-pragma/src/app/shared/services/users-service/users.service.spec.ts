import { HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { throwError, of, firstValueFrom } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);

    sessionStorage.clear();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //userIdSubject
  it('should set and retrieve userId correctly', () => {});

  //usernameSubject
  it('should set and retrieve username correctly', () => {});

  it('should assign sessionStorage values to pertinent Subjects', () => {
    const userId = '1';
    const username = 'test';

    sessionStorage.setItem('user_id', userId);
    sessionStorage.setItem('user_username', username);

    service.userId$.subscribe((value) => {
      expect(value).toEqual(userId);
    });
    service.username$.subscribe((value) => {
      expect(value).toEqual(username);
    });
  });

  //CreateUser()
  it('should send a POST request to register a user', () => {
    let resp = {};

    const mockUser = {
      username: 'testUser',
      email: 'test@example.com',
      password: 'testPassword',
    };

    const expectedResponse = {
      userCreated: true,
    };

    service
      .createUser(mockUser.username, mockUser.email, mockUser.password)
      .subscribe((response) => {});
  });

  //ValidateUser()
  it('should send a POST request to validate a user', () => {
    let resp = {};
    const mockUser = {
      email: 'test@example.com',
      password: 'testPassword',
    };

    const mockResponse = {
      user: {
        _id: 'xyz',
        username: 'test',
        email: 'test@example.com',
        password: 'testPassword',
        __v: 0,
      },
      token: 'xyz',
    };

    service
      .validateUser(mockUser.email, mockUser.password)
      .subscribe((response) => {});
  });

  //GetAllUsers()
  it('should send a GET request to retrieve all users', () => {
    let resp = {};

    const expectedUsers = [
      {
        _id: '1',
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
        __v: 0,
      },
      {
        _id: '2',
        username: 'user2',
        email: 'user2@example.com',
        password: 'password2',
        __v: 0,
      },
    ];

    // Assert
    service.getAllUsers().subscribe((users) => {});
  });

  it('should handle error when GET request fails to retrieve users', async () => {
    const errorMessage = 'Error fetching users';
    const errorResponse = new Error(errorMessage);

    throwError(() => errorResponse);

    await expect(firstValueFrom(service.getAllUsers())).rejects.toThrow(
      'Algo salió mal al obtener usuarios.'
    );
  });
});
