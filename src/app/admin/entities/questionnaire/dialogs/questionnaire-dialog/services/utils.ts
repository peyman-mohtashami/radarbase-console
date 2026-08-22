import {AppQuestion, AppQuestionConditionalLogicRule, QuestionType} from '../../../models/questionnaire';
import {FieldTree} from '@angular/forms/signals';
import {moveItemInArray} from '@angular/cdk/drag-drop';

export const dragDropStyles = `
    .cdk-drag-preview {
      background: white;
      border-radius: 8px;
      box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%),
      0 8px 10px 1px rgb(0 0 0 / 14%),
      0 3px 14px 2px rgb(0 0 0 / 12%);
    }

    .cdk-drag-placeholder {
      background: #f3f4f6;
      width: 100%;
      border: 2px dashed #9ca3af;
      border-radius: 8px;
      opacity: 0.6;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .cdk-drop-list-dragging .cdk-drag:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    #questions-drop-list.cdk-drop-list-dragging .question-drop-hint {
      background-color: #eeeeee;
    }


    .cdk-drag-dragging {
      cursor: grabbing;
    }
  `;

export function withLanguage(
  value: Record<string, string> | undefined,
  lang: string,
): Record<string, string> {
  return {
    ...value,
    [lang]: value?.[lang] ?? '',
  };
}

export const QUESTION_TYPES = [
  {
    types: [
      {type: QuestionType.DESCRIPTIVE, icon: '', label: 'Descriptive', disabled: false},
      {type: QuestionType.INFO, icon: '', label: 'Info', disabled: true},
    ]
  },
  {
    types: [
      {type: QuestionType.RADIO, icon: '', label: 'Radio', disabled: false},
      {type: QuestionType.DROPDOWN, icon: '', label: 'Dropdown', disabled: true},
      // {type: QuestionType.DROPDOWN_MULTISELECT, icon: '', label: 'Multi-Select Dropdown', disabled: true},
      {type: QuestionType.YESNO, icon: '', label: 'Yes/No', disabled: false},
      {type: QuestionType.CHECKBOX, icon: '', label: 'Checkbox', disabled: false},
      {type: QuestionType.SLIDER, icon: '', label: 'Slider', disabled: false},
      {type: QuestionType.RANGE, icon: '', label: 'Range', disabled: false},
      // {type: QuestionType.RANGE_INFO, icon: '', label: 'RangeInfo', disabled: false},
      {type: QuestionType.RATING, icon: '', label: 'Rating', disabled: true},
      {type: QuestionType.SVG_CHECKBOX, icon: '', label: 'SVG Checkbox', disabled: true},
      // {type: QuestionType.SINGLE_SELECT_MATRIX, icon: '', label: 'Single Select Matrix', disabled: false},
      // {type: QuestionType.MULTISELECT_MATRIX, icon: '', label: 'Multi Select Matrix', disabled: true},
    ]
  },
  {
    types: [
      {type: QuestionType.TEXT, icon: '', label: 'Text', disabled: false},
      {type: QuestionType.NUMBER, icon: '', label: 'Number', disabled: false},
      // {type: QuestionType.NOTE, icon: '', label: 'Note', disabled: false},
      {type: QuestionType.DATE, icon: '', label: 'Date', disabled: false},
      {type: QuestionType.TIME, icon: '', label: 'Time', disabled: false},
      // {type: QuestionType.DURATION, icon: '', label: 'Duration', disabled: true},
      // {type: QuestionType.TEXT_INPUT_MATRIX, icon: '', label: 'Text Input Matrix', disabled: false},
    ]
  },
  {
    types: [
      {type: QuestionType.WEB, icon: '', label: 'Web', disabled: true},
      {type: QuestionType.AUDIO, icon: '', label: 'Audio', disabled: false},
      {type: QuestionType.FILE_UPLOAD, icon: '', label: 'File Upload', disabled: true},
      {type: QuestionType.IMAGE_PICKER, icon: '', label: 'Image Picker', disabled: true},
      {type: QuestionType.SIGNATURE, icon: '', label: 'Signature', disabled: true},
      {type: QuestionType.VIDEO_PICKER, icon: '', label: 'Video Picker', disabled: true},
      {type: QuestionType.SORTING, icon: '', label: 'Sorting', disabled: true},
      {type: QuestionType.TIMED, icon: '', label: 'Timed', disabled: false},
    ]
  },
  {
    types: [
      {type: QuestionType.CALC, icon: '', label: 'Calculation', disabled: false},
    ]
  }
]
export function checkValidation(questions: AppQuestion[]) {
  return questions.map((q, i) => {
    if (validateQuestion(q, i, questions)) {
      return {...q, isValid: true};
    } else {
      return {...q, isValid: false};
    }
  });
}

export function validateQuestion(question: AppQuestion, index: number, questions: AppQuestion[]) {
  // check conditional logic
  const t = question.conditionalLogic?.some(group => {
    return group.some(rule => {
        return !validateConditionalLogic(rule, index, questions);
      }
    )
  });
  console.log('^^^Class: validateQuestion, Function: validateQuestion, Line 206 !t' , !t);
  return !t;
  // check calc
  // check template variables

}


export function validateConditionalLogic(rule: AppQuestionConditionalLogicRule, questionIndex: number, questions: AppQuestion[]) {

  const matchedQuestion = questions.find((q, i) => {
    return (i < questionIndex && q.field_name === rule.operand);
  });
  if (!matchedQuestion) return false;

  if (matchedQuestion.field_type === 'radio' || matchedQuestion.field_type === 'range' || matchedQuestion.field_type === 'checkbox') {
    const matchedChoice = matchedQuestion.select_choices_or_calculations?.find((choice) => choice.code === rule.value)
    if (!matchedChoice) return false;
  }

  if (matchedQuestion.field_type === 'yesno') {
    if (rule.value !== '1' && rule.value !== '0') {
      return false;
    }
  }

  return true;
}


export function minuteToOffset(minute: number) {
  const day = Math.floor(minute / (24 * 60));
  const remainingMinutes = minute % (24 * 60);

  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return {
    day: String(day),
    time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
  };
}

export function offsetToMinute(day: string, time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return Number(day) * 24 * 60 + hours * 60 + minutes;
}

export function moveItemInFormArray<T>(
  arrayField: FieldTree<T[]>,
  fromIndex: number,
  toIndex: number
): void {
  arrayField().value.update(items => {
    const reordered = [...items];
    moveItemInArray(reordered, fromIndex, toIndex);
    return reordered;
  });
}

