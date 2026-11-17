/**
 * Password validator for login pages
 */
import { NumbColorFunc, StringBoolFunc, StringNumFunc } from 'types/password';

// has number
const hasNumber: StringBoolFunc = (password) => new RegExp(/[0-9]/).test(password);

// has mix of small and capitals
const hasMixed: StringBoolFunc = (password) => new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password);

// has special chars
const hasSpecial: StringBoolFunc = (password) => new RegExp(/[!@#$%^&*?)(+=._-]/).test(password);

// set color based on password strength
export const strengthColor: NumbColorFunc = (level) => {
  if (level < 2) return { label: 'Poor', color: 'error.main' };
  if (level < 3) return { label: 'Weak', color: 'warning.main' };
  if (level < 4) return { label: 'Normal', color: 'warning.dark' };
  if (level < 5) return { label: 'Good', color: 'success.main' };
  if (level < 6) return { label: 'Strong', color: 'success.dark' };
  return { label: 'Poor', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator: StringNumFunc = (password) => {
  let strengths = 0;
  if (password.length > 5) strengths += 1;
  if (password.length > 7) strengths += 1;
  if (hasNumber(password)) strengths += 1;
  if (hasSpecial(password)) strengths += 1;
  if (hasMixed(password)) strengths += 1;
  return strengths;
};

export const generateValidPassword = (minLength = 8, maxLength = 30): string => {
  // 1. Define character pools
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '!@#$%^&*?)(+=._-';
  const allChars = upper + lower + digits + symbols;

  // Cryptographically secure helper to pick a random character from a string
  const getRandomChar = (str: string): string => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return str[array[0] % str.length];
  };

  // 2. Guarantee at least one character from each required group
  const passwordArray = [getRandomChar(upper), getRandomChar(lower), getRandomChar(digits), getRandomChar(symbols)];

  // 3. Determine a secure random length between minLength and maxLength
  const lenArray = new Uint32Array(1);
  crypto.getRandomValues(lenArray);
  const targetLength = (lenArray[0] % (maxLength - minLength + 1)) + minLength;

  // 4. Fill the remaining spots with completely random characters
  while (passwordArray.length < targetLength) {
    passwordArray.push(getRandomChar(allChars));
  }

  // 5. Durstenfeld shuffle (Fisher-Yates) to eliminate predictable positions
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const jArray = new Uint32Array(1);
    crypto.getRandomValues(jArray);
    const j = jArray[0] % (i + 1);

    // Swap elements
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join('');
};
