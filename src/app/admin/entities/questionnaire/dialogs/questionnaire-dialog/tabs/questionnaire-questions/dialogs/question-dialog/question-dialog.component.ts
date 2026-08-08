import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewContainerRef,
  viewChild
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {QUESTION_COMPONENTS, QUESTION_TYPES} from '../../components/question-type/question-type.registry';
import {
  ConditionalLogicDialogComponent
} from '../conditional-logic/conditional-logic-dialog/conditional-logic-dialog.component';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  OPERATOR_SYMBOLS
} from '../conditional-logic/conditional-logic-operator-selector/conditional-logic-operator-selector.component';
import {
  requiredField
} from '../../../../../../../../../shared/utils/signal-form-validators';
import {applyEach, disabled, form, FormField, validate} from '@angular/forms/signals';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';

export interface QuestionnaireQuestionForm {
  field_name: string;
  field_type: string;
  field_label: string;
  section_header: string
  required_field: boolean;
  field_note: string;
  matrix_group_name: string;
  conditionalLogic: {operand: string; operator: string; value: string}[][];
  // select_choices_or_calculations: AppQuestionChoice[];
}

@Component({
  selector: 'app-question-dialog',
  imports: [
    MatDialogContent,
    TranslatePipe,
    MatButton,
    MatFormField,
    MatError,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatDialogTitle,
    FormField,
  ],
  templateUrl: './question-dialog.component.html'
})
export class QuestionDialogComponent implements OnInit, AfterViewInit {
  protected readonly QUESTION_TYPES = QUESTION_TYPES;
  protected readonly DialogMode = DialogMode;

  protected store = inject(QuestionnaireStore);
  protected dialogState = inject(QuestionnaireDialogStateService);
  protected dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<QuestionDialogComponent>);

  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity: AppQuestion;
    questions: AppQuestion[];
    index: number;
    matrixIndex?: number;
  };

  private model = signal<QuestionnaireQuestionForm>({ //this.dialogData.restoredModel ??{
    ...this.dialogData.entity,
    field_name: this.dialogData.entity.field_name ?? '',
    field_type: this.dialogData.entity.field_type ?? '',
    field_label: this.dialogData.entity.field_label[this.dialogState.language().code] ?? '',
    section_header: this.dialogData.entity.section_header?.[this.dialogState.language().code] ?? '',
    required_field: this.dialogData.entity.required_field === 'true',
    field_note: this.dialogData.entity.field_note?.[this.dialogState.language().code] ?? '',
    matrix_group_name: this.dialogData.entity.matrix_group_name ?? '',
    // branching_logic: new FormControl<string>('', {nonNullable: true}),
    conditionalLogic: this.dialogData.entity.conditionalLogic ?? [],
    // select_choices_or_calculations: (this.dialogData.entity.select_choices_or_calculations ?? [])
    //   .map((choice) => withChoiceLanguages(choice, this.dialogState.questionnaire()?.languages ?? []))
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.field_name);
    validate(schema.field_name, ({value}) => {
      const matchedFieldName = this.dialogData.questions?.find((question) => question.field_name === value());
      if (!matchedFieldName) return null;
      if (this.dialogData.entity?.field_name === value()) return null;
      return {
        kind: 'duplicate',
        message: 'SHARED.validatorError.duplicateName',
      };
    });
    requiredField(schema.field_type);
    disabled(schema.field_type);
    requiredField(schema.field_label);
    // applyEach(schema.select_choices_or_calculations, (choice) => {
    //   requiredField(choice.code);
    //   validate(choice.label, ({value}) => {
    //     if (value()[this.dialogState.language().code]?.trim()) return null;
    //     return {
    //       kind: 'required',
    //       message: 'SHARED.validatorError.required',
    //     };
    //   });
    // });
  });

  branchingLogicString = signal('');

  host = viewChild('questionHost', { read: ViewContainerRef });

  // constructor() {
  //   effect(() => {
  //     const model = this.model();
  //
  //     this.dialogState.questionnaire.update(value => {
  //       const questions = value!.questions.map(q => {
  //         if (q.dragId === this.dialogData.entity.dragId) {
  //           return this.toAppQuestion(model);
  //         }
  //         return q;
  //       }) ?? [];
  //       return {
  //         ...value!,
  //         questions: [...questions],
  //       }
  //     })
  //   });
  // }

  ngAfterViewInit() {
    this.loadQuestionEditor();
    animateDialogIn(this.dialogData.id);
  }

  private loadQuestionEditor(): void {
    const host = this.host();
    if (!host) return;

    host.clear();

    const componentType = QUESTION_COMPONENTS[this.dialogData.entity.field_type];
    const componentRef = host.createComponent(componentType);
    componentRef.instance.type = 'form';
    // componentRef.instance.form = this.form;
    // componentRef.instance.form = this.form;
    componentRef.instance.index = this.dialogData.index;
    componentRef.instance.entity = signal(this.dialogData.entity);
  }

  ngOnInit() {
    this.dialogState.question.set(this.dialogData.entity);
    this.dialogState.questionIndex.set(this.dialogData.index);

    if (this.dialogData.entity) {
      this.branchingLogicString.set(this.dialogData.entity?.conditionalLogic?.map((conditionalLogicItems) =>
        conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
      ).join(' or ') ?? '');
    }
  }

  toAppQuestion(model: QuestionnaireQuestionForm): AppQuestion {
    const question = this.dialogData.entity;
    return {
      ...question,
      field_name: model.field_name,
      field_type: model.field_type,
      field_label: {
        ...question.field_label,
        [this.dialogState.language().code]: model.field_label
      },
      section_header: {
        ...question.section_header,
        [this.dialogState.language().code]: model.section_header
      },
      required_field: model.required_field ? 'true' : 'false',
      field_note: {
        ...question.field_note,
        [this.dialogState.language().code]: model.field_note
      },
      conditionalLogic: model.conditionalLogic,
      // select_choices_or_calculations: model.select_choices_or_calculations,
      branching_logic: this.branchingLogicString(),
      isValid: this.form().valid()
    }
  }

  protected handleSaveAction(): void {
    const model = this.model();

    this.dialogState.questionnaire.update(value => {
      const questions = value!.questions.map(q => {
        if (q.dragId === this.dialogData.entity.dragId) {
          return this.toAppQuestion(model);
        }
        return q;
      }) ?? [];
      return {
        ...value!,
        questions: [...questions],
      }
    })

    this.close();
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  protected editConditionalLogic() {
    this.openConditionalLogicDialog();
  }

  openConditionalLogicDialog() {
    const dialogRef = this.dialog.open(ConditionalLogicDialogComponent, {
      id: 'conditional-logic-dialog',
      data: {id: 'conditional-logic-dialog', entity: this.model().conditionalLogic, questions: this.dialogData.questions, selectedIndex: this.dialogData.index, mode: DialogMode.EDIT},
      panelClass: 'tailwind-slide-panel',
      width: '60%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription =
      dialogRef.componentInstance.dialogActionEvent.subscribe(
        (value) => {
          // const branchingLogicString = value.entity?.map((conditionalLogicItems) =>
          //   conditionalLogicItems.map(i => `[${i.operand}]${i.operator}'${i.value}'`).join(' and ')
          // ).join(' or ') ?? '';
          // this.form.patchValue({branching_logic: value.entity?.value});
          if (value.entity && value.action !== DialogMode.CLOSE) {

            this.branchingLogicString.set(value.entity?.map((conditionalLogicItems) =>
              conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
            ).join(' or ') ?? '');
            this.model.update(value => {
              return {
                ...value,
                conditionalLogic: value.conditionalLogic
              };
            })
            // this.form.patchValue({conditionalLogic: value.entity});
          }
          dialogRef.close();
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }
}
