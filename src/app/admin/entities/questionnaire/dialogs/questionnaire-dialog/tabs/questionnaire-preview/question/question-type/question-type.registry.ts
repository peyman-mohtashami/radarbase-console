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
import {TimedQuestionComponent} from './timed-question/timed-question.component';
import {CalculationQuestionComponent} from './calculation-question/calculation-question.component';
import {QuestionType} from '../../../../../../models/questionnaire';
import {DateQuestionComponent} from './date-question/date-question.component';
import {TimeQuestionComponent} from './time-question/time-question.component';

export const QUESTION_COMPONENTS: Record<string, Type<unknown>> = {
  [QuestionType.DESCRIPTIVE]: DescriptiveQuestionComponent,
  [QuestionType.INFO]: InfoQuestionComponent,
  [QuestionType.RADIO]: RadioQuestionComponent,
  [QuestionType.YESNO]: YesNoQuestionComponent,
  [QuestionType.CHECKBOX]: CheckboxQuestionComponent,
  [QuestionType.SLIDER]: SliderQuestionComponent,
  [QuestionType.RANGE]: RangeQuestionComponent,
  [QuestionType.TEXT]: TextQuestionComponent,
  [QuestionType.NUMBER]: NumberQuestionComponent,
  [QuestionType.DATE]: DateQuestionComponent,
  [QuestionType.TIME]: TimeQuestionComponent,
  [QuestionType.AUDIO]: AudioQuestionComponent,
  [QuestionType.TIMED]: TimedQuestionComponent,
  [QuestionType.CALC]: CalculationQuestionComponent,
}
