import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { environment } from '../../../../environments/environment';

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
}
