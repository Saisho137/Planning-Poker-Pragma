/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  signUp, confirmSignUp, type ConfirmSignUpInput,
  autoSignIn, signIn, type SignInInput,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  JWT
} from 'aws-amplify/auth';
import { SignUpParameters } from '../../../interfaces/sign-up-parameters';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  async handleSignUp({ username, nickname, password, email }: SignUpParameters) {
    try {
      const { /* isSignUpComplete, userId, */ nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            nickname
          },
          autoSignIn: true
        },
      });
      return nextStep;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  async handleSignUpConfirmation({username, confirmationCode}: ConfirmSignUpInput) {
    try {
      const { /* isSignUpComplete, */ nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });
      return nextStep;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  async handleAutoSignIn() {
    try {
      const { isSignedIn } = await autoSignIn();
      return isSignedIn;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  async  handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn /* , nextStep */ } = await signIn({ username, password });
      return isSignedIn;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  async handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      alert(error);
    }
  }

  async currentAuthenticatedUser(): Promise<{username: string, userId: string}> {
    try {
      const { username, userId/* , signInDetails */ } = await getCurrentUser();
      const userInfo = {
        username,
        userId
      }
      return userInfo;
    } catch (error) {
      alert(error);
      return {} as any;
    }
  }

  async currentSession(): Promise<JWT> {
    try {
      const { /* accessToken, */ idToken } = (await fetchAuthSession()).tokens ?? {};
      return idToken as JWT;
    } catch (error) {
      alert(error);
      return error as any;
    }
  }
}
