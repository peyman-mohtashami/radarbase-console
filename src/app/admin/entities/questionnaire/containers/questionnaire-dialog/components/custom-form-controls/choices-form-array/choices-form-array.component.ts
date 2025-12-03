import {Component, input} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors, Validator
} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {moveItemInFormArray} from "../../../questionnaire-dialog.component";
import {TextFormGroupComponent} from "../text-form-group/text-form-group.component";
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-choices-form-array',
  templateUrl: './choices-form-array.component.html',
  imports: [
    CdkDropList,
    CdkDrag,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    TextFormGroupComponent,
    MatIconButton,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ChoicesFormArrayComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ChoicesFormArrayComponent
    }
  ]
})
export class ChoicesFormArrayComponent implements ControlValueAccessor, Validator {
  languages = input.required<RadarOption[]>();
  selectedLanguage = input.required<string>();

  form = new FormArray<FormGroup<{
    code: FormControl<string | undefined>;
    label: FormControl<Record<string, string> | undefined>
  }>>([]);

  onChange = () => {};
  onTouch = () => {};

  // validate(): ValidationErrors | null {
  //   const errors: ValidationErrors = {};
  //
  //   // Check main form controls
  //   Object.keys(this.form.controls).forEach(key => {
  //     const ctrl = this.form.get(key);
  //     if (ctrl?.errors) {
  //       errors[key] = ctrl.errors;
  //     }
  //
  //     // Check nested form groups
  //     if (ctrl instanceof FormGroup) {
  //       Object.keys(ctrl.controls).forEach(nestedKey => {
  //         const nestedCtrl = ctrl.get(nestedKey);
  //         if (nestedCtrl?.errors) {
  //           errors[`${key}.${nestedKey}`] = nestedCtrl.errors;
  //         }
  //
  //         // Handle nested form groups (like timer)
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

  validate(): ValidationErrors | null {
    const errors: ValidationErrors = {};

    // --- Clear previous duplicate-code errors ---
    this.form.controls.forEach((group) => {
      const codeCtrl = group.get('code');
      if (codeCtrl?.hasError('duplicateCode')) {
        const { duplicateCode, ...rest } = codeCtrl.errors ?? {};
        codeCtrl.setErrors(Object.keys(rest).length ? rest : null);
      }
    });

    // --- Check for duplicate "code" values in the FormArray ---
    const codeMap = new Map<string, number[]>();
    this.form.controls.forEach((group, index) => {
      const raw = group.get('code')?.value;
      const code = (raw ?? '').trim();
      if (!code) {
        return; // ignore empty codes
      }
      const indexes = codeMap.get(code) ?? [];
      indexes.push(index);
      codeMap.set(code, indexes);
    });

    // Mark duplicates and add a form-level error
    const duplicateIndexes: number[] = [];
    codeMap.forEach((indexes, code) => {
      if (indexes.length > 1) {
        duplicateIndexes.push(...indexes);
        indexes.forEach(i => {
          const group = this.form.at(i);
          const codeCtrl = group.get('code');
          const currentErrors = codeCtrl?.errors ?? {};
          codeCtrl?.setErrors({
            ...currentErrors,
            duplicateCode: { code }
          });
        });
      }
    });

    if (duplicateIndexes.length) {
      errors['duplicateCodes'] = {
        message: 'Code values must be unique',
        indexes: duplicateIndexes
      };
    }

    // --- Existing error collection logic ---
    Object.keys(this.form.controls).forEach(key => {
      const ctrl = this.form.get(key);
      if (ctrl?.errors) {
        errors[key] = ctrl.errors;
      }

      if (ctrl instanceof FormGroup) {
        Object.keys(ctrl.controls).forEach(nestedKey => {
          const nestedCtrl = ctrl.get(nestedKey);
          if (nestedCtrl?.errors) {
            errors[`${key}.${nestedKey}`] = nestedCtrl.errors;
          }

          if (nestedCtrl instanceof FormGroup) {
            Object.keys(nestedCtrl.controls).forEach(deepKey => {
              const deepCtrl = nestedCtrl.get(deepKey);
              if (deepCtrl?.errors) {
                errors[`${key}.${nestedKey}.${deepKey}`] = deepCtrl.errors;
              }
            });
          }
        });
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  writeValue(choices: {
    code: string
    label: Record<string, string>
  }[]) {
    this.form.clear();

    if (!choices || choices.length === 0) {
      this.addItem();
    } else {
      choices.forEach(choice => this.addItem(choice));
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  addItem(question?: {
    code: string
    label: Record<string, string>
  }) {
    this.form.push(new FormGroup({
      code: new FormControl(question?.code, {nonNullable: true}),
      label: new FormControl(question?.label, {nonNullable: true})
    }));
  }

  removeItem(index: number) {
    this.form.removeAt(index);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInFormArray(this.form, event.previousIndex, event.currentIndex);
  }
}
