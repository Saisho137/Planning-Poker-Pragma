import { UsersService } from './users.service';
import { of } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = {
      post: jest.fn(),
    };
    service = new UsersService(httpMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register a user', () => {
    const mockUser = {
      username: 'testUser',
      email: 'test@example.com',
      password: 'testPassword',
    };
  
    const expectedResponse = {
      userCreated: true,
    };
  
    httpMock.post.mockReturnValueOnce(of(expectedResponse));
  
    service.createUser(mockUser.username, mockUser.email, mockUser.password).subscribe((response) => {
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

  it('should send a POST request to validate a user', () => {
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

    //Mocking the http.post method to return an observable
    httpMock.post.mockReturnValueOnce(of(mockResponse));

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
});
