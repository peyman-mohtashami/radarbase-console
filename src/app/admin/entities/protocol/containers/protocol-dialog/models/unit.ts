export enum Unit {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  TEXT = 'text',
  RANGE = 'range',
  SLIDER = 'slider',
  INFO = 'info',
  AUDIO = 'audio',
  TIMED = 'timed',
  RANGE_INFO = 'range-info',
  RADIO_MATRIX = 'radio-matrix',
  DATEPICKER = 'datepicker',
}

export const QUESTION_TYPES = [
  {name: Unit.AUDIO, label: 'Audio'},
  {name: Unit.INFO, label: 'Info'},
  {name: Unit.RADIO_MATRIX, label: 'Radio-Matrix'},
  {name: Unit.RANGE, label: 'Range'},
  {name: Unit.RANGE_INFO, label: 'Range Info'},
  {name: Unit.SLIDER, label: 'Slider'},
  {name: Unit.TEXT, label: 'Text Input'},
  {name: Unit.TIMED, label: 'Timed'},
  {name: Unit.CHECKBOX, label: 'Checkbox'},
  {name: Unit.RADIO, label: 'Radio'},
  {name: Unit.DATEPICKER, label: 'Date Input'},
];


export const UNITS = [
  { name: 'min', label: 'Minute' },
  { name: 'hour', label: 'Hour' },
  { name: 'day', label: 'Day' },
  { name: 'week', label: 'Week' },
  { name: 'month', label: 'Month' },
  { name: 'year', label: 'Year' },
];
