import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiResponse: any = '';

  constructor(private http: HttpClient, private router: Router) {}

  public validateUser(email: string, password: string): void {
    const url = 'http://localhost:8080/sign_in_user';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
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
        localStorage.setItem('user_id', user._id);
        localStorage.setItem('user_username', user.username);
        localStorage.setItem('user_email', user.email);
        this.router.navigate(['']);
      },
      error: (err) => {
        window.alert("Wrong User!, try Again!");
        this.router.navigate(['login']);
      },
    });
  }
}
