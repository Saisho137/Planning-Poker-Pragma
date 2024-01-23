import { UsersService } from './users.service';
import { throwError, of, firstValueFrom } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = {
      get: jest.fn(),
      post: jest.fn(),
    };
    service = new UsersService(httpMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //userIdSubject
  it('should set and retrieve userId correctly', () => {
    // Arrange
    const userId = '123';

    // Act
    service.setUserId(userId);

    // Assert
    service.userId$.subscribe((value) => {
      expect(value).toEqual(userId);
    });
  });

  //usernameSubject
  it('should set and retrieve username correctly', () => {
    // Arrange
    const username = 'testUser';

    // Act
    service.setUsername(username);

    // Assert
    service.username$.subscribe((value) => {
      expect(value).toEqual(username);
    });
  });

  //CreateUser()
  it('should send a POST request to register a user', () => {
    // Arrange
    const mockUser = {
      username: 'testUser',
      email: 'test@example.com',
      password: 'testPassword',
    };

    const expectedResponse = {
      userCreated: true,
    };

    // Act
    httpMock.post.mockReturnValueOnce(of(expectedResponse)); //Mocking the http.post method to return an observable

    // Assert
    service
      .createUser(mockUser.username, mockUser.email, mockUser.password)
      .subscribe((response) => {
        // Assert
        expect(httpMock.post).toHaveBeenCalledWith(
          'http://localhost:8080/register_user',
          {
            username: mockUser.username,
            email: mockUser.email,
            password: mockUser.password,
          },
          { headers: expect.anything() }
        );

        expect(response).toEqual(expectedResponse);
      });
  });

  //ValidateUser()
  it('should send a POST request to validate a user', () => {
    // Arrange
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

    // Act
    httpMock.post.mockReturnValueOnce(of(mockResponse)); //Mocking the http.post method to return an observable

    // Assert
    service
      .validateUser(mockUser.email, mockUser.password)
      .subscribe((response) => {
        expect(httpMock.post).toHaveBeenCalledWith(
          'http://localhost:8080/sign_in_user',
          { email: mockUser.email, password: mockUser.password },
          { headers: expect.anything() }
        );
        expect(response.user).toEqual(mockResponse.user);
        expect(response.token).toEqual(mockResponse.token);
      });
  });

  //GetAllUsers()
  it('should send a GET request to retrieve all users', () => {
    // Arrange
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

    // Act
    httpMock.get.mockReturnValueOnce(of({ users: expectedUsers })); //Mocking the http.get method to return an observable

    // Assert
    service.getAllUsers().subscribe((users) => {
      expect(httpMock.get).toHaveBeenCalledWith(
        'http://localhost:8080/get_users'
      );
      expect(users).toEqual(expectedUsers);
    });
  });

  it('should handle error when GET request fails to retrieve users', async () => {
    // Arrange
    const errorMessage = 'Error fetching users';
    const errorResponse = new Error(errorMessage);

    // Act
    httpMock.get.mockReturnValueOnce(throwError(() => errorResponse)); //Mocking the http.get method to return an observable

    // Assert
    await expect(firstValueFrom(service.getAllUsers())).rejects.toThrow(
      'Algo salió mal al obtener usuarios.'
    );
  });
});
