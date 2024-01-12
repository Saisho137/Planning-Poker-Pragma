import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validateRegex(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;

    const regexValid = /^[a-zA-Z0-9\s]+$/.test(value);

    const lengthValid = /^.{5,20}$/.test(value);

    const numbers = value.replace(/\D/g, '');

    if (!regexValid) {
      return { pattern: 'regex' };
    }
    if (!lengthValid) {
      return { pattern: 'lenght' };
    }
    if (numbers.length > 3) {
      return { pattern: 'numbers' };
    }
    return null; //successful
  };
}

export function nameValidator(value: string): boolean {
  const regex: RegExp = /^[a-zA-Z0-9\s]{5,20}$/;
  const numbers: string = value.replace(/\D/g, '');

  const matchResult = regex.test(value);

  if (!matchResult) {
    window.alert('El nombre debe tener entre 5-20 carácteres.');
    return false;
  }
  if (numbers.length > 3) {
    window.alert('El nombre debe tener máximo 3 números!');
    return false;
  }
  if (numbers.length === value.length) {
    window.alert('El nombre no puede estar compuesto únicamente de números!');
    return false;
  }
  return true;
}
