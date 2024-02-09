import { Injectable } from '@angular/core';
import { HttpClient, /* HttpHeaders */ } from '@angular/common/http';
import { Observable, /* throwError, */ BehaviorSubject, of } from 'rxjs';
/* import { catchError, map } from 'rxjs/operators'; */
import { UserResponseI } from '../../../interfaces/user-response-interface';
/* import { AllUsersI } from '../../../interfaces/all-users-interface'; */
import { RegisterI } from '../../../interfaces/register-interface';
import { UserI } from '../../../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public userId$: Observable<string | null> = this.userIdSubject.asObservable();
  public username$: Observable<string | null> = this.usernameSubject.asObservable();

  public urlBase = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    this.assignBehaviorSubjectsOnInit();
  }

  public setUserId(userId: string): void {
    this.userIdSubject.next(userId);
  }

  public setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  public assignBehaviorSubjectsOnInit(): void {
    if (sessionStorage.getItem('user_id') && sessionStorage.getItem('user_username')) {
      this.setUserId(sessionStorage.getItem('user_id')!);
      this.setUsername(sessionStorage.getItem('user_username')!);
    }
  }

  public createUser(
  /* username: string,
  email: string,
  password: string */
  ): Observable<RegisterI> {
    /* const url = this.urlBase + '/register_user';

    const headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const body = {
      username,
      email,
      password,
    };

    return this.http.post<RegisterI>(url, body, { headers }); */
    const expectedResponse = {
      userCreated: true,
    };
    return of(expectedResponse);
  }

  public validateUser(
  /* email: string,
  password: string */
  ): Observable<UserResponseI> {
    /* const url = this.urlBase + '/sign_in_user';

    const headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const body = {
      email,
      password,
    };

    return this.http.post<UserResponseI>(url, body, { headers }); */
    const expectedResponse = {
      user: {_id: '1', username: 'saisho', email: 'saisho@example.com', password: 'saisho', __v: 0},
      token: 'abcdefghijk',
    };
    return of(expectedResponse);
  }

  public getAllUsers(): Observable<UserI[]> {
    /* const url = this.urlBase + '/get_users';

    return this.http.get<AllUsersI>(url).pipe(
      map((response) => response.users),
      catchError(() => {
        return throwError(
          () => new Error('Algo salió mal al obtener usuarios.')
        );
      })
    );*/
    const expectedUsers = [
      {_id: '1', username: 'saisho', email: 'saisho@example.com', password: 'saisho', __v: 0},
      {_id: '2', username: 'danna', email: 'danna@example.com', password: 'danna', __v: 0},
      {_id: '3', username: 'daiko', email: 'daiko@example.com', password: 'daiko', __v: 0},
      {_id: '4', username: 'rotten', email: 'rotten@example.com', password: 'rotten', __v: 0},
      {_id: '5', username: 'valen', email: 'valen@example.com', password: 'valen', __v: 0},
      {_id: '6', username: 'toby', email: 'toby@example.com', password: 'toby', __v: 0},
      {_id: '7', username: 'sawsaw', email: 'sawsaw@example.com', password: 'sawsaw', __v: 0},
      {_id: '8', username: 'juanjo', email: 'juanjo@example.com', password: 'juanjo', __v: 0},
    ];
    return of(expectedUsers);
  } 
}
