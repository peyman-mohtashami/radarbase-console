import {Component, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {QuestionTemplateVariable, TemplateVariableFunction} from '../../model/template-field.model';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {form, FormField} from '@angular/forms/signals';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {AppQuestionnaire} from '../../../../../../models/questionnaire';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';

export interface TemplateVariableForm {
  id: string;
  name: string;
  type: 'question';
  questionId: string;
  questionnaireId: string;
  function: string;//TemplateVariableFunction;
  start: string;
  end: string;
}

// export interface InsertVariableDialogData {
//   questions: {
//     id: string;
//     label: string;
//   }[];
// }

@Component({
  selector: 'app-variable-dialog',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
    MatOption,
    MatSelect,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    FormField
  ],
  templateUrl: './variable-dialog.component.html'
})
export class VariableDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<VariableDialogComponent>);
  dialogState = inject(QuestionnaireDialogStateService);
  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: QuestionTemplateVariable;
  };
  model = signal<TemplateVariableForm>({
    id: this.dialogData.entity?.id ?? `v_${crypto.randomUUID()}`,
    name: this.dialogData.entity?.name ?? '',
    type: 'question',
    questionId: this.dialogData.entity?.questionId ?? '',
    questionnaireId: this.dialogData.entity?.questionnaireId ?? '',
    function: this.dialogData.entity?.function ?? '',
    start: this.dialogData.entity?.start ?? '',
    end: this.dialogData.entity?.end ?? '',
  });

  form = form(this.model);

  protected readonly aggregations: {
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

  protected save(): void {

    const model = this.model();

    if (!model.questionId) return;

    const variable: QuestionTemplateVariable = {
      ...this.dialogData.entity,
      ...model,
    };

    this.dialogState.questionnaire.update(q => {
      return {
        ...q,
        variables: [...(q?.variables ?? []), variable],
      } as AppQuestionnaire;
    });

    this.dialogRef.close();
  }
}
