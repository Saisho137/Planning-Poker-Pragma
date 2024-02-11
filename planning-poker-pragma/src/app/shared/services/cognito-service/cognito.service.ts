import { Injectable } from '@angular/core';
import {
  signUp,
  confirmSignUp,
  type ConfirmSignUpInput,
  signIn, 
  type SignInInput,
  signOut
} from 'aws-amplify/auth';
import { SignUpParameters } from '../../../interfaces/sign-up-parameters';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  async handleSignUp({ username, nickname, password, email }: SignUpParameters) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            nickname
          },
        },
      });
      console.log(isSignUpComplete, userId, nextStep);
      return nextStep;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  async handleSignUpConfirmation({username, confirmationCode}: ConfirmSignUpInput) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });
      console.log(isSignUpComplete, nextStep);
      return nextStep;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  async  handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log(isSignedIn, nextStep);
      return isSignedIn;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  async handleSignOut() {
    try {
      await signOut();
      console.log('Signed out');
    } catch (error) {
      alert(error);
    }
  }
}
