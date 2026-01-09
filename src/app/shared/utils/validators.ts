import {Validators} from '@angular/forms';

export const Validator = {
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
  requiredValidator: 'SHARED.validatorHint.requiredValidator',
  emailValidator: 'SHARED.validatorHint.emailValidator',
  stringIdValidator: 'SHARED.validatorHint.stringIdValidator',
  urlValidator: 'SHARED.validatorHint.urlValidator',
  // normalTextValidator: 'SHARED.validatorHint.normalTextValidator',
  normalTextValidator: 'SHARED.validatorHint.normalTextValidator',
  // longTextValidator: 'SHARED.validatorHint.longTextValidator',
  longTextValidator: 'SHARED.validatorHint.longTextValidator',
};

export const ValidatorError = {
  requiredValidator: 'SHARED.validatorError.requiredValidator',
  emailValidator: 'SHARED.validatorError.emailValidator',
  stringIdValidator: 'SHARED.validatorError.stringIdValidator',
  urlValidator: 'SHARED.validatorError.urlValidator',
  normalTextValidator: 'SHARED.validatorError.normalTextValidator',
  // normalTextValidator: 'SHARED.validatorError.requiredValidator',
  // longTextValidator: 'SHARED.validatorError.requiredValidator',
  longTextValidator: 'SHARED.validatorError.longTextValidator',
  duplicateValidator: 'SHARED.validatorError.duplicateValidator',
  dateOutOfMinRange: 'SHARED.validatorError.dateOutOfMinRange',
  dateOutOfMaxRange: 'SHARED.validatorError.dateOutOfMaxRange',
  minValidator: 'SHARED.validatorError.numberOutOfMinRange',
  maxValidator: 'SHARED.validatorError.numberOutOfMaxRange',
};
