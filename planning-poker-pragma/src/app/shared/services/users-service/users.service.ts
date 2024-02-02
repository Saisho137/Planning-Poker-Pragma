import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResponseI } from '../../../interfaces/user-response-interface';
import { AllUsersI } from '../../../interfaces/all-users-interface';
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

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('user_id') && sessionStorage.getItem('user_username')) {
      this.setUserId(sessionStorage.getItem('user_id')!)
      this.setUsername(sessionStorage.getItem('user_username')!)
    }
  }

  public setUserId(userId: string): void {
    this.userIdSubject.next(userId);
  }

  public setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  public createUser(
    username: string,
    email: string,
    password: string
  ): Observable<RegisterI> {
    const url: string = 'http://localhost:8080/register_user';

    const headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const body = {
      username: username,
      email: email,
      password: password,
    };

    return this.http.post<RegisterI>(url, body, { headers });
  }

  public validateUser(
    email: string,
    password: string
  ): Observable<UserResponseI> {
    const url: string = 'http://localhost:8080/sign_in_user';

    const headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const body = {
      email: email,
      password: password,
    };

    return this.http.post<UserResponseI>(url, body, { headers });
  }

  public getAllUsers(): Observable<UserI[]> {
    const url: string = 'http://localhost:8080/get_users';

    return this.http.get<AllUsersI>(url).pipe(
      map((response) => response.users),
      catchError(() => {
        return throwError(
          () => new Error('Algo salió mal al obtener usuarios.')
        );
      })
    );
  }
}
