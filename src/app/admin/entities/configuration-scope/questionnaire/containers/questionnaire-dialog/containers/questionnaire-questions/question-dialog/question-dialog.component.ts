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
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {AppQuestion} from '../../../../../models/questionnaire';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {DialogMode} from '../../../../../../../../base-entities/enums/dialog';
// import {QUESTION_TYPES} from '../models/question-types';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {
  DialogTitleComponent
} from '../../../../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  ErrorMessageBoxComponent
} from '../../../../../../../../../shared/components/message-box/error-message-box.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton, MatIconButton} from '@angular/material/button';
// import {TextFormGroupComponent} from '../../../components/text-form-group/text-form-group.component';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {QUESTION_TYPES} from '../models/question-types';
import {QUESTION_COMPONENTS} from '../../../components/question-type/question-type.registry';
import {TextFormGroupComponent} from '../text-form-group/text-form-group.component';
import {
  ConditionalLogicDialogComponent
} from '../conditional-logic/conditional-logic-dialog/conditional-logic-dialog.component';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';

@Component({
  selector: 'app-question-dialog',
  imports: [
    ReactiveFormsModule,
    DialogTitleComponent,
    MatDialogContent,
    ErrorMessageBoxComponent,
    TranslatePipe,
    MatButton,
    // TextFormGroupComponent,
    MatFormField,
    MatError,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSelect,
    MatOption,
    TextFormGroupComponent
  ],
  templateUrl: './question-dialog.component.html'
})
export class QuestionDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected dialog = inject(MatDialog);

  protected readonly DialogMode = DialogMode;
  // protected readonly QUESTION_TYPES = QUESTION_TYPES;
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
    // languages: RadarOption[],
    // language: RadarOption,
  };

  changeEvent = output<Partial<AppQuestion>>();

  form = new FormGroup({
    field_name: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_type: new FormControl({value: '', disabled: true}, {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    // field_label: new FormControl<AppQuestion['field_label']>({}, {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_label: new FormGroup({}, {validators: [CustomValidator.requiredValidator]}),
    // section_header: new FormControl<AppQuestion['section_header']>({}, {nonNullable: true}),
    section_header: new FormGroup({}),
    // text_validation_type_or_show_slider_number: new FormControl('', {nonNullable: true}),
    // text_validation_min: new FormControl('', {nonNullable: true}),
    // text_validation_max: new FormControl('', {nonNullable: true}),
    // field_annotation: new FormControl<AppQuestion['field_annotation']>('', {nonNullable: true}),
    // // select_choices_or_calculations: new FormControl<AppQuestion['select_choices_or_calculations']>([], {nonNullable: true}),
    // range: new FormControl<AppQuestion['range'] | null>(null),
    branching_logic: new FormControl<string>('', {nonNullable: true}),
  });

  private subscription?: Subscription;

  question?: Partial<AppQuestion>;

  // @Input() questionType!: QuestionType;

  // host = viewChild('questionHost', { read: ViewContainerRef });

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
    // componentRef.instance.language = signal(this.dialogData.language);
    // componentRef.instance.languages = this.dialogData.languages;
    componentRef.instance.index = this.dialogData.index;
    componentRef.instance.entity = signal(this.dialogData.entity);
  }

  // save(): void {
  //   console.log(this.form.value);
  // }

  ngOnInit() {
    this.dialogState.selectedQuestion.set(this.dialogData.entity);
    this.dialogState.selectedQuestionIndex.set(this.dialogData.index);
    this.question = this.dialogData.entity;

    this.form.controls.field_name.addValidators(this.duplicateValidator);
    this.form.controls.field_name.updateValueAndValidity();

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      // console.log('Class: QuestionDialogComponent, Function: , Line 140 change' , change);
      // const updated = {...change, range: change.range ?? undefined, valid: this.form.valid && this.checkChoicesValidity(this.entity().select_choices_or_calculations ?? [])};
      // this.dialogActionEvent.emit({action: this.dialogData.mode, entity: updated});
      // console.log('^^^Class: QuestionDialogComponent, Function: , Line 138 this.form.valid' , this.form.valid);
      // console.log('^^^Class: QuestionDialogComponent, Function: , Line 139 this.form.errors' , this.form.errors);
      // console.log('^^^Class: QuestionDialogComponent, Function: , Line 140 this.form.status' , this.form.status);
      logErrors(this.form);
      // this.question = {...this.question, ...change, range: change.range ?? undefined, valid: this.form.valid && this.checkChoicesValidity(this.question?.select_choices_or_calculations ?? [])}
      // this.question = {...this.question, ...change, valid: this.form.valid && this.checkChoicesValidity(this.question?.select_choices_or_calculations ?? [])}
      this.question = {...this.question, ...change, valid: this.form.valid};// && this.checkChoicesValidity(this.question?.select_choices_or_calculations ?? [])}
      this.changeEvent.emit(this.question);//{...change, range: change.range ?? undefined, valid: this.form.valid});// && this.checkChoicesValidity(this.entity().select_choices_or_calculations ?? [])});
      // this.changeEvent.emit({...change, range: change.range ?? undefined, valid: this.form.valid && this.checkChoicesValidity(this.entity().select_choices_or_calculations ?? [])});
    });

    if (this.dialogData.entity) {
      // console.log('Class: QuestionDialogComponent, Function: ngOnInit, Line 155 this.dialogData.entity' , this.dialogData.entity);
      this.form.patchValue(this.dialogData.entity)
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  // ngAfterViewInit() {
  //   const containerId = this.dialogData.id;
  //   const innerContainer = document.getElementById(containerId);
  //   const panel = innerContainer?.closest('.tailwind-slide-panel');
  //   setTimeout(() => {
  //     panel?.classList.add('dialog-enter-active');
  //   });
  // }

  protected handleSaveAction(): void {
    this.close();
    // this.dialogActionEvent.emit({action: this.dialogData.mode, entity: ?});
  }

  close() {
    this.loading.set(false);
    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    panel?.classList.remove('dialog-enter-active');
    panel?.classList.add('dialog-exit-active');

    setTimeout(() => {
      // this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef?.close();
    }, 300);
  }

  // protected onChoicesChange(event: AppQuestionChoice[]) {
  //   this.question = {...this.question, select_choices_or_calculations: event, valid: this.form.valid && this.checkChoicesValidity(event)};
  //   this.changeEvent.emit(this.question);//{select_choices_or_calculations: event, valid: this.form.valid && this.checkChoicesValidity(event)});
  // }
  //
  // checkChoicesValidity(event: AppQuestionChoice[]) {
  //   return event.every(choice => choice.code && choice.code.trim() !== '');
  // }

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
      data: {id: 'conditional-logic-dialog', entity: {value: this.form.controls.branching_logic?.value}, questions: this.dialogData.questions, selectedIndex: this.dialogData.index, mode: DialogMode.EDIT},
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
          // console.log('Class: QuestionFormGroupComponent, Function: , Line 190 value' , value);
          this.form.patchValue({branching_logic: value.entity?.value});
          dialogRef.close();
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  protected readonly QUESTION_TYPES = QUESTION_TYPES;
}

function logErrors(form: FormGroup) {
  Object.keys(form.controls).forEach(key => {
    // console.log('^^^Class: logErrors, Function: , Line 305 key' , key);
    const control = form.get(key);

    if (control instanceof FormGroup) {
      logErrors(control);
    } else if (control?.invalid) {
      // console.log('^^^Class: logErrors, Function: , Line 310 key, control.errors' , key, control.errors);
      console.log(key, control.errors);
    }
  });
}
