import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../interfaces/user-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiResponse: any = '';

  constructor(private http: HttpClient, private router: Router) {}

  public validateUser(email: string, password: string): void {
    const url: string = 'http://localhost:8080/sign_in_user';
    const headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    const body = {
      email: email,
      password: password,
    };

    this.http.post(url, body, { headers }).subscribe({
      next: (res) => {
        this.apiResponse = res;

        const token = this.apiResponse.token;
        sessionStorage.setItem('session_token', token);

        const user = this.apiResponse.user;
        const temp: UserInterface = {
          _id: user._id,
          username: user.username,
          email: user.email,
        };
        localStorage.setItem('user_object', JSON.stringify(temp));
        this.router.navigate(['']);
      },
      error: (err) => {
        window.alert('Wrong User!, try Again!' + err);
        this.router.navigate(['login']);
      },
    });
  }

  public createUSer(username: string, email: string, password: string): void {
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

    this.http.post(url, body, { headers }).subscribe({
      next: (res) => {
        this.apiResponse = res;

        this.apiResponse.userCreated === true
          ? this.router.navigate(['login'])
          : window.alert('Something Went Wrong! Try again!');
      },
      error: (err) => {
        window.alert('Something Went Wrong! Try again!' + err);
        this.router.navigate(['register']);
      },
    });
  }
}
