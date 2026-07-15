import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal,
  ViewChild, ViewContainerRef,
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms';
import {Validator as CustomValidator, ValidatorError} from "../../../../../../../../../shared/utils/validators";
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AppQuestion} from '../../../../../models/questionnaire';
import {DialogMode} from '../../../../../../../../base-entities/enums/dialog';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {
  ErrorMessageBoxComponent
} from '../../../../../../../../../shared/components/message-box/error-message-box.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {QUESTION_COMPONENTS, QUESTION_TYPES} from '../../../components/question-type/question-type.registry';
import {TextFormGroupComponent} from '../text-form-group/text-form-group.component';
import {
  ConditionalLogicDialogComponent
} from '../conditional-logic/conditional-logic-dialog/conditional-logic-dialog.component';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {JsonPipe} from '@angular/common';
import {
  OPERATOR_SYMBOLS
} from '../conditional-logic/conditional-logic-operator-selector/conditional-logic-operator-selector.component';

@Component({
  selector: 'app-question-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    ErrorMessageBoxComponent,
    TranslatePipe,
    MatButton,
    MatFormField,
    MatError,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSelect,
    MatOption,
    TextFormGroupComponent,
    MatSlideToggle,
    MatDialogTitle,
    JsonPipe
  ],
  templateUrl: './question-dialog.component.html'
})
export class QuestionDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected dialog = inject(MatDialog);

  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorError = ValidatorError;
  protected selected = false;

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  dialogRef = inject(MatDialogRef<QuestionDialogComponent>);
  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity: AppQuestion;
    questions: AppQuestion[];
    index: number;
    matrixIndex?: number;
  };

  changeEvent = output<Partial<AppQuestion>>();

  form = new FormGroup({
    field_name: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_type: new FormControl({value: '', disabled: true}, {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_label: new FormGroup({}, {validators: [CustomValidator.requiredValidator]}),
    section_header: new FormGroup({}),
    required_field: new FormControl('true', {nonNullable: true}),
    field_note: new FormGroup({}),
    // branching_logic: new FormControl<string>('', {nonNullable: true}),
    conditionalLogic: new FormControl<({operand: string; operator: string; value: string}[][])>([], {nonNullable: true}),
  });

  branchingLogicString = signal('');

  private subscription?: Subscription;

  question?: Partial<AppQuestion>;

  @ViewChild('questionHost', { read: ViewContainerRef })
  host!: ViewContainerRef;

  ngAfterViewInit(): void {
    this.loadQuestionEditor();

    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    setTimeout(() => {
      panel?.classList.add('dialog-enter-active');
    });
  }

  private loadQuestionEditor(): void {
    this.host.clear();
    const componentType = QUESTION_COMPONENTS[this.dialogData.entity.field_type];
    const componentRef = this.host.createComponent(componentType);
    componentRef.instance.type = 'form';
    componentRef.instance.form = this.form;
    componentRef.instance.index = this.dialogData.index;
    componentRef.instance.entity = signal(this.dialogData.entity);
  }

  ngOnInit() {
    this.dialogState.question.set(this.dialogData.entity);
    this.dialogState.questionIndex.set(this.dialogData.index);
    this.question = this.dialogData.entity;

    this.form.controls.field_name.addValidators(this.duplicateValidator);
    this.form.controls.field_name.updateValueAndValidity();

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      // logErrors(this.form);
      // console.log('Class: QuestionDialogComponent, Function: , Line 130 ' , this.form.valid);
      // console.log('Class: QuestionDialogComponent, Function: , Line 140 change' , change);
      // console.log('Class: QuestionDialogComponent, Function: , Line 140 this.question old' , this.question);
      this.question = this.mergeFormValueAndQuestion();
      // this.question = {...this.question, ...change, branching_logic: this.branchingLogicString(), isValid: this.form.valid};
      // console.log('Class: QuestionDialogComponent, Function: , Line 140 this.question new ' , this.question);
      this.changeEvent.emit(this.question);
    });

    if (this.dialogData.entity) {
      this.form.patchValue(this.dialogData.entity);
      this.branchingLogicString.set(this.dialogData.entity?.conditionalLogic?.map((conditionalLogicItems) =>
        conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
      ).join(' or ') ?? '');
    }
  }

  mergeFormValueAndQuestion() {
    const formValue = this.form.getRawValue();

    return {
      ...this.question,
      field_name: formValue.field_name,
      field_type: this.question?.field_type,
      field_label: {...this.question?.field_label, ...formValue.field_label},
      section_header: {...this.question?.section_header, ...formValue.section_header},
      required_field: formValue.required_field,
      field_note: {...this.question?.field_note, ...formValue.field_note},
      conditionalLogic: formValue.conditionalLogic,
      branching_logic: this.branchingLogicString(),
      isValid: this.form.valid
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  protected handleSaveAction(): void {
    this.close();
  }

  close() {
    this.loading.set(false);
    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    panel?.classList.remove('dialog-enter-active');
    panel?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogRef?.close();
      this.dialogState.question.set(null);
      this.dialogState.questionIndex.set(null);
    }, 300);
  }

  private duplicateValidator = (control: AbstractControl) => {
    return (this.dialogData.questions ?? []).find(entity =>
      control.value === entity.field_name && this.dialogData.entity?.field_name !== entity.field_name
    )
      ? {duplicate: true}
      : null;
  }

  protected editConditionalLogic() {
    this.openConditionalLogicDialog();
  }

  openConditionalLogicDialog() {
    const dialogRef = this.dialog.open(ConditionalLogicDialogComponent, {
      id: 'conditional-logic-dialog',
      // data: {id: 'conditional-logic-dialog', entity: {value: this.form.controls.branching_logic?.value}, questions: this.dialogData.questions, selectedIndex: this.dialogData.index, mode: DialogMode.EDIT},
      data: {id: 'conditional-logic-dialog', entity: this.form.controls.conditionalLogic?.value, questions: this.dialogData.questions, selectedIndex: this.dialogData.index, mode: DialogMode.EDIT},
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
            this.form.patchValue({conditionalLogic: value.entity});
          }
          dialogRef.close();
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  protected readonly QUESTION_TYPES = QUESTION_TYPES;
}

// function logErrors(form: FormGroup) {
//   Object.keys(form.controls).forEach(key => {
//     const control = form.get(key);
//
//     if (control instanceof FormGroup) {
//       logErrors(control);
//     } else if (control?.invalid) {
//       console.log(key, control.errors);
//     }
//   });
// }
