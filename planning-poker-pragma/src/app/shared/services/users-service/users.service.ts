import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResponseInterface } from '../../../interfaces/user-response-interface';
import { RegisterInterface } from '../../../interfaces/register-interface';
import { AllUsersInterface } from '../../../interfaces/all-users-interface';
import { UserInterface } from '../../../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  public createUSer(
    username: string,
    email: string,
    password: string
  ): Observable<RegisterInterface> {
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

    return this.http.post<RegisterInterface>(url, body, { headers });
  }

  public validateUser(
    email: string,
    password: string
  ): Observable<UserResponseInterface> {
    const url: string = 'http://localhost:8080/sign_in_user';

    const headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const body = {
      email: email,
      password: password,
    };

    return this.http.post<UserResponseInterface>(url, body, { headers });
  }

  public getAllUsers(): Observable<UserInterface[]> {
    const url: string = 'http://localhost:8080/get_users';

    return this.http.get<AllUsersInterface>(url).pipe(
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
