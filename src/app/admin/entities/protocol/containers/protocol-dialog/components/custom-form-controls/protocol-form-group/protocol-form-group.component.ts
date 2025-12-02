// import {Component, inject, input, OnDestroy, output} from '@angular/core';
// import {
//   ControlValueAccessor,
//   FormGroup,
//   FormControl,
//   NG_VALUE_ACCESSOR,
//   ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors
// } from '@angular/forms';
// import {MatIconButton} from "@angular/material/button";
// import {MatError, MatFormField} from "@angular/material/form-field";
// import {MatInput} from "@angular/material/input";
// import {MatSelect, MatOption} from "@angular/material/select";
// import {TranslatePipe} from "@ngx-translate/core";
// import {Subscription} from "rxjs";
// import {FormBuilderService} from "../../../services/form-builder.service";
// import {ValidatorError, Validator as CustomValidator} from "../../../../../../../../shared/utils/validators";
// import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
// import {QuestionForm} from "../../../models/question-form";
// import {TextFormGroupComponent} from "../text-form-group/text-form-group.component";
// import {ProtocolStateService} from "../../../services/protocol-state.service";
//
// @Component({
//   selector: 'app-protocol-form-group',
//   templateUrl: './protocol-form-group.component.html',
//   imports: [
//     MatIconButton,
//     ReactiveFormsModule,
//     MatError,
//     MatFormField,
//     MatInput,
//     MatOption,
//     MatSelect,
//     TranslatePipe,
//     TextFormGroupComponent
//   ],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: ProtocolFormGroupComponent
//     }, {
//       provide: NG_VALIDATORS,
//       multi: true,
//       useExisting: ProtocolFormGroupComponent
//     }
//   ]
// })
// export class ProtocolFormGroupComponent implements ControlValueAccessor, Validator, OnDestroy {
//
//   private formBuilderService = inject(FormBuilderService);
//   stateService = inject(ProtocolStateService);
//
//   protected readonly QUESTION_TYPES = QUESTION_TYPES;
//   protected readonly ValidatorError = ValidatorError;
//
//   languages = input.required<RadarOption[]>();
//   remove = output<void>();
//
//   form = new FormGroup<Partial<QuestionForm>>({
//     field_name: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
//     field_type: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
//     field_label: new FormControl<Record<string, any>>({}, {nonNullable: true}),
//     section_header: new FormControl<Record<string, any>>({}, {nonNullable: true}),
//   });
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
//   // Optional: Implement registerOnValidatorChange if you need to update validation when external conditions change
//   registerOnValidatorChange?(fn: () => void): void {
//     this.onValidatorChange = fn;
//   }
//
//   private onValidatorChange: (() => void) | undefined;
//
//   constructor() {
//     // Notify parent about validation changes, but don't trigger updateValueAndValidity
//     if (this.onValidatorChange) {
//       this.onValidatorChange();
//     }
//
//     this.form.controls.field_type?.valueChanges.subscribe(type => {
//       this.updateFormControls(type);
//       // Notify parent about validation changes, but don't trigger updateValueAndValidity
//       if (this.onValidatorChange) {
//         this.onValidatorChange();
//       }
//     });
//   }
//
//   ngOnDestroy() {
//     this.valueChangesSub?.unsubscribe();
//   }
//
//   onChange = (value: any) => {};
//   onTouch = () => {};
//
//   updateFormControls(type?: string) {
//     if (!type) return;
//
//     ['field_annotation', 'select_choices_or_calculations', 'range'].forEach(controlName => {
//       if (this.form.contains(controlName)) {
//         this.form.removeControl(controlName as keyof QuestionForm);
//       }
//     });
//
//     if (type === 'timed') {
//       this.form.addControl('field_annotation' as keyof QuestionForm, this.formBuilderService.createAnnotationFormGroup());
//     }
//     if (type === 'slider') {
//       this.form.addControl('range' as keyof QuestionForm, this.formBuilderService.createRangeFormGroup());
//     }
//     if (['radio', 'checkbox', 'info'].includes(type)) {
//       this.form.addControl('select_choices_or_calculations' as keyof QuestionForm, this.formBuilderService.createSelectChoiceOrCalculationFormArray());
//     }
//   }
//
//   writeValue(question?: AppQuestion) {
//     this.updateFormControls(question?.field_type);
//     if (question) {
//       this.form.patchValue(question, {emitEvent: false});
//     } else {
//       this.form.reset();
//     }
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
// }
