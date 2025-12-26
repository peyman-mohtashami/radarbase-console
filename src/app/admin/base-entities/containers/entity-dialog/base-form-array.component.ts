// import { Component, OnDestroy } from '@angular/core';
// import {
//   ControlValueAccessor, FormArray,
//   FormGroup,
//   ReactiveFormsModule,
//   ValidationErrors,
//   Validator
// } from '@angular/forms';
// import { Subscription } from "rxjs";
// import {ValidatorError} from '../../../../shared/utils/validators';
// import {CdkDragDrop} from '@angular/cdk/drag-drop';
// import {
//   moveItemInFormArray
// } from '../../../entities/questionnaire/containers/questionnaire-dialog/questionnaire-dialog.component';
//
// @Component({
//   selector: 'app-base-form-array',
//   template: '',
//   standalone: true,
//   imports: [ReactiveFormsModule],
// })
// export abstract class BaseFormArrayComponent<T = any> implements ControlValueAccessor, Validator, OnDestroy {
//   protected readonly ValidatorError = ValidatorError;
//
//   // Each child component will define its specific controls
//   abstract form: FormArray<FormGroup>;
//
//   protected valueChangesSub?: Subscription;
//
//   onChange = (value: T | null) => {};
//   onTouch = () => {};
//
//   validate(): ValidationErrors | null {
//     const errors: ValidationErrors = {};
//
//     // Check main form controls
//     Object.keys(this.form.controls).forEach(key => {
//       const ctrl = this.form.get(key);
//       if (ctrl?.errors) {
//         errors[key] = ctrl.errors;
//       }
//
//       // Check nested form groups
//       if (ctrl instanceof FormGroup) {
//         Object.keys(ctrl.controls).forEach(nestedKey => {
//           const nestedCtrl = ctrl.get(nestedKey);
//           if (nestedCtrl?.errors) {
//             errors[`${key}.${nestedKey}`] = nestedCtrl.errors;
//           }
//
//           // Handle nested form groups (like timer)
//           if (nestedCtrl instanceof FormGroup) {
//             Object.keys(nestedCtrl.controls).forEach(deepKey => {
//               const deepCtrl = nestedCtrl.get(deepKey);
//               if (deepCtrl?.errors) {
//                 errors[`${key}.${nestedKey}.${deepKey}`] = deepCtrl.errors;
//               }
//             });
//           }
//         });
//       }
//     });
//
//     return Object.keys(errors).length > 0 ? errors : null;
//   }
//
//   writeValue(values: T[] | null): void {
//     this.form.clear();
//
//     if (!values || values.length === 0) {
//       this.addItem();
//     } else {
//       values.forEach(value => this.addItem(value));
//     }
//   }
//
//   registerOnChange(fn: (value: T | null) => void): void {
//     this.valueChangesSub?.unsubscribe();
//     this.valueChangesSub = this.form.valueChanges.subscribe(value => {
//       fn(value);
//     });
//   }
//
//   registerOnTouched(fn: () => void): void {
//     this.onTouch = fn;
//   }
//
//   setDisabledState(isDisabled: boolean): void {
//     if (isDisabled) {
//       this.form.disable();
//     } else {
//       this.form.enable();
//     }
//   }
//
//   ngOnDestroy(): void {
//     this.valueChangesSub?.unsubscribe();
//   }
//
//   abstract addItem(item?: T): void
//
//   removeItem(index: number) {
//     this.form.removeAt(index);
//   }
//
//   onDrop(event: CdkDragDrop<string[]>) {
//     moveItemInFormArray(this.form, event.previousIndex, event.currentIndex);
//   }
// }
