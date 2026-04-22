import {
  Component, inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule, ReactiveFormsModule,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogContent, MatDialogRef,
} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {
  DialogTitleComponent
} from '../../../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  DialogActionsComponent
} from '../../../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {
  ErrorMessageBoxComponent
} from '../../../../../../../../shared/components/message-box/error-message-box.component';
import {DialogMode} from '../../../../../../../base-entities/enums/dialog';
import {
  DialogBodyDescriptionComponent
} from '../../../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
// import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {Validator as CustomValidator, } from '../../../../../../../../shared/utils/validators';
// import {AppQuestionnaire} from '../../../../models/questionnaire';
// import {QuestionnaireConfigService} from '../../../../services/questionnaire-config.service';
import {
  BaseEntityDialogComponent
} from '../../../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {
  ConditionalLogicOrFormArrayComponent
} from '../conditional-logic-or-form-array/conditional-logic-or-form-array.component';
// import {QuestionForm} from '../../models/question-form';
// import {debounceTime, takeUntil} from 'rxjs/operators';
// import {QuestionsFormArrayComponent} from '../questions-form-array/questions-form-array.component';
// import {
//   ConditionalLogicOrFormArrayComponent
// } from '../conditional-logic-or-form-array/conditional-logic-or-form-array.component';
// import {QuestionsFormArrayComponent} from '../questions-form-array/questions-form-array.component';

type ConditionalLogicOrWrapper = ConditionalLogicAndWrapper[];
type ConditionalLogicAndWrapper = ConditionalLogicItem[];

export interface ConditionalLogicItem {
  operand: string;
  operator: string;
  value: string;
}

@Component({
  selector: 'app-conditional-logic-dialog',
  templateUrl: './conditional-logic-dialog.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    ReactiveFormsModule,
    FormsModule,
    DialogTitleComponent,
    DialogActionsComponent,
    ErrorMessageBoxComponent,
    DialogBodyDescriptionComponent,
    ConditionalLogicOrFormArrayComponent,
    // MatError,
    // MatFormField,
    // MatInput,
    // QuestionsFormArrayComponent,
    // ConditionalLogicOrFormArrayComponent,
    // QuestionsFormArrayComponent,
  ]
})
export class ConditionalLogicDialogComponent extends BaseEntityDialogComponent<{value: string}> {
  // override configService = inject(QuestionnaireConfigService);
  override dialogRef = inject(MatDialogRef<ConditionalLogicDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: {value: string};
    // questionnaireFullList: Observable<AppQuestionnaire[]>;
  };

  // override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    orArray: new FormControl<ConditionalLogicOrWrapper>([],{nonNullable: true, validators: [CustomValidator.requiredValidator]}),
    // languages: new FormControl<RadarOption[]>([this.DEFAULT_LANG], {nonNullable: true}),
    // questions: new FormControl<AppQuestion[]>([], {nonNullable: true}),
  });

  override ngOnInit() {
    const orArray = this.parseConditionalLogic(this.dialogData.entity?.value ?? '');
    console.log('Class: ConditionalLogicDialogComponent, Function: ngOnInit, Line 96 orArray' , orArray);
    this.form.patchValue({orArray});
  //   // this.formFields = this.configService.getFormFields();
  //   if (this.dialogData.entity) this.form.patchValue({orArray});
  //   // this.form.valueChanges.pipe(debounceTime(300), takeUntil(this._destroy$)).subscribe((value) => {
  //   //   if (value) {
  //   //     this.error.set(null);
  //   //   }
  //   // })
  }

  private parseConditionalLogic(input: string): ConditionalLogicItem[][] {
    console.log('Class: ConditionalLogicDialogComponent, Function: parseConditionalLogic, Line 107 input' , input);
    if (!input || input.trim() === '') {
      return [];
    }

    // Split by 'or' (case-insensitive) to get OR groups
    const orGroups = input.split(/\s+or\s+/i);
    console.log('Class: ConditionalLogicDialogComponent, Function: parseConditionalLogic, Line 114 orGroups' , orGroups);

    return orGroups.map(orGroup => {
      console.log('Class: ConditionalLogicDialogComponent, Function: , Line 117 orGroup' , orGroup);
      // Split by 'and' (case-insensitive) to get AND conditions
      const andConditions = orGroup.split(/\s+and\s+/i);
      console.log('Class: ConditionalLogicDialogComponent, Function: , Line 120 andConditions' , andConditions);

      return andConditions.map(condition => {
        console.log('Class: ConditionalLogicDialogComponent, Function: , Line 123 condition' , condition);
        // Parse each condition: [field_name] <operator> 'value'
        // Supports: ===, ==, !==, !=, <>, <=, >=, <, >
        const match = condition.match(/\[([^\]]+)\]\s*(===|==|=|!==|!=|<>|<=|>=|<|>)\s*(?:'([^']*)'|"([^"]*)"|(\S+))/);
        // const match = condition.match(/\[([^\]]+)\]\s*(===|==|!==|!=|<>|<=|>=|<|>)\s*'([^']*)'/);
        console.log('Class: ConditionalLogicDialogComponent, Function: , Line 126 match' , match);

        // return {
        //   operand: 'match[1]',
        //   operator: '==',
        //   value: 'match[2]'
        // }
        if (!match) {
          throw new Error(`Invalid condition format: ${condition}`);
        }

        return {
          operand: match[1].trim(),
          operator: match[2],
          value: match[3] || match[4] || match[5] // Single quote, double quote, or unquoted
        };
        // if (!match) {
        //   throw new Error(`Invalid condition format: ${condition}`);
        // }

        // return {
        //   operand: match[1],
        //   operator: '==',
        //   value: match[2]
        // };
      });
    });
  }


  // questionnaireFullList: AppQuestionnaire[] = [];

  // override ngOnInit() {
    // this.dialogData.questionnaireFullList.subscribe(questionnaires => {
    //   this.questionnaireFullList = questionnaires;
    //   this.form.controls.name.addValidators(this.duplicateValidator);
    //   this.form.controls.name.updateValueAndValidity();
    // });

    // if (this.dialogData.entity) {
    //   const updatedEntity: AppQuestionnaire = {
    //     ...this.dialogData.entity,
    //   };
    //   // this.updatedValue = {...updatedEntity};
    //   // this.updatedCode = JSON.stringify(this.updatedValue, null, 2);
    //   this.form.controls.languages.setValue(updatedEntity.languages ?? [this.DEFAULT_LANG]);
    //   this.form.patchValue(updatedEntity);
    // }
  // }

  // override handleSaveAction(): void {
  //   console.log('Class: QuestionnaireDialogComponent, Function: handleSaveAction, Line 114 ' , this.dialogData.mode, this.dialogData.entity, this.form.getRawValue());
  //   this.dialogActionEvent.emit({
  //     action: this.dialogData.mode,
  //     entity: {
  //       ...(this.dialogData.entity ?? ({} as AppQuestionnaire)),
  //       ...(this.form.getRawValue() as Partial<AppQuestionnaire>),
  //     } as AppQuestionnaire,
  //   });
  // }
  //
  // override handleDeleteAction(): void {
  //   console.log('Class: QuestionnaireDialogComponent, Function: handleDeleteAction, Line 125 ' , this.dialogData.mode, this.dialogData.entity);
  //   this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  // }

  // private duplicateValidator = (control: AbstractControl) => {
  //   return this.questionnaireFullList.find(
  //     (entity) =>
  //       control.value === entity._name && this.dialogData.entity?._name !== entity._name
  //   )
  //     ? { duplicate: true }
  //     : null;
  // }
}
