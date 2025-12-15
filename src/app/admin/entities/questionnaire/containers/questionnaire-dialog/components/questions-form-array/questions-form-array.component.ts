import {Component, inject, input} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors, Validator
} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
// import {QuestionListItemComponent} from "../../question-list-item/question-list-item.component";
import {QuestionFormGroupComponent} from "../question-form-group/question-form-group.component";
import {QuestionnaireStateService} from "../../services/questionnaire-state.service";
import {RadarOption} from "../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {AppQuestion} from "../../../../models/questionnaire";
import {moveItemInFormArray} from "../../questionnaire-dialog.component";

@Component({
  selector: 'app-questions-form-array',
  templateUrl: './questions-form-array.component.html',
  imports: [
    MatButton,
    MatIcon,
    CdkDropList,
    // QuestionListItemComponent,
    // CdkDrag,
    ReactiveFormsModule,
    QuestionFormGroupComponent,
    MatIconButton,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: QuestionsFormArrayComponent
  },{
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: QuestionsFormArrayComponent
  }]
})
export class QuestionsFormArrayComponent implements ControlValueAccessor, Validator {
  questionnaireStateService = inject(QuestionnaireStateService);

  languages = input.required<RadarOption[]>();

  form = new FormArray<FormControl<AppQuestion | undefined>>([]);

  onChange = () => {};
  onTouch = () => {};

  // registerOnValidatorChange?(fn: () => void): void {
  //   this.onValidatorChange = fn;
  // }

  // private onValidatorChange: (() => void) | undefined;

  // validate(): ValidationErrors | null {
  //   const errors: ValidationErrors = {};
  //
  //   // --- Clear previous duplicate-code errors ---
  //   this.form.controls.forEach((group) => {
  //     console.log('Class: QuestionsFormArrayComponent, Function: , Line 62 ' , group);
  //     const codeCtrl = group.get('field_name');
  //     if (codeCtrl?.hasError('duplicateNames')) {
  //       const { duplicateCode, ...rest } = codeCtrl.errors ?? {};
  //       codeCtrl.setErrors(Object.keys(rest).length ? rest : null);
  //     }
  //   });
  //
  //   // --- Check for duplicate "code" values in the FormArray ---
  //   const codeMap = new Map<string, number[]>();
  //   this.form.controls.forEach((group, index) => {
  //     console.log('Class: QuestionsFormArrayComponent, Function: , Line 73 group' , group);
  //     const raw = group.get('field_name')?.value;
  //     console.log('Class: QuestionsFormArrayComponent, Function: , Line 75 raw' , raw);
  //     const code = (raw ?? '').trim();
  //     console.log('Class: QuestionsFormArrayComponent, Function: , Line 77 code' , code);
  //     if (!code) {
  //       return; // ignore empty codes
  //     }
  //     const indexes = codeMap.get(code) ?? [];
  //     indexes.push(index);
  //     codeMap.set(code, indexes);
  //   });
  //
  //   // Mark duplicates and add a form-level error
  //   const duplicateIndexes: number[] = [];
  //   codeMap.forEach((indexes, code) => {
  //     console.log('Class: QuestionsFormArrayComponent, Function: , Line 87 indexes, code' , indexes, code);
  //     if (indexes.length > 1) {
  //       duplicateIndexes.push(...indexes);
  //       indexes.forEach(i => {
  //         const group = this.form.at(i);
  //         const codeCtrl = group.get('field_name');
  //         const currentErrors = codeCtrl?.errors ?? {};
  //         codeCtrl?.setErrors({
  //           ...currentErrors,
  //           duplicateCode: { code }
  //         });
  //       });
  //     }
  //   });
  //
  //   if (duplicateIndexes.length) {
  //     errors['duplicateNames'] = {
  //       message: 'Name values must be unique',
  //       indexes: duplicateIndexes
  //     };
  //   }
  //
  //   // --- Existing error collection logic ---
  //   Object.keys(this.form.controls).forEach(key => {
  //     const ctrl = this.form.get(key);
  //     if (ctrl?.errors) {
  //       errors[key] = ctrl.errors;
  //     }
  //
  //     if (ctrl instanceof FormGroup) {
  //       Object.keys(ctrl.controls).forEach(nestedKey => {
  //         const nestedCtrl = ctrl.get(nestedKey);
  //         if (nestedCtrl?.errors) {
  //           errors[`${key}.${nestedKey}`] = nestedCtrl.errors;
  //         }
  //
  //         if (nestedCtrl instanceof FormGroup) {
  //           Object.keys(nestedCtrl.controls).forEach(deepKey => {
  //             const deepCtrl = nestedCtrl.get(deepKey);
  //             if (deepCtrl?.errors) {
  //               errors[`${key}.${nestedKey}.${deepKey}`] = deepCtrl.errors;
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  //
  //   return Object.keys(errors).length > 0 ? errors : null;
  // }

  // validate(): ValidationErrors | null {
  //   if (this.form.length === 0) {
  //     return { required: 'At least one Question is required' };
  //   }
  //
  //   const errors: ValidationErrors = {};
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

    // 1) Require at least one question
    if (this.form.length === 0) {
      errors['required'] = 'At least one Question is required';
      return errors;
    }

    // 2) Collect duplicate field_name values
    const nameMap = new Map<string, number[]>();

    this.form.controls.forEach((control, index) => {
      const rawName = control.value?.field_name ?? '';
      const name = rawName.trim();
      if (!name) {
        return; // ignore empty names
      }

      const indexes = nameMap.get(name) ?? [];
      indexes.push(index);
      nameMap.set(name, indexes);
    });

    const duplicateIndexes: number[] = [];
    const duplicateNames: string[] = [];

    nameMap.forEach((indexes, name) => {
      if (indexes.length > 1) {
        duplicateIndexes.push(...indexes);
        duplicateNames.push(name);
      }
    });

    if (duplicateIndexes.length) {
      errors['duplicateFieldNames'] = {
        message: 'field_name values must be unique',
        names: duplicateNames,
        indexes: duplicateIndexes,
      };
    }

    // 3) Collect any child control errors (if you need them at array level)
    this.form.controls.forEach((control, index) => {
      if (control.errors) {
        errors[`question${index}`] = control.errors;
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  writeValue(questions: AppQuestion[]) {
    if (questions) {
      this.form.clear();
      questions.forEach(question => this.addQuestion(question));
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    this.form.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  addQuestion(question?: AppQuestion) {
    this.form.push(new FormControl(question, {nonNullable: true}));
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

  protected selectQuestion(questionIndex: number) {
    this.questionnaireStateService.selectedQuestionIndex.set(questionIndex);
  }
}
