import {pattern, required, PathKind, SchemaPath, SchemaPathRules, validate, LogicFn} from '@angular/forms/signals';
import {
  QuestionTemplateVariable
} from '../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-variables/model/template-field.model';
import {AppQuestionnaire} from '../../admin/entities/questionnaire/models/questionnaire';
import {untracked} from '@angular/core';

/** Must contain at least one letter; letters/digits/_.,- and space, 2-20 chars. */
export const NORMAL_TEXT_PATTERN = /^(?=.*[a-zA-Z])[a-zA-Z0-9_., -]{2,20}$/;
/** Any characters, 1-255 chars (multiline). */
export const LONG_TEXT_PATTERN = /^.{1,255}$/m;
export const IDENTIFIER_PATTERN = /^[A-Za-z][A-Za-z0-9_]{0,39}$/;

/** Marks a field as required with the shared error message. */
export type RequiredWhen = NonNullable<NonNullable<Parameters<typeof required>[1]>['when']>;

export function requiredField<TValue, TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  options?: { when?: RequiredWhen }
): void {
  required(path, {
    ...options,
    message: 'SHARED.validatorError.required',
  });
}


export function identifierField<TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<string, SchemaPathRules.Supported, TPathKind>,
): void {
  pattern(path, IDENTIFIER_PATTERN, {
    message: 'SHARED.validatorError.identifierValidator',
  });
}


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

export function validateTemplateVariables<TValue, TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  getQuestionnaire: () => AppQuestionnaire | null,
  index?: number
): void {
  validate(path, ({value}) => {
    const questionnaire = untracked(getQuestionnaire);
    const _variables = parseAndValidateTemplateVariables(value() as string, questionnaire, index);
    if (_variables) return null;

    return {
      kind: 'wrongTemplateVariable',
      message: 'SHARED.validatorError.wrongTemplateVariable',
    };
  });
}

export function parseAndValidateTemplateVariables(value: string, questionnaire: AppQuestionnaire | null, index: number | undefined): QuestionTemplateVariable[] | null {
  const matches = [...value.matchAll(/\{\{([^{}]*)}}/g),];

  const stripped = value.replace(/\{\{([^{}]*)}}/g,'',);

  // Detect unmatched {{
  if (stripped.includes('{{') || stripped.includes('}}')) return null;
  const _variables: QuestionTemplateVariable[] = [];

  for (const match of matches) {
    const id = match[1].trim();
    if (!id) return null;

    const variable = questionnaire?.variables?.find(item => item.name === id);
    if (!variable) return null;
    if (!isValidTemplateVariable(variable, questionnaire, index)) return null;
    _variables.push(variable);
  }
  return _variables;
}

export function isValidTemplateVariable(variable: QuestionTemplateVariable, questionnaire: AppQuestionnaire | null, index: number | undefined): boolean {
  if (index === undefined) return true;

  if (variable.type !== 'question') return true;

  const indexOfQuestionInVariable = questionnaire!.questions.findIndex(item => item.field_name === variable.questionId);
  return indexOfQuestionInVariable < index;
}

// export function parseAndValidateTemplateVariables(value: string, field: string, variables: Record<string, QuestionTemplateVariable[]>): QuestionTemplateVariable[] | null {
//   const matches = [...value.matchAll(/\{\{([^{}]*)\}\}/g),];
//
//   const stripped = value.replace(/\{\{([^{}]*)\}\}/g,'',);
//
//   // Detect unmatched {{
//   console.log('Class: parseAndValidateTemplateVariables, Function: parseAndValidateTemplateVariables, Line 134 ' , );
//   if (stripped.includes('{{') || stripped.includes('}}')) return null;
//   console.log('Class: parseAndValidateTemplateVariables, Function: parseAndValidateTemplateVariables, Line 136 ' , );
//
//   const _variables: QuestionTemplateVariable[] = [];
//
//   for (const match of matches) {
//     const id = match[1].trim();
//     console.log('Class: parseAndValidateTemplateVariables, Function: parseAndValidateTemplateVariables, Line 142 ' , );
//     if (!id) return null;
//
//     const variable = variables[field]?.find(item => item.name === id);
//     console.log('Class: parseAndValidateTemplateVariables, Function: parseAndValidateTemplateVariables, Line 146 variable' , variable);
//     if (!variable) return null;
//     console.log('Class: parseAndValidateTemplateVariables, Function: parseAndValidateTemplateVariables, Line 148 ' , );
//     if (!isValidTemplateVariable(variable)) return null;
//     _variables.push(variable);
//   }
//   console.log('Class: parseAndValidateTemplateVariables, Function: parseAndValidateTemplateVariables, Line 152 _variables' , _variables);
//   return _variables;
// }
//
// export function isValidTemplateVariable(variable: QuestionTemplateVariable): boolean {
//   if (!variable.id) return false;
//   return true;
//   // switch (variable.type) {
//   //   case 'reservedVariable':
//   //     return true;
//   // }
//   // if (variable.type !== 'question') return false;
//   // if (!variable.questionId) return false;
//   // if (variable.start && variable.end && variable.start > variable.end) return false;
//   // return true;
// }

export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function validateDuplicate<TValue, TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>, source: any[], item: any, field: string
): void {
  validate(path, ({value}) => {
    const matchedFieldName = source?.find((question) => question[field] === value());
    if (!matchedFieldName) return null;
    if (item?.[field] === value()) return null;
    return {
      kind: 'duplicate',
      message: 'SHARED.validatorError.duplicateName',
    };
  });
}

export function validateMinMax<TValue, TPathKind extends PathKind = PathKind.Root>(
  minPath: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  maxPath: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  type: string,
  options?: { when?: LogicFn<TValue, boolean, TPathKind>; }
) {
  validate(minPath, (context) => {
    if (options?.when && !options.when(context)) {
      return null;
    }

    if (!context.value() || !context.valueOf(maxPath)) return null;
    switch(type) {
      case 'number': {
        const min = Number(context.value());
        const max = Number(context.valueOf(maxPath));

        if (Number.isNaN(min) || Number.isNaN(max)) return null;
        if (min < max) return null;
        break;
      }
      case 'date': {
        const min = new Date(context.value() as Date);
        const max = new Date(context.valueOf(maxPath) as Date);
        if (min.getTime() < max.getTime()) return null;
        break;
      }
      case 'time': {
        const min = timeToMinutes(context.value() as string);
        const max = timeToMinutes(context.valueOf(maxPath) as string);
        if (min < max) return null;
        break;
      }
    }

    return {
      kind: 'minLessThanMax',
      message: 'Min must be less than max',
    };
  });
}

export function validateMaxMin<TValue, TPathKind extends PathKind = PathKind.Root>(
  maxPath: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  minPath: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  type: string,
  options?: { when?: LogicFn<TValue, boolean, TPathKind>; }
) {
  validate(maxPath, (context) => {
    if (options?.when && !options.when(context)) {
      return null;
    }

    if (!context.value() || !context.valueOf(minPath)) return null;

    switch(type) {
      case 'number': {
        const max = Number(context.value());
        const min = Number(context.valueOf(minPath));

        if (Number.isNaN(min) || Number.isNaN(max)) return null;
        if (min < max) return null;
        break;
      }
      case 'date': {
        const max = new Date(context.value() as Date);
        const min = new Date(context.valueOf(minPath) as Date);
        if (min.getTime() < max.getTime()) return null;
        break;
      }
      case 'time': {
        const max = timeToMinutes(context.value() as string);
        const min = timeToMinutes(context.valueOf(minPath) as string);
        if (min < max) return null;
        break;
      }
    }

    return {
      kind: 'maxGreaterThanMin',
      message: 'Max must be greater than min',
    };
  });
}


export function positiveNumber<TValue, TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  options?: { when?: LogicFn<TValue, boolean, TPathKind>; }
) {
  validate(path, (context) => {
    if (options?.when && !options.when(context)) {
      return null;
    }

    const step = Number(context.value());

    if (Number.isNaN(step)) return null;
    if (step > 0) return null;

    return {
      kind: 'rangeStepPositive',
      message: 'Step must be positive',
    };
  });
}

export function validateRegex<TValue, TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  options?: { when?: LogicFn<TValue, boolean, TPathKind>; }
) {
  validate(path, (context) => {
    if (options?.when && !options.when(context)) {
      return null;
    }

    const regex = `${context.value()}`.trim();

    if (!regex) return null;

    try {
      new RegExp(regex);
      return null;
    } catch (error) {
      return {
        kind: 'regexInvalid',
        message: error instanceof Error ? error.message : 'Invalid regular expression',
      };
    }
  });
}



