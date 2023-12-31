import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public validateString(string: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9\s]{5,20}$/;
    const numbers: string = string.replace(/\D/g, '');

    const matchResult = regex.exec(string);

    if (!matchResult) {
      window.alert('El nombre debe tener entre 5-20 carácteres.');
      return false;
    } else if (numbers.length > 3) {
      window.alert('El nombre debe tener máximo 3 números!');
      return false;
    } else if (numbers.length === string.length) {
      window.alert('El nombre no puede estar compuesto únicamente de números!');
      return false;
    }
    return true;
  }
}
