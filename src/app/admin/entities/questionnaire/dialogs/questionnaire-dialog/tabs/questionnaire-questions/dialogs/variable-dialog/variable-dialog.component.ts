import {AfterViewInit, Component, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
// import {QuestionTemplateVariable, TemplateVariableFunction} from '../../model/template-field.model';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {form, FormField} from '@angular/forms/signals';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {AppQuestionnaire} from '../../../../../../models/questionnaire';
import {
  QuestionTemplateVariable,
  TemplateVariableFunction
} from '../../../questionnaire-variables/model/template-field.model';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {TranslatePipe} from '@ngx-translate/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
// import {DialogMode} from '../../../../../../../../shared/enums/dialog';

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

// export interface SelectTemplateVariableForm

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
    FormField,
    TranslatePipe,
    MatError,
    CdkTextareaAutosize
  ],
  templateUrl: './variable-dialog.component.html'
})
export class VariableDialogComponent implements AfterViewInit {
  private readonly dialogRef = inject(MatDialogRef<VariableDialogComponent>);
  dialogState = inject(QuestionnaireDialogStateService);
  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    // mode: DialogMode;
    // entity?: QuestionTemplateVariable;
  };

  selectModel = signal<QuestionTemplateVariable | null>(null);
  selectForm = form(this.selectModel);

  model = signal<TemplateVariableForm>({
    id: `v_${crypto.randomUUID()}`,
    name: '',
    type: 'question',
    questionId: '',
    questionnaireId: '',
    function: '',
    start: '',
    end: '',
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

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  protected save(): void {

    const selectModel = this.selectModel();
    console.log('Class: VariableDialogComponent, Function: save, Line 120 selectModel' , selectModel);

    // if (!model.questionId) return;

    // const variable: QuestionTemplateVariable = {
    //   ...this.dialogData.entity,
    //   ...model,
    // };
    //
    // this.dialogState.questionnaire.update(q => {
    //   return {
    //     ...q,
    //     variables: [...(q?.variables ?? []), variable],
    //   } as AppQuestionnaire;
    // });

    this.dialogRef.close(selectModel);
  }
}
