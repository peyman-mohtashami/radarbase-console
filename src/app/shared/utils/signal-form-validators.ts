import {pattern, required, PathKind, SchemaPath, SchemaPathRules} from '@angular/forms/signals';

/** Must contain at least one letter; letters/digits/_.,- and space, 2-20 chars. */
export const NORMAL_TEXT_PATTERN = /^(?=.*[a-zA-Z])[a-zA-Z0-9_., -]{2,20}$/;
/** Any characters, 1-255 chars (multiline). */
export const LONG_TEXT_PATTERN = /^.{1,255}$/m;

/** Marks a field as required with the shared error message. */
export function requiredField<TValue, TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
): void {
  required(path, {message: 'SHARED.validatorError.required'});
}

/** Marks a field as required with the shared error message. */
// export function requiredField<TValue, TPathKind extends PathKind>(
//   path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
// ): void {
//   required(path, {message: 'SHARED.validatorError.required'});
// }


/** Applies the shared "normal text" pattern to a string field. */
export function normalTextField<TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
): void {
  pattern(path, NORMAL_TEXT_PATTERN, {
    message: 'SHARED.validatorError.normalTextValidator',
  });
}

/** Applies the shared "long text" pattern to a string field. */
export function longTextField<TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
): void {
  pattern(path, LONG_TEXT_PATTERN, {
    message: 'SHARED.validatorError.longTextValidator',
  });
}
