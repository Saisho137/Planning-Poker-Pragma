import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResponseI } from '../../../interfaces/user-response-interface';
import { AllUsersI } from '../../../interfaces/all-users-interface';
import { RegisterI } from '../../../interfaces/register-interface';
import { UserI } from '../../../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  public createUSer(
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
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error('Algo salió mal al obtener usuarios.')
        );
      })
    );
  }
}
