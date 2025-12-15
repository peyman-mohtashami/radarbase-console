import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

// export const requiredValidator = Validators.required;
// export const emailValidator = Validators.email;
// export const stringIdValidator = Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_., -]{2,20}$/)
// // export const stringIdValidator = Validators.pattern(/^(?=.*[a-z])[a-z0-9_-]{2,20}$/)
// export const urlValidator = Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
// export const normalTextValidator = Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_., -]{2,20}$/)
// // export const longTextValidator = Validators.pattern(/^[a-zA-Z0-9_]+(?:\W+[a-zA-Z0-9_]+)*\W*$/)
// export const longTextValidator = Validators.pattern(/^.{1,255}$/)
// export const requiredNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const v = control.value;
//   return typeof v !== 'number' || !Number.isFinite(v) ? { required: true } : null;
// };

export const Validator = {
  // requiredNumber: requiredNumber,
  requiredValidator: Validators.required,
  emailValidator: Validators.email,
  stringIdValidator: Validators.pattern(
    /^(?=.*[a-zA-Z])[a-zA-Z0-9_., -]{2,50}$/
  ),
  urlValidator: Validators.pattern(
    '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
  ),
  // normalTextValidator: Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_., -]{2,20}$/),
  normalTextValidator: Validators.pattern(
    /^(?=.*[a-zA-Z])[a-zA-Z0-9_., -]{2,20}$/
  ),
  longTextValidator: Validators.pattern(/^.{1,255}$/m),
};

export const ValidatorHint = {
  requiredValidator: '',
  emailValidator: 'Enter a valid email.',
  stringIdValidator:
    'Enter a valid string (Uppercase, lowercase and digits, min 2 max 50)',
  urlValidator: 'Enter a valid URL',
  // normalTextValidator:
  //   'Enter a valid string (Uppercase, lowercase and digits, min 2 max 20)',
  normalTextValidator: '',
  // longTextValidator: 'Enter a valid text (Uppercase, lowercase and digits, min 1 max 256)'
  longTextValidator: '',
};

export const ValidatorError = {
  requiredValidator: 'ADMIN.ValidatorError.requiredValidator',
  emailValidator: 'Enter a valid email address.',
  stringIdValidator:
    'Enter a valid string (Uppercase, lowercase and digits, min 2 max 20)',
  urlValidator: 'Enter a valid URL',
  normalTextValidator:
    'Enter a valid string (Uppercase, lowercase and digits, min 2 max 20)',
  // normalTextValidator: '',
  // longTextValidator: 'Enter a valid string (Uppercase, lowercase and digits, min 1 max 256)'
  longTextValidator: '',
  duplicateValidator: 'ADMIN.ValidatorError.duplicateValidator',
};
