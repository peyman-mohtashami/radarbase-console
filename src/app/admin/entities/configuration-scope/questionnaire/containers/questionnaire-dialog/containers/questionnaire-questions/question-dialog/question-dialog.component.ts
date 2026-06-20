import {
  AfterViewInit,
  Component,
  // effect,
  inject,
  // input,
  OnDestroy,
  OnInit,
  output,
  signal,
  // untracked
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {TranslatePipe} from "@ngx-translate/core";
// import {ChoicesFormArrayComponent} from "../choices-form-array/choices-form-array.component";
import {Validator as CustomValidator, ValidatorError} from "../../../../../../../../../shared/utils/validators";
import {AnnotationFormGroupComponent} from "../annotation-form-group/annotation-form-group.component";
import {RangeFormGroupComponent} from "../range-form-group/range-form-group.component";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatIcon} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {TextFormGroupComponent} from '../../../components/text-form-group/text-form-group.component';
import {AppQuestion, AppQuestionChoice} from '../../../../../models/questionnaire';
// import {QuestionnaireStateService} from '../../../services/questionnaire-state.service';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
// import {
//   ConditionalLogicDialogComponent, ConditionalLogicItem
// } from '../conditional-logic/conditional-logic-dialog/conditional-logic-dialog.component';
import {DialogMode} from '../../../../../../../../base-entities/enums/dialog';
import {QUESTION_TYPES} from '../models/question-types';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
// import {QuestionChoices} from '../question-choices/question-choices';
// import {BaseConfigService} from '../../../../../../../../base-entities/services/base-config.service';
import {HttpErrorResponse} from '@angular/common/http';
import {
  DialogTitleComponent
} from '../../../../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  ErrorMessageBoxComponent
} from '../../../../../../../../../shared/components/message-box/error-message-box.component';
import {QuestionChoices} from '../question-choices/question-choices';
// import {JsonPipe} from '@angular/common';
// import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  imports: [
    MatIconButton,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    TranslatePipe,
    // ChoicesFormArrayComponent,
    TextFormGroupComponent,
    AnnotationFormGroupComponent,
    RangeFormGroupComponent,
    MatRadioButton,
    MatRadioGroup,
    MatIcon,
    // QuestionChoices,
    DialogTitleComponent,
    MatDialogContent,
    ErrorMessageBoxComponent,
    MatButton,
    QuestionChoices,
    // JsonPipe,
    // JsonPipe,
  ],
})
export class QuestionDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  protected dialog = inject(MatDialog);

  protected readonly DialogMode = DialogMode;
  protected readonly QUESTION_TYPES = QUESTION_TYPES;
  protected readonly ValidatorError = ValidatorError;
  protected selected = false;

  // protected configService!: BaseConfigService;

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  // dialogActionEvent = output<{ action: DialogMode | string, entity?: AppQuestion, valid?: boolean }>();

  dialogRef = inject(MatDialogRef<QuestionDialogComponent>);
  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppQuestion;
    questions: AppQuestion[];
    index: number;
    languages: RadarOption[],
    language: RadarOption,
    // questions = input.required<AppQuestion[]>();
    // entity = input.required<AppQuestion>();
    // index = input.required<number>();
    // languages = input.required<RadarOption[]>();
    // language = input.required<RadarOption>();
  };

  changeEvent = output<Partial<AppQuestion>>();
  // validEvent = output<boolean>();

  form = new FormGroup({
    field_name: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_type: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_label: new FormControl<AppQuestion['field_label']>({}, {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    section_header: new FormControl<AppQuestion['section_header']>({}, {nonNullable: true}),
    text_validation_type_or_show_slider_number: new FormControl('', {nonNullable: true}),
    text_validation_min: new FormControl('', {nonNullable: true}),
    text_validation_max: new FormControl('', {nonNullable: true}),
    field_annotation: new FormControl<AppQuestion['field_annotation']>('', {nonNullable: true}),
    // select_choices_or_calculations: new FormControl<AppQuestion['select_choices_or_calculations']>([], {nonNullable: true}),
    range: new FormControl<AppQuestion['range'] | null>(null),
    branching_logic: new FormControl<string>('', {nonNullable: true}),
  });

  private subscription?: Subscription;

  question?: Partial<AppQuestion>;

  ngOnInit() {
    this.question = this.dialogData.entity;

    this.form.controls.field_name.addValidators(this.duplicateValidator);
    this.form.controls.field_name.updateValueAndValidity();

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      // const updated = {...change, range: change.range ?? undefined, valid: this.form.valid && this.checkChoicesValidity(this.entity().select_choices_or_calculations ?? [])};
      // this.dialogActionEvent.emit({action: this.dialogData.mode, entity: updated});
      console.log('^^^Class: QuestionDialogComponent, Function: , Line 138 this.form.valid' , this.form.valid);
      console.log('^^^Class: QuestionDialogComponent, Function: , Line 139 this.form.errors' , this.form.errors);
      console.log('^^^Class: QuestionDialogComponent, Function: , Line 140 this.form.status' , this.form.status);
      logErrors(this.form);
      this.question = {...this.question, ...change, range: change.range ?? undefined, valid: this.form.valid && this.checkChoicesValidity(this.question?.select_choices_or_calculations ?? [])}
      this.changeEvent.emit(this.question);//{...change, range: change.range ?? undefined, valid: this.form.valid});// && this.checkChoicesValidity(this.entity().select_choices_or_calculations ?? [])});
      // this.changeEvent.emit({...change, range: change.range ?? undefined, valid: this.form.valid && this.checkChoicesValidity(this.entity().select_choices_or_calculations ?? [])});
    });

    if (this.dialogData.entity) {
      this.form.patchValue(this.dialogData.entity)
    }
  }



  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  ngAfterViewInit() {
    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    setTimeout(() => {
      panel?.classList.add('dialog-enter-active');
    });
  }

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

  // protected onItemEvent(event: ConditionalLogicItem[], index: number) {
  //   if (event.length) {
  //     this.conditionalLogicItemsArray[index] = event;
  //   } else {
  //     this.conditionalLogicItemsArray.splice(index, 1);
  //   }
  //
  //   this.resultString = this.conditionalLogicItemsArray.reduce((res, items) => {
  //     const curString = items.reduce((acc, item) => {
  //       if (item.operand && item.operator && item.value) {
  //         return `${acc}${acc ? ' and ' : ''}[${item.operand}]${item.operator}'${item.value}'`;
  //       } else {
  //         return `${acc}`;
  //       }
  //     }, '');
  //     if (curString) {
  //       return `${res}${res ? ' or ' : ''}${curString}`;
  //     } else {
  //       return `${res}`;
  //     }
  //   }, '');
  // }




  // constructor() {
  //   effect(() => {
  //
  //     const index = this.index();
  //     // if (index !== null) {
  //       console.log('Class: QuestionComponent, Function: , Line 87 index' , index);
  //       untracked(() => {
  //         const entity = this.entity();
  //         console.log('Class: QuestionComponent, Function: , Line 91 entity' , entity);
  //         // this.form.setValue(entity);
  //         this.form.setValue({
  //           field_name: entity.field_name,
  //           field_type: entity.field_type,
  //           field_label: entity.field_label ?? {},
  //           section_header: entity.section_header ?? {},
  //           text_validation_type_or_show_slider_number:
  //             entity.text_validation_type_or_show_slider_number ?? '',
  //           text_validation_min: entity.text_validation_min ?? '',
  //           text_validation_max: entity.text_validation_max ?? '',
  //           field_annotation: entity.field_annotation ?? '',
  //           range: entity.range ?? null,
  //           branching_logic: entity.branching_logic ?? '',
  //         });
  //       });
  //       // this.form.patchValue(entity);
  //     // }
  //   });
  //
  //     // this.valid.emit(this.form.valid);
  //   // this.form.statusChanges.subscribe(() => {
  //   //   // this.validatorChange();
  //   // });
  //   //
  //   // this.form.controls.field_type?.valueChanges.subscribe(type => {
  //   //   this.updateFormControls(type);
  //   //   // this.validatorChange();
  //   // });
  // }



  protected onChoicesChange(event: AppQuestionChoice[]) {
    this.question = {...this.question, select_choices_or_calculations: event, valid: this.form.valid && this.checkChoicesValidity(event)};
    this.changeEvent.emit(this.question);//{select_choices_or_calculations: event, valid: this.form.valid && this.checkChoicesValidity(event)});
  }

  checkChoicesValidity(event: AppQuestionChoice[]) {
    return event.every(choice => choice.code && choice.code.trim() !== '');
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
    // const dialogRef = this.dialog.open(ConditionalLogicDialogComponent, {
    //   id: 'conditional-logic-dialog',
    //   data: {id: 'conditional-logic-dialog', entity: {value: this.form.controls.branching_logic?.value}, questions: this.questions(), selectedIndex: this.index(), mode: DialogMode.EDIT},
    //   panelClass: 'tailwind-slide-panel',
    //   width: '70%',
    //   height: '100vh',
    //   position: {top: '0', right: '0'},
    //   hasBackdrop: true,
    //   disableClose: true,
    //   autoFocus: false,
    //   restoreFocus: false
    // });
    //
    // const dialogActionSubscription =
    //   dialogRef.componentInstance.dialogActionEvent.subscribe(
    //     (value) => {
    //       console.log('Class: QuestionFormGroupComponent, Function: , Line 190 value' , value);
    //       this.form.patchValue({branching_logic: value.entity?.value});
    //       dialogRef.close();
    //     }
    //   );
    //
    // dialogRef.afterClosed().subscribe(() => {
    //   dialogActionSubscription.unsubscribe();
    // });
  }
}

function logErrors(form: FormGroup) {
  Object.keys(form.controls).forEach(key => {
    console.log('^^^Class: logErrors, Function: , Line 305 key' , key);
    const control = form.get(key);

    if (control instanceof FormGroup) {
      logErrors(control);
    } else if (control?.invalid) {
      console.log('^^^Class: logErrors, Function: , Line 310 key, control.errors' , key, control.errors);
      console.log(key, control.errors);
    }
  });
}
