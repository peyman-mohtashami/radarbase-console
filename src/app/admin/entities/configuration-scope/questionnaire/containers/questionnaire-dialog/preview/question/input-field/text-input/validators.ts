export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const URL_REGEX = /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3}|\[([a-fA-F\d:]+)])(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_]*)?$/;

export function isValidNHSNumber(nhsNumber: string): boolean {
  // Remove spaces if present
  nhsNumber = nhsNumber.replace(/\s+/g, '');

  // Ensure it is exactly 10 digits
  if (!/^\d{10}$/.test(nhsNumber)) {
    return false;
  }

  // Convert to an array of digits
  const digits = nhsNumber.split('').map(Number);

  // Apply the modulus 11 algorithm
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  // Calculate the remainder
  const remainder = sum % 11;
  let checkDigit = 11 - remainder;

  // If the check digit is 11, it should be 0
  if (checkDigit === 11) checkDigit = 0;

  // If the check digit is 10, the NHS number is invalid
  if (checkDigit === 10) return false;

  // Compare with the last digit (check digit)
  return checkDigit === digits[9];
}

// Example usage
//   console.log(isValidNHSNumber("123 456 7890")); // false (example, needs a valid number)
//   console.log(isValidNHSNumber("9434765919"));  // true (valid NHS number)
