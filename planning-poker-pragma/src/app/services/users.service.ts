import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserResponseInterface } from '../interfaces/user-response-interface';
import { RegisterInterface } from '../interfaces/register-interface';
import { AllUsersInterface } from '../interfaces/all-users-interface';
import { UserInterface } from '../interfaces/user-interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  public async getAllUsers(): Promise<UserInterface[]> {
    const url: string = 'http://localhost:8080/get_users';

    try {
      const response = await firstValueFrom(this.http.get<AllUsersInterface>(url));
      return response.users;
    } catch (err) {
      window.alert('Something went wrong!' + err);
      return [];
    }
  }

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

    this.http.post<UserResponseInterface>(url, body, { headers }).subscribe({
      next: (res: UserResponseInterface) => {
        const token = res.token;
        sessionStorage.setItem('session_token', token);

        const user = res.user;
        sessionStorage.setItem('user_id', user._id);
        sessionStorage.setItem('user_username', user.username);
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

    this.http.post<RegisterInterface>(url, body, { headers }).subscribe({
      next: (res: RegisterInterface) => {
        res.userCreated === true
          ? this.validateUser(email, password)
          : window.alert('Something Went Wrong! Try again!');
      },
      error: (err) => {
        window.alert('Something Went Wrong! Try again!' + err);
        this.router.navigate(['register']);
      },
    });
  }
}
