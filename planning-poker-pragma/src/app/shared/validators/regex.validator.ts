import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validateRegex(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;

    const regexValid = /^[a-zA-Z0-9\s]+$/.test(value);

    const alphaCaracteres = value.replace(/\d/g, '').replace(/\s/g, '');

    const spaceCaracteres = value.replace(/([a-zA-Z0-9])?/g, '');

    const numbersCaracteres = value.replace(/\D/g, '');

    const lengthValid = /^.{5,20}$/.test(value);

    const minLength = alphaCaracteres.length + numbersCaracteres.length + spaceCaracteres.length >= 5;

    if (!regexValid) {
      return { pattern: 'regex' };
    }
    if (!lengthValid || !minLength) {
      return { pattern: 'lenght' };
    }
    if (numbersCaracteres.length > 3) {
      return { pattern: 'numbers' };
    }
    if (spaceCaracteres.length > 1) {
      return { pattern: 'spaces' };
    }
    return null; //successful
  };
}

export function nameValidator(value: string): boolean {
  const regex: RegExp = /^[a-zA-Z0-9\s]{5,20}$/;
  const numbers = value.replace(/\D/g, '');

  const matchResult = regex.test(value);

  if (!matchResult) {
    alert('El nombre debe tener entre 5-20 carácteres.');
    return false;
  }
  if (numbers.length > 3) {
    alert('El nombre debe tener máximo 3 números!');
    return false;
  }
  return true;
}
