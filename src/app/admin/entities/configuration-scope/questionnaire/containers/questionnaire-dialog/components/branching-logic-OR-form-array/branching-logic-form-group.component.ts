// import {Component, input, OnDestroy} from '@angular/core';
// import {
//   AbstractControl,
//   ControlValueAccessor,
//   FormArray,
//   FormControl, FormGroup,
//   NG_VALUE_ACCESSOR,
//   ReactiveFormsModule, ValidationErrors, Validator
// } from '@angular/forms';
// import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
// import {MatFormField} from "@angular/material/form-field";
// import {MatInput} from "@angular/material/input";
// import {TextFormGroupComponent} from "../text-form-group/text-form-group.component";
// import {ValidatorError, Validator as CustomValidator} from "../../../../../../../../shared/utils/validators";
// import {Subscription} from "rxjs";
// import {MatSlideToggle} from "@angular/material/slide-toggle";
// import {QuestionForm} from "../../../models/question-form";
// import {moveItemInFormArray} from "../../../questionnaire-dialog.component";
//
// @Component({
//   selector: 'app-branching-logic-form-group',
//   templateUrl: './branching-logic-form-group.component.html',
//   imports: [
//     CdkDropList,
//     CdkDrag,
//     ReactiveFormsModule,
//     MatFormField,
//     MatInput,
//     TextFormGroupComponent,
//     MatSlideToggle,
//   ],
//   providers: [{
//     provide: NG_VALUE_ACCESSOR,
//     multi: true,
//     useExisting: BranchingLogicFormGroupComponent
//   }]
// })
// export class BranchingLogicFormGroupComponent implements ControlValueAccessor, OnDestroy, Validator {
//
//   protected readonly ValidatorError = ValidatorError;
//
//   form = new FormGroup({
//     enabled: new FormControl<boolean>(false, {validators: [CustomValidator.requiredValidator]}),
//     or_array: new FormArray<FormGroup<{operator: string; value: any}>>([])
//     // new FormControl<any[]>([], {validators: [CustomValidator.requiredValidator]}),
//   });
//   // form = new FormArray<FormGroup<{
//   //   code: FormControl<string | undefined>;
//   //   label: FormControl<Record<string, string> | undefined>
//   // }>>([]);
//
//   private valueChangesSub?: Subscription;
//
//   validate(control: AbstractControl): ValidationErrors | null {
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
//   ngOnDestroy() {
//     this.valueChangesSub?.unsubscribe();
//   }
//
//   onChange = (value: any) => {};
//   onTouch = () => {};
//
//   writeValue(value?: string) {
//     console.log('Class: BranchingLogicORFormArrayComponent, Function: writeValue, Line 87 value' , value);
//     // if (value) {
//     //   this.form.patchValue(value, { emitEvent: false });
//     // } else {
//     //   this.form.reset();
//     // }
//   }
//
//   registerOnChange(fn: any) {
//     this.valueChangesSub?.unsubscribe();
//     this.valueChangesSub = this.form.valueChanges.subscribe(value => {
//       fn(value);
//     });
//   }
//
//   registerOnTouched(fn: any) {
//     this.onTouch = fn;
//   }
//
//   addItem(item?: any) {
//     this.form.controls.or_array.push(new FormGroup({}));
//   }
//
//   removeItem(index: number) {
//     this.form.controls.or_array.removeAt(index);
//   }
//
//   onDrop(event: CdkDragDrop<string[]>) {
//     moveItemInFormArray(this.form.controls.or_array, event.previousIndex, event.currentIndex);
//   }
// }
