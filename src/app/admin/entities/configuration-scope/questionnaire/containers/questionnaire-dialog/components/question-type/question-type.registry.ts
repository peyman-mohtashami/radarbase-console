import { Type } from '@angular/core';
import {RadioQuestionComponent} from './radio-question/radio-question.component';
import {CheckboxQuestionComponent} from './checkbox-question/checkbox-question.component';
import {SliderQuestionComponent} from './slider-question/slider-question.component';
import {RangeQuestionComponent} from './range-question/range-question.component';
import {YesNoQuestionComponent} from './yesno-question/yesno-question.component';
import {InfoQuestionComponent} from './info-question/info-question.component';
import {DescriptiveQuestionComponent} from './descriptive-question/descriptive-question.component';
import {TextQuestionComponent} from './text-question/text-question.component';
import {NumberQuestionComponent} from './number-question/number-question.component';
import {AudioQuestionComponent} from './audio-question/audio-question.component';
import {DurationQuestionComponent} from './duration-question/duration-question.component';
import {TimedQuestionComponent} from './timed-question/timed-question.component';
import {DatetimeQuestionComponent} from './datetime-question/datetime-question.component';
import {
  SingleSelectMatrixQuestionComponent
} from './single-select-matrix-question/single-select-matrix-question.component';

export enum QuestionType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SLIDER = 'slider',
  RANGE = 'range',
  YESNO = 'yesno',
  INFO = 'info',
  DESCRIPTIVE = 'descriptive',
  TEXT = 'text',
  NUMBER = 'number',
  DATETIME = 'datetime',
  DURATION = 'duration',
  TIMED = 'timed',
  AUDIO = 'audio',
  // MATRIX_RADIO = 'matrix-radio',
  SINGLE_SELECT_MATRIX = 'singleSelectMatrix',
  TEXT_INPUT_MATRIX = 'textInputMatrix',
}

export const QUESTION_COMPONENTS: Record<string, Type<any>> = {
  [QuestionType.DESCRIPTIVE]: DescriptiveQuestionComponent,
  [QuestionType.INFO]: InfoQuestionComponent,
  [QuestionType.RADIO]: RadioQuestionComponent,
  [QuestionType.YESNO]: YesNoQuestionComponent,
  [QuestionType.CHECKBOX]: CheckboxQuestionComponent,
  [QuestionType.SLIDER]: SliderQuestionComponent,
  [QuestionType.RANGE]: RangeQuestionComponent,
  [QuestionType.TEXT]: TextQuestionComponent,
  [QuestionType.NUMBER]: NumberQuestionComponent,
  [QuestionType.DATETIME]: DatetimeQuestionComponent,
  [QuestionType.DURATION]: DurationQuestionComponent,
  [QuestionType.AUDIO]: AudioQuestionComponent,
  [QuestionType.TIMED]: TimedQuestionComponent,
  [QuestionType.SINGLE_SELECT_MATRIX]: SingleSelectMatrixQuestionComponent,
  [QuestionType.TEXT_INPUT_MATRIX]: SingleSelectMatrixQuestionComponent,
};

export const QUESTION_TYPES = [
  {
    types: [
      {type: 'descriptive', icon: '', label: 'Descriptive', disabled: false},
      {type: 'info', icon: '', label: 'Info', disabled: false},
    ]
  },
  {
    types: [
      {type: 'radio', icon: '', label: 'Radio', disabled: false},
      {type: 'dropdown', icon: '', label: 'Dropdown', disabled: true},
      // {type: 'dropdownMultiSelect', icon: '', label: 'Multi-Select Dropdown', disabled: true},
      {type: 'yesno', icon: '', label: 'Yes/No', disabled: false},
      {type: 'checkbox', icon: '', label: 'Checkbox', disabled: false},
      {type: 'slider', icon: '', label: 'Slider', disabled: false},
      {type: 'range', icon: '', label: 'Range', disabled: false},
      // {type: 'range-info', icon: '', label: 'RangeInfo', disabled: false},
      {type: 'rating', icon: '', label: 'Rating', disabled: true},
      {type: 'svgCheckbox', icon: '', label: 'SVG Checkbox', disabled: true},
      {type: 'singleSelectMatrix', icon: '', label: 'Single Select Matrix', disabled: false},
      {type: 'multiSelectMatrix', icon: '', label: 'Multi Select Matrix', disabled: true},
    ]
  },
  {
    types: [
      {type: 'text', icon: '', label: 'Text', disabled: false},
      {type: 'number', icon: '', label: 'Number', disabled: false},
      // {type: 'note', icon: '', label: 'Note', disabled: false},
      {type: 'datetime', icon: '', label: 'DateTime', disabled: false},
      {type: 'duration', icon: '', label: 'Duration', disabled: false},
      {type: 'textInputMatrix', icon: '', label: 'Text Input Matrix', disabled: false},
    ]
  },
  {
    types: [
      {type: 'web', icon: '', label: 'Web', disabled: false},
      {type: 'audio', icon: '', label: 'Audio', disabled: false},
      {type: 'fileUpload', icon: '', label: 'File Upload', disabled: true},
      {type: 'imagePicker', icon: '', label: 'Image Picker', disabled: true},
      {type: 'signature', icon: '', label: 'Signature', disabled: true},
      {type: 'videoPicker', icon: '', label: 'Video Picker', disabled: true},
      {type: 'sorting', icon: '', label: 'Sorting', disabled: true},
      {type: 'timed', icon: '', label: 'Timed', disabled: false},
    ]
  },
  {
    types: [
      {type: 'calc', icon: '', label: 'Calculation', disabled: false},
    ]
  }
]
//   {type: 'descriptive', icon: '', label: 'Descriptive', disabled: false},
//   {type: 'info', icon: '', label: 'Info', disabled: false},
//   {type: 'radio', icon: '', label: 'Radio', disabled: false},
//   {type: 'yesno', icon: '', label: 'Yes/No', disabled: false},
//   {type: 'checkbox', icon: '', label: 'Checkbox', disabled: false},
//   {type: 'datetime', icon: '', label: 'DateTime', disabled: false},
//   {type: 'slider', icon: '', label: 'Slider', disabled: false},
//   {type: 'range', icon: '', label: 'Range', disabled: false},
//   {type: 'range-info', icon: '', label: 'RangeInfo', disabled: false},
//   {type: 'timed', icon: '', label: 'Timed', disabled: false},
//   {type: 'audio', icon: '', label: 'Audio', disabled: false},
// ];





