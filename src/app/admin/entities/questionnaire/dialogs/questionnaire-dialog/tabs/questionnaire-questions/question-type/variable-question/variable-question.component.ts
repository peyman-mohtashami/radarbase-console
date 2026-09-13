import {Component, computed, effect, inject, input, output, signal,} from '@angular/core';
import {
  AppQuestion,
  AppQuestionnaire, AppQuestionnaireLanguage,
} from '../../../../../../models/questionnaire';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  identifierField,
  requiredField,
  validateDuplicate,
} from '../../../../../../../../../shared/utils/signal-form-validators';
import {disabled, form, FormField} from '@angular/forms/signals';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionsStore} from '../../services/questions.store';
import {PreviewStore} from '../../../questionnaire-preview/services/preview.store';
import {QUESTION_TYPES, QUESTION_TYPES_OPTIONS} from '../../../../services/utils';
import {KeyValuePipe} from '@angular/common';
import {
  SelectFormFieldComponent
} from '../../../../../../../../../shared/components/form-fields/select-form-field/select-form-field.component';
import {
  InputFormFieldComponent
} from '../../../../../../../../../shared/components/form-fields/input-form-field/input-form-field.component';

export interface QuestionnaireVariableQuestionForm extends Record<string, unknown> {
  id: string;
  field_name: string;
  field_type: string;
  variable: {
    type: string;
    reserved_var: string;
    topic: string;
    topic_var: string;
    questionnaireId: string;
    questionnaire_question: string;
    start: string;
    end: string;
    method: string;
  };
  isActive: boolean;
}

@Component({
  selector: 'app-variable-question',
  imports: [
    TranslatePipe,
    MatFormField,
    MatError,
    MatIcon,
    MatSelect,
    MatOption,
    MatSlideToggle,
    FormField,
    MatTooltip,
    KeyValuePipe,
    SelectFormFieldComponent,
    InputFormFieldComponent,
  ],
  templateUrl: './variable-question.component.html'
})
export class VariableQuestionComponent {
  protected readonly QUESTION_TYPE_OPTIONS = QUESTION_TYPES_OPTIONS;

  protected store = inject(QuestionnaireStore);
  protected questionsStore = inject(QuestionsStore);

  matrixIndex = input<number>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  valueChange = output<AppQuestion>();

  _questionnaire = this.store.selected()!;
  _lang = this._questionnaire.defaultLanguage.code;

  _question = this.questionsStore.question()!;
  _index = this.questionsStore.index()!;
  _questions = this.store.selected()!.questions;

  previewState = inject(PreviewStore);

  protected model = signal<QuestionnaireVariableQuestionForm>({ //this.dialogData.restoredModel ??{
    ...this._question,
    id: this._question.id ?? crypto.randomUUID(),
    field_name: this._question.field_name ?? '',
    field_type: this._question.field_type ?? '',
    variable: {
      type: this._question.variable?.type ?? '',
      reserved_var: this._question.variable?.reserved_var ?? '',
      topic: this._question.variable?.topic ?? '',
      topic_var: this._question.variable?.topic_var ?? '',
      questionnaireId: this._question.variable?.questionnaireId ?? '',
      questionnaire_question: this._question.variable?.questionnaire_question ?? '',
      start: this._question.variable?.start ?? '',
      end: this._question.variable?.end ?? '',
      method: this._question.variable?.method ?? ''
    },
    isActive: this._question.isActive ?? false,
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.field_name);
    identifierField(schema.field_name);
    validateDuplicate(schema.field_name, this._questions, this._question, 'field_name');

    requiredField(schema.field_type);
    disabled(schema.field_type);
  });

  questionnaireQuestions = computed(() => {
    return this.store.allItems().find(quest => (quest.name === this.form.variable.questionnaireId()?.value()))?.questions;
  });

  protected VARIABLE_TYPES = [
    {value: 'reserved_variables', label: 'Reserved Variables'},
    {value: 'topic', label: 'Topic'},
    {value: 'questionnaire', label: 'Questionnaire'},
  ];

  protected RESERVED_VARIABLES = [
    {value: "enrolmentDate", label: "Enrolment Date"},
    {value: "subjectId", label: "Subject ID"},
  ];

  protected METHODS = [
    {value: 'average', label: 'Average'},
    {value: 'sum', label: 'Sum'},
    {value: 'min', label: 'Minimum'},
    {value: 'max', label: 'Maximum'},
    {value: 'first', label: 'First'},
    {value: 'last', label: 'Last'}
  ];

  protected TOPICS: Record<string, {name: string; type: unknown, doc: string, default?: unknown}[]> = {
    'questionnaire_response': [
      { "name": "time", "type": "double", "doc": "Timestamp in UTC (s) when the questionnaire is started by the subject." },
      { "name": "timeCompleted", "type": "double", "doc": "Timestamp in UTC (s) when the questionnaire is completed by the subject." },
      { "name": "timeNotification", "type": ["null", "double"], "doc": "Timestamp in UTC (s) when the notification to complete the questionnaire is sent.", "default": null },
      { "name": "name", "type": "string", "doc": "Questionnaire names." },
      { "name": "version", "type": "string", "doc": "It reports the questionnaire version stated in the JSON specification." },
      { "name": "answers", "type": {
          "type": "array",
          "items": {
            "name": "Answer",
            "type": "record",
            "doc": "Questionnaire answer.",
            "fields": [
              { "name": "questionId", "type": ["null", "string"], "doc": "Unique identifier for the specific question.", "default": null },
              { "name": "value", "type": ["int", "string", "double"], "doc": "Subject answer." },
              { "name": "startTime", "type": "double", "doc": "Timestamp in UTC (s) when the question is shown." },
              { "name": "endTime", "type": "double", "doc": "Timestamp in UTC (s)  when the question is answered." }
            ]
          }}, "doc": "Answers list. The answers order must follow the questions order."}
    ],
    'questionnaire_app_event': [
      { "name": "time", "type": "double", "doc": "Device timestamp in UTC (s)." },
      { "name": "eventType", "type": {
          "name": "InteractionEventType",
          "doc": "Interaction event types:\n- NOTIFICATION_OPEN: User taps notification to open the app\n- APP_OPEN: User opens the app directly\n- QUESTIONNAIRE_STARTED: User begins a questionnaire\n- QUESTIONNAIRE_FINISHED: User completes and submits a questionnaire\n- QUESTIONNAIRE_CANCELLED: User exits a questionnaire without submitting\n- OTHER: Event that does not match any known category\n- UNKNOWN: Event type could not be determined\n- RECORDING_STARTED: An embedded task/recording started (e.g., audio or sensor)\n- RECORDING_STOPPED: The embedded task/recording stopped normally\n- QR_CODE_SCANNED: A QR code was scanned in the app\n- RECORDING_ERROR: The embedded task/recording failed due to an error\n- HEALTHKIT_STARTED: HealthKit sync/import started\n- HEALTHKIT_FINISHED: HealthKit sync/import finished successfully\n- HEALTHKIT_ERROR: HealthKit sync/import failed\n- HEALTHKIT_RETRY: HealthKit sync/import was retried\n- HEALTHKIT_EXIT: User exited the HealthKit sync flow\n- HEALTHKIT_TIMEOUT: HealthKit sync/import timed out\n- SIGN_UP: User sign-up flow started or completed\n- SIGN_UP_FAIL: User sign-up failed validation or server-side checks\n- SIGN_UP_ERROR: Unexpected error during sign-up\n- PROTOCOL_CHANGE: Study protocol changed on device\n- APP_VERSION_CHANGE: App version changed after an update\n- TIMEZONE_CHANGE: Device timezone changed\n- CONFIG_ERROR: Client configuration error detected\n- APP_RESET: Full app reset performed\n- APP_RESET_PARTIAL: Partial app reset performed\n- NOTIFICATION_CANCELLED: Scheduled notification was cancelled\n- NOTIFICATION_REFRESHED: Notification content or schedule refreshed\n- NOTIFICATION_RESCHEDULED: Notification rescheduled\n- NOTIFICATION_TEST: Test notification event.",
          "type": "enum",
          "symbols": [
            "NOTIFICATION_OPEN",
            "APP_OPEN",
            "QUESTIONNAIRE_STARTED",
            "QUESTIONNAIRE_FINISHED",
            "QUESTIONNAIRE_CANCELLED",
            "OTHER",
            "UNKNOWN",
            "RECORDING_STARTED",
            "RECORDING_STOPPED",
            "QR_CODE_SCANNED",
            "RECORDING_ERROR",
            "HEALTHKIT_STARTED",
            "HEALTHKIT_FINISHED",
            "HEALTHKIT_ERROR",
            "HEALTHKIT_RETRY",
            "HEALTHKIT_EXIT",
            "HEALTHKIT_TIMEOUT",
            "SIGN_UP",
            "SIGN_UP_FAIL",
            "SIGN_UP_ERROR",
            "PROTOCOL_CHANGE",
            "APP_VERSION_CHANGE",
            "TIMEZONE_CHANGE",
            "CONFIG_ERROR",
            "APP_RESET",
            "APP_RESET_PARTIAL",
            "NOTIFICATION_CANCELLED",
            "NOTIFICATION_REFRESHED",
            "NOTIFICATION_RESCHEDULED",
            "NOTIFICATION_TEST"
          ]
        },
        "doc": "Questionnaire app activity usage event type.",
        "default": "UNKNOWN"
      },
      { "name": "questionnaireName", "type": ["null", "string"], "doc": "Name of the questionnaire.", "default": null },
      { "name": "metadata", "type": ["null", { "type": "map", "values": ["null", "string"] }], "doc": "Event metadata.", "default": null }
    ],
    'connect_fitbit_skin_temperature': [
      { "name": "time", "type": "double", "doc": "Device timestamp in UTC (s)." },
      { "name": "timeReceived", "type": "double", "doc": "Time that the data was received from the Fitbit API (seconds since the Unix Epoch)." },
      { "name": "relativeTemperature", "type": "float", "doc": "The user's average temperature during a period of sleep. It is displayed to the user as a delta from their baseline temperature in degrees Celsius."},
      { "name": "logType", "type": { "name": "FitbitSkinTemperatureLogType", "type": "enum", "symbols": ["DEDICATED_TEMP_SENSOR", "OTHER_SENSORS", "UNKNOWN"], "doc": "The type of skin temperature log created."}, "doc": "The type of skin temperature log created.", "default": "UNKNOWN"}
    ],
    'connect_fitbit_breathing_rate': [
      { "name": "time", "type": "double", "doc": "Device timestamp in UTC (s)." },
      { "name": "timeReceived", "type": "double", "doc": "Time that the data was received from the Fitbit API (seconds since the Unix Epoch)." },
      { "name": "lightSleep", "type": "float", "doc": "Average number of breaths taken per minute when the user was in light sleep."},
      { "name": "deepSleep", "type": "float", "doc": "Average number of breaths taken per minute when the user was in deep sleep."},
      { "name": "remSleep", "type": "float", "doc": "Average number of breaths taken per minute when the user was in rem sleep."},
      { "name": "fullSleep", "type": "float", "doc": "Average number of breaths taken per minute throughout the entire period of sleep which you can compare to the sleep stage-specific measurements."}
    ],
  };

  constructor() {
    effect(() => {
      this.valueChange.emit(this.toAppQuestion(this.form().value()));
    });
  }

  toAppQuestion(model: QuestionnaireVariableQuestionForm): AppQuestion {
    const entity = this._question;
    return this.normalizeQuestion({
      ...entity,
      ...model,
      isValid: this.form().valid()
    });
  }

  normalizeQuestion(question: AppQuestion) {
    const updatedQuestion: AppQuestion = {
      id: question.id,
      field_name: question.field_name,
      field_type: question.field_type,
      field_label: {},
      required_field: true,
      conditionalLogic: question.conditionalLogic?.length ? question.conditionalLogic : undefined,
      branching_logic: question.branching_logic || undefined,
      variable: question.variable,
      isActive: question.isActive,
      isValid: question.isValid,
    }
    return updatedQuestion;
  }
}
