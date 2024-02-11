/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from '../../../../environments/environment';
import { CognitoUSer } from '../../../interfaces/cognito-user';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: environment.cognito,
      },
    });
  }

  signUp(user: CognitoUSer): Promise<any> {
    return Auth.signUp({
      username: user.username,
      password: user.password
    })
  } 
}
