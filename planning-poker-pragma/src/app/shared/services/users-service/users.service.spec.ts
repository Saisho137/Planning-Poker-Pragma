import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { throwError, firstValueFrom } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpHeaders } from '@angular/common/http';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;


  const headers: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
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
  it('should set and retrieve userId correctly', () => {
    const mockId = '1'

    const spy = jest.spyOn(service.userIdSubject, 'next');
    service.setUserId(mockId)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockId)
  });

  //usernameSubject
  it('should set and retrieve username correctly', () => {
    const mockUsername = 'test'

    const spy = jest.spyOn(service.usernameSubject, 'next');
    service.setUsername(mockUsername)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(mockUsername)
  });

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
  it('should send a POST request and return expected Response from CreateUser()', () => {
    let resp = {};

    const mockUser = {
      username: 'testUser',
      email: 'test@example.com',
      password: 'testPassword',
    };
    const expectedResponse = {
      userCreated: true,
    };

    service.createUser(mockUser.username, mockUser.email, mockUser.password)
    .subscribe((response) => (resp = response));

    const req = httpMock.expectOne('http://localhost:8080/register_user');
    req.flush(expectedResponse);

    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe('http://localhost:8080/register_user');
    expect(req.request.headers).toEqual(headers);
    expect(req.request.body).toEqual(mockUser);
    expect(resp).toBe(expectedResponse);
  });

  //ValidateUser()
  it('should send a POST request and return expected Response from ValidateUser()', () => {
    let resp = {};

    const mockUser = {
      email: 'test@example.com',
      password: 'testPassword',
    };
    const expectedResponse = {
      user: {
        _id: 'xyz',
        username: 'test',
        email: 'test@example.com',
        password: 'testPassword',
        __v: 0,
      },
      token: 'xyz',
    };

    service.validateUser(mockUser.email, mockUser.password)
    .subscribe((response) => (resp = response));

    const req = httpMock.expectOne('http://localhost:8080/sign_in_user');
    req.flush(expectedResponse);

    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe('http://localhost:8080/sign_in_user');
    expect(req.request.headers).toEqual(headers);
    expect(req.request.body).toEqual(mockUser);
    expect(resp).toBe(expectedResponse);
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

    service.getAllUsers().subscribe((users) => (resp = users));

    const req = httpMock.expectOne('http://localhost:8080/get_users');
    req.flush({ users: expectedUsers });

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('http://localhost:8080/get_users');
    expect(resp).toBe(expectedUsers);
  });

  it('should handle error when GET request fails to retrieve users', async () => {
    const errorMessage = 'Error fetching users';
    const errorResponse = new Error(errorMessage);


    const tempMock: any = {get: jest.fn(), post: jest.fn()}
    const tempService = new UsersService(tempMock);

    tempMock.get.mockReturnValueOnce(throwError(() => errorResponse));

    await expect(firstValueFrom(tempService.getAllUsers())).rejects.toThrow('Algo salió mal al obtener usuarios.');
  });
});
