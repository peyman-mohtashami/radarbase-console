import {Component, inject} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors, Validator,
} from '@angular/forms';
import {CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
// import {MatButton, MatIconButton} from "@angular/material/button";
// import {MatIcon} from "@angular/material/icon";
// import {QuestionFormGroupComponent} from "../question-form-group/question-form-group.component";
import {QuestionnaireStateService} from "../../services/questionnaire-state.service";
import {AppQuestion} from "../../../../models/questionnaire";
import {moveItemInFormArray} from "../../questionnaire-dialog.component";
import {TranslatePipe} from '@ngx-translate/core';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {
  ConditionalLogicAndFormArrayComponent
} from '../conditional-logic-and-form-array/conditional-logic-and-form-array.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
// import {
//   ConditionalLogicAndFormArrayComponent
// } from '../conditional-logic-and-form-array/conditional-logic-and-form-array.component';

@Component({
  selector: 'app-conditional-logic-or-form-array',
  templateUrl: './conditional-logic-or-form-array.component.html',
  imports: [
    // MatButton,
    // MatIcon,
    CdkDropList,
    ReactiveFormsModule,
    // QuestionFormGroupComponent,
    // MatIconButton,
    TranslatePipe,
    ConditionalLogicAndFormArrayComponent,
    MatIcon,
    MatButton,
    // ConditionalLogicAndFormArrayComponent,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: ConditionalLogicOrFormArrayComponent
  },{
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: ConditionalLogicOrFormArrayComponent
  }]
})
export class ConditionalLogicOrFormArrayComponent implements ControlValueAccessor, Validator {
  questionnaireStateService = inject(QuestionnaireStateService);

  // languages = input.required<RadarOption[]>();

  form = new FormArray<FormControl<ConditionalLogicItem | undefined>>([]);

  onTouch: () => void = () => undefined;
  onChange: (value: (ConditionalLogicItem | undefined)[]) => void = () => undefined;

  // private readonly questionIsValidValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   // Return errors if the control itself has errors (from the QuestionFormGroupComponent)
  //   return control.errors;
  // };

  // validate(): ValidationErrors | null {
  //   const errors: ValidationErrors = {};
  //
  //   // 1) Require at least one question
  //   if (this.form.length === 0) {
  //     errors['required'] = 'At least one Question is required';
  //     return errors;
  //   }
  //
  //   // 2) Collect duplicate field_name values
  //   const nameMap = new Map<string, number[]>();
  //
  //   this.form.controls.forEach((control, index) => {
  //     const rawName = control.value?.field_name ?? '';
  //     const name = rawName.trim();
  //     if (!name) {
  //       return; // ignore empty names
  //     }
  //
  //     const indexes = nameMap.get(name) ?? [];
  //     indexes.push(index);
  //     nameMap.set(name, indexes);
  //   });
  //
  //   const duplicateIndexes: number[] = [];
  //   const duplicateNames: string[] = [];
  //
  //   nameMap.forEach((indexes, name) => {
  //     if (indexes.length > 1) {
  //       duplicateIndexes.push(...indexes);
  //       duplicateNames.push(name);
  //     }
  //   });
  //
  //   if (duplicateIndexes.length) {
  //     errors['duplicateFieldNames'] = {
  //       message: 'field_name values must be unique',
  //       names: duplicateNames,
  //       indexes: duplicateIndexes,
  //     };
  //   }
  //
  //   // 3) Collect any child control errors (if you need them at array level)
  //   this.form.controls.forEach((control, index) => {
  //     if (control.errors) {
  //       errors[`question${index}`] = control.errors;
  //     }
  //   });
  //
  //   return Object.keys(errors).length > 0 ? errors : null;
  // }

  validate(): ValidationErrors | null {
    const errors: ValidationErrors = {};

    // 1) Require at least one question row
    if (this.form.length === 0) {
      errors['required'] = 'At least one Question is required';
      return errors;
    }

    // 2) Collect duplicate field_name values (among non-empty names)
    // const nameMap = new Map<string, number[]>();
    //
    // this.form.controls.forEach((control, index) => {
    //   const rawName = (control.value?.field_name ?? '');
    //   const name = rawName.trim();
    //   if (!name) {
    //     return; // ignore empty names
    //   }
    //
    //   const indexes = nameMap.get(name) ?? [];
    //   indexes.push(index);
    //   nameMap.set(name, indexes);
    // });
    //
    // const duplicateIndexes: number[] = [];
    // const duplicateNames: string[] = [];
    //
    // nameMap.forEach((indexes, name) => {
    //   if (indexes.length > 1) {
    //     duplicateIndexes.push(...indexes);
    //     duplicateNames.push(name);
    //   }
    // });
    //
    // if (duplicateIndexes.length) {
    //   errors['duplicateFieldNames'] = {
    //     message: 'field_name values must be unique',
    //     names: duplicateNames,
    //     indexes: duplicateIndexes,
    //   };
    // }

    // 3) Collect any child control errors
    this.form.controls.forEach((control, index) => {
      if (control.errors) {
        errors[`question${index}`] = control.errors;
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  // writeValue(questions: AppQuestion[]) {
  //   if (questions) {
  //     this.form.clear();
  //     questions.forEach(question => this.addQuestion(question));
  //   }
  // }
  writeValue(questions: ConditionalLogicItem[]) {
    this.form.clear();

    // Ensure there's always at least one row to edit
    if (!questions || questions.length === 0) {
      this.addQuestion(undefined);
      return;
    }

    questions.forEach(question => this.addQuestion(question));
  }

  registerOnChange(fn: (value: (ConditionalLogicItem | undefined)[]) => void) {
    this.onChange = fn;
    this.form.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  // addQuestion(question?: AppQuestion) {
  //   this.form.push(new FormControl(question, {nonNullable: true}));
  // }
  addQuestion(question?: ConditionalLogicItem) {
    this.form.push(new FormControl(question, {
      nonNullable: true,
      // validators: [this.questionIsValidValidator],
    }));
  }

  removeQuestion(index: number) {
    this.form.removeAt(index);
    setTimeout(() => {
      if (this.form.controls.length === 0) {
        this.questionnaireStateService.selectedQuestionIndex.set(undefined);
      }
    }, 200);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInFormArray(this.form, event.previousIndex, event.currentIndex);
  }
}
