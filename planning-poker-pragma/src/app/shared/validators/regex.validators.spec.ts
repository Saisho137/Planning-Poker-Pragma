import { validateRegex, nameValidator } from './regex.validator';
import { FormControl } from '@angular/forms';

describe('validateRegex', () => {
  it('should return null for valid input', () => {
    const control = new FormControl('ValidInput123');
    const result = validateRegex()(control);
    expect(result).toBeNull();
  });

  it('should return error for invalid regex', () => {
    const control = new FormControl('Invalid@Input');
    const result = validateRegex()(control);
    expect(result).toEqual({ pattern: 'regex' });
  });

  it('should return error for invalid min lenght', () => {
    const control = new FormControl('abc');
    const result = validateRegex()(control);
    expect(result).toEqual({ pattern: 'lenght' });
  });

  it('should return error for invalid max lenght', () => {
    const control = new FormControl('qwertyuiopasdfghjklzx');
    const result = validateRegex()(control);
    expect(result).toEqual({ pattern: 'lenght' });
  });

  it('should return error for invalid numbers lenght size', () => {
    const control = new FormControl('InvalidInput1234');
    const result = validateRegex()(control);
    expect(result).toEqual({ pattern: 'numbers' });
  });

  it('should return error for invalid double space', () => {
    const control = new FormControl('Invalid  Input');
    const result = validateRegex()(control);
    expect(result).toEqual({ pattern: 'spaces' });
  });
});

describe('nameValidator', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  it('should return true for a valid name', () => {
    const result = nameValidator('ValidName123');
    expect(result).toBe(true);
  });

  it('should return false for a name with insufficient length', () => {
    const result = nameValidator('Smol');
    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalledWith(
      'El nombre debe tener entre 5-20 carácteres.'
    );
  });

  it('should return false for a name with excessive length', () => {
    const result = nameValidator('TooLongNameWithMoreThanTwentyCharacters');
    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalledWith(
      'El nombre debe tener entre 5-20 carácteres.'
    );
  });

  it('should return false for a name with more than 3 numbers', () => {
    const result = nameValidator('NameTooMany1234');
    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalledWith(
      'El nombre debe tener máximo 3 números!'
    );
  });

  it('should return false for a name with special characters', () => {
    const result = nameValidator('Name$With@Special!');
    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalledWith(
      'El nombre debe tener entre 5-20 carácteres.'
    );
  });
});
