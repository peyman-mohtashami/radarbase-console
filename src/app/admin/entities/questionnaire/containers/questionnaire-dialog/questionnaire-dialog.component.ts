import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray, FormControl,
  FormGroup, FormsModule, ReactiveFormsModule,
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {Validator, ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {HttpErrorResponse} from "@angular/common/http";
import {toSignal} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs/operators";
import {DialogMode} from "../../../../enums/dialog";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {AppQuestion, AppQuestionnaire, DEFAULT_LANGUAGE, ISO_LANGUAGES} from "../../models/questionnaire";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/dialog/dialog-body-description/dialog-body-description.component";
import {
  DialogAction,
  DialogActionsComponent
} from "../../../../components/dialog/dialog-actions/dialog-actions.component";
import {
  MatSelectAutocompleteComponent
} from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {RadarOption} from "../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {QuestionsFormArrayComponent} from './components/questions-form-array/questions-form-array.component';
import {Observable} from 'rxjs';

export interface RadarCondition {
  conditionField: string;
  conditionOperator: string;
  conditionValue: string;
}
@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    DialogBodyDescriptionComponent,
    DialogActionsComponent,
    MatSelectAutocompleteComponent,
    QuestionsFormArrayComponent,
    EditorComponent,
    FormsModule,
    MatDialogTitle,
    MatIconButton,
    MatTooltip,
  ]
})
export class QuestionnaireDialogComponent implements OnInit, AfterViewInit {
  private configService = inject(QuestionnaireConfigService);
  private dialogRef = inject(MatDialogRef<QuestionnaireDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppQuestionnaire;
    questionnaireFullList: Observable<AppQuestionnaire[]>;
  };

  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;
  protected readonly DEFAULT_LANG = DEFAULT_LANGUAGE;

  editorOptions = {
    language: 'json',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: 'on'
  };
  protected showCode = false;

  updatedValue?: AppQuestionnaire;
  updatedCode = '';

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    name: new FormControl<string>('', {validators: [Validator.requiredValidator, Validator.stringIdValidator], nonNullable: true}),
    languages: new FormControl<RadarOption[]>([this.DEFAULT_LANG], {nonNullable: true}),
    questions: new FormControl<AppQuestion[]>([], {nonNullable: true}),
  });

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppQuestionnaire }>();

  private readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  questionnaireFullList: AppQuestionnaire[] = [];

  constructor() {
    effect(() => {
      if (this.formValueChanges?.()) {
        this.error.set(null);
      }
    });
  }

  ngOnInit() {
    this.dialogData.questionnaireFullList.subscribe(questionnaires => {
      this.questionnaireFullList = questionnaires;
      this.form.controls.name.addValidators(this.duplicateValidator);
    })

    const updatedEntity: AppQuestionnaire = {
      ...this.dialogData.entity,
    };
    this.updatedValue = {...updatedEntity};
    this.updatedCode = JSON.stringify(this.updatedValue, null, 2);
    this.form.controls.languages.setValue(updatedEntity.languages ?? [this.DEFAULT_LANG]);
    this.form.patchValue(updatedEntity);
  }

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  onAction($event: DialogAction) {
    this.error.set(null);
    this.loading.set(true);
    switch ($event) {
      case DialogAction.CLOSE:
        this.close();
        break;
      case DialogAction.DELETE:
        this.handleDeleteAction();
        break;
      case DialogAction.SAVE:
        this.handleSaveAction();
        break;
    }
  }


  private handleSaveAction(): void {
    const value = this.form.getRawValue();
    const updatedEntity: AppQuestionnaire = {
      ...this.dialogData.entity,
      ...value,
    };
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: updatedEntity,
    });
  }

  private handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  close() {
    this.loading.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(error);
  }

  private duplicateValidator = (control: AbstractControl) => {
    return this.questionnaireFullList.find(
      (entity) =>
        control.value === entity._name && this.dialogData.entity?._name !== entity._name
    )
      ? { duplicate: true }
      : null;
  }

  protected toggleCodeView() {
    const value = this.form.getRawValue();
    const json = {...value, languages: undefined};
    this.updatedValue = {...value, _name: value.name , _search: value.name, languages: value.languages};
    this.updatedCode = JSON.stringify(json, null, 2);
    this.showCode = !this.showCode
  }
}

export function moveItemInFormArray(
  formArray: FormArray,
  fromIndex: number,
  toIndex: number
): void {
  const dir = toIndex > fromIndex ? 1 : -1;

  const item = formArray.at(fromIndex);
  for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
    const current = formArray.at(i + dir);
    formArray.setControl(i, current);
  }
  formArray.setControl(toIndex, item);
}
