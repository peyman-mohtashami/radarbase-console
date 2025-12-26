import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray, FormControl,
  FormGroup, FormsModule, ReactiveFormsModule,
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator} from '../../../../../shared/utils/validators';
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {DialogMode} from "../../../../base-entities/enums/dialog";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {AppQuestion, AppQuestionnaire, DEFAULT_LANGUAGE, ISO_LANGUAGES} from "../../models/questionnaire";
import {
  DialogBodyDescriptionComponent
} from "../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component";
import {
  DialogActionsComponent
} from "../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component";
import {
  MatSelectAutocompleteComponent
} from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {RadarOption} from "../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {QuestionsFormArrayComponent} from './components/questions-form-array/questions-form-array.component';
import {Observable} from 'rxjs';
import {
  BaseEntityDialogComponent
} from '../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {
  DialogTitleComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';

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
    MatIconButton,
    MatTooltip,
    ErrorMessageBoxComponent,
    DialogTitleComponent,
  ]
})
export class QuestionnaireDialogComponent extends BaseEntityDialogComponent<AppQuestionnaire> implements OnInit, AfterViewInit {
  override configService = inject(QuestionnaireConfigService);
  override dialogRef = inject(MatDialogRef<QuestionnaireDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity?: AppQuestionnaire;
    questionnaireFullList: Observable<AppQuestionnaire[]>;
  };

  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;
  protected readonly DEFAULT_LANG = DEFAULT_LANGUAGE;

  editorOptions = {
    language: 'json',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: 'on'
  };
  protected showCode = false;

  // updatedValue?: AppQuestionnaire;
  updatedCode = '';

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    name: new FormControl<string>('', {validators: [Validator.requiredValidator, Validator.stringIdValidator], nonNullable: true}),
    languages: new FormControl<RadarOption[]>([this.DEFAULT_LANG], {nonNullable: true}),
    questions: new FormControl<AppQuestion[]>([], {nonNullable: true}),
  });

  questionnaireFullList: AppQuestionnaire[] = [];

  ngOnInit() {
    this.dialogData.questionnaireFullList.subscribe(questionnaires => {
        this.questionnaireFullList = questionnaires;
        this.form.controls.name.addValidators(this.duplicateValidator);
        this.form.controls.name.updateValueAndValidity();
    });

    if (this.dialogData.entity) {
      const updatedEntity: AppQuestionnaire = {
        ...this.dialogData.entity,
      };
      // this.updatedValue = {...updatedEntity};
      // this.updatedCode = JSON.stringify(this.updatedValue, null, 2);
      this.form.controls.languages.setValue(updatedEntity.languages ?? [this.DEFAULT_LANG]);
      this.form.patchValue(updatedEntity);
    }
  }

  ngAfterViewInit() {
    super.afterViewInit();
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
    // const value = this.form.getRawValue();
    // const json = {...value, languages: undefined};
    // this.updatedValue = {...value, _name: value.name , _search: value.name, languages: value.languages};
    // this.updatedCode = JSON.stringify(json, null, 2);
    // this.showCode = !this.showCode
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
