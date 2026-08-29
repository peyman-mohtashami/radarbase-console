import {AfterViewInit, Component, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {form, FormField} from '@angular/forms/signals';
import {
  QuestionTemplateVariable,
} from '../../model/template-field.model';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {TranslatePipe} from '@ngx-translate/core';
import {requiredField} from '../../../../../../../../../shared/utils/signal-form-validators';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
// import {QUESTION_TYPES} from '../../../questionnaire-questions/questionnaire-questions.component';
import {KeyValuePipe} from '@angular/common';

export interface TemplateVariableForm {
  id: string
  name: string
  type: "reservedVariable" | "questionnaire" | "topic"
  reservedVariable: string
  questionId: string
  questionnaireId: string
  method: string
  start: string
  end: string
  function: string
  topic: string
  topicVariable: string
}

@Component({
  selector: 'app-variable-dialog',
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatOption,
    MatSelect,
    MatDialogContent,
    MatDialogTitle,
    FormField,
    TranslatePipe,
    MatError,
    KeyValuePipe,
  ],
  templateUrl: './variable-dialog.component.html'
})
export class VariableDialogComponent implements AfterViewInit {
  private readonly dialogRef = inject(MatDialogRef<VariableDialogComponent>);
  store = inject(QuestionnaireStore);
  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: string;
    entity?: QuestionTemplateVariable;
    // questionIndex: number;
  };

  selectModel = signal<QuestionTemplateVariable | null>(null);
  protected selectForm = form(this.selectModel, (schema) => {
    requiredField(schema);
  })

  model = signal<TemplateVariableForm>({
    id: this.dialogData.entity?.id ?? `v_${crypto.randomUUID()}`,
    name: this.dialogData.entity?.name ?? '',
    type: this.dialogData.entity?.type ?? 'questionnaire',
    reservedVariable: this.dialogData.entity?.reservedVariable ?? '',
    questionId: this.dialogData.entity?.questionId ?? '',
    questionnaireId: this.dialogData.entity?.questionnaireId ?? '',
    method: this.dialogData.entity?.method ?? 'value',
    start: this.dialogData.entity?.start ?? '',
    end: this.dialogData.entity?.end ?? '',
    function: this.dialogData.entity?.function ?? '',
    topic: this.dialogData.entity?.topic ?? '',
    topicVariable: this.dialogData.entity?.topicVariable ?? '',
  });

  protected form = form(this.model, (schema) => {

    requiredField(schema.name);
    requiredField(schema.type);
    requiredField(schema.method, {when: ({valueOf}) => ['topic', 'questionnaire', 'question'].includes(valueOf(schema.type)) });
    requiredField(schema.reservedVariable!, {when: ({valueOf}) => ['reservedVariable'].includes(valueOf(schema.type)) });
    requiredField(schema.questionId!, {when: ({valueOf}) => ['question', 'questionnaire'].includes(valueOf(schema.type)) });
    requiredField(schema.questionnaireId!, {when: ({valueOf}) => ['questionnaire'].includes(valueOf(schema.type)) });
    requiredField(schema.topic!, {when: ({valueOf}) => ['topic'].includes(valueOf(schema.type)) });
    requiredField(schema.topicVariable!, {when: ({valueOf}) => ['topic'].includes(valueOf(schema.type)) });
  });

  RESERVED_VARIABLES = [
    {value: "enrolmentDate", label: "Enrolment Date"},
    {value: "subjectId", label: "Subject ID"},
  ];

  METHODS = [
    {
      value: 'average',
      label: 'Average',
    },
    {
      value: 'sum',
      label: 'Sum',
    },
    {
      value: 'min',
      label: 'Minimum',
    },
    {
      value: 'max',
      label: 'Maximum',
    },
    {
      value: 'first',
      label: 'First',
    },
    {
      value: 'last',
      label: 'Last',
    }
  ]

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  protected save(): void {
    const selectModel = this.selectModel();
    if (this.dialogData.mode === 'insert' && selectModel) {
      this.dialogRef.close(selectModel);
    } else {
      const model = this.model();
      const {id, name, type, reservedVariable, questionId, questionnaireId, method, start, end, function: func, topic, topicVariable} = model;
      const variable: QuestionTemplateVariable = {
        id,
        name,
        type,
        reservedVariable: reservedVariable || undefined,
        questionId: questionId || undefined,
        questionnaireId: questionnaireId || undefined,
        method: method || undefined,
        start: start || undefined,
        end: end || undefined,
        function: func || undefined,
        topic: topic || undefined,
        topicVariable: topicVariable || undefined,
      };

      const entity = this.store.selected()!;
      let updatedVariables = [...(entity.variables ?? []) ];
      switch(this.dialogData.mode){
        case 'add':
        case 'insert':
          updatedVariables = [...updatedVariables, variable];
          break;
        case 'edit':
          updatedVariables = updatedVariables.map(i => i.id === variable.id ? variable : i);
          break;
        case 'delete':
          updatedVariables = updatedVariables.filter(i => i.id !== variable.id);
          break;
      }
      this.store.selected.set({
        ...entity,
        variables: updatedVariables
      });
      this.dialogRef.close(variable);
    }
  }

  // protected readonly QUESTION_TYPES = QUESTION_TYPES;
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
  protected addNewVariableEnabled = false;

  protected createNewVariable() {
    this.selectModel.set(null);
    this.addNewVariableEnabled = true;
  }
}
