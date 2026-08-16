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
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {
  QuestionTemplateVariable,
  TemplateVariableFunction
} from '../../model/template-field.model';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestionnaire} from '../../../../../../models/questionnaire';
import {requiredField} from '../../../../../../../../../shared/utils/signal-form-validators';

export interface TemplateVariableForm {
  id: string;
  name: string;
  type: 'question';
  questionId: string;
  questionnaireId: string;
  method: string;//TemplateVariableFunction;
  start: string;
  end: string;
  function: string;
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
  ],
  templateUrl: './variable-dialog.component.html'
})
export class VariableDialogComponent implements AfterViewInit {
  private readonly dialogRef = inject(MatDialogRef<VariableDialogComponent>);
  dialogState = inject(QuestionnaireDialogStateService);
  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: string;
    entity?: QuestionTemplateVariable;
    questionIndex: number;
  };

  selectModel = signal<QuestionTemplateVariable | null>(null);
  selectForm = form(this.selectModel);

  model = signal<TemplateVariableForm>({
    id: this.dialogData.entity?.id ?? `v_${crypto.randomUUID()}`,
    name: this.dialogData.entity?.name ?? '',
    type: 'question',
    questionId: this.dialogData.entity?.questionId ?? '',
    questionnaireId: this.dialogData.entity?.questionnaireId ?? 'self',
    method: this.dialogData.entity?.function ?? 'value',
    start: this.dialogData.entity?.start ?? '',
    end: this.dialogData.entity?.end ?? '',
    function: this.dialogData.entity?.function ?? '',
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.name);
    requiredField(schema.questionId);
  });

  protected readonly functions: {
    value: TemplateVariableFunction;
    label: string;
  }[] = [
    {
      value: 'value',
      label: 'Value',
    },
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
    },
  ];

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  protected save(): void {
    if (this.dialogData.mode === 'insert') {

      const selectModel = this.selectModel();
      this.dialogRef.close(selectModel);

    } else {

      const model = this.model();
      if (!model.questionId) return;

      const variable: QuestionTemplateVariable = {
        ...this.dialogData.entity,
        ...model,
      };

      this.dialogState.questionnaire.update(q => {
        const variables = [...(q?.variables ?? [])];
        switch(this.dialogData.mode) {
          case 'add':
            variables.push(variable);
            break;
          case 'delete':
            variables.splice(variables.findIndex(v => v.id === variable.id), 1);
            break;
          case 'edit':
            variables[variables.findIndex(v => v.id === variable.id)] = variable;
            break;
        }
        return {
          ...q,
          variables,
        } as AppQuestionnaire;
      });
      this.dialogRef.close(variable);

    }
  }
}
