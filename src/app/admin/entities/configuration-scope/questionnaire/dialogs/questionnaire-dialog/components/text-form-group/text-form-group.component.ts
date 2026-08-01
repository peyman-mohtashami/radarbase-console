// import {Component, effect, input} from '@angular/core';
// import {
//   FormGroup,
//   FormControl,
//   NG_VALUE_ACCESSOR,
//   ReactiveFormsModule, NG_VALIDATORS
// } from '@angular/forms';
// import {MatError, MatFormField} from "@angular/material/form-field";
// import {MatInput} from "@angular/material/input";
// import {CdkTextareaAutosize} from "@angular/cdk/text-field";
// import {TranslateModule} from "@ngx-translate/core";
// import {Validator as CustomValidator} from "../../../../../../../../shared/utils/validators";
// // import {QuestionnaireDialogStateService} from "../../services/questionnaire-dialog-state.service";
// import {
//   BaseFormGroupComponent
// } from '../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
// import {
//   RadarOption
// } from '../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
//
// @Component({
//   selector: 'app-text-form-group',
//   templateUrl: './text-form-group.component.html',
//   imports: [
//     ReactiveFormsModule,
//     MatFormField,
//     MatInput,
//     CdkTextareaAutosize,
//     MatError,
//     TranslateModule,
//   ],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: TextFormGroupComponent
//     },
//     {
//       provide: NG_VALIDATORS,
//       multi: true,
//       useExisting: TextFormGroupComponent
//     }
//   ]
// })
// export class TextFormGroupComponent extends BaseFormGroupComponent<Record<string, string>> {
//
//   // questionnaireStateService = inject(QuestionnaireStateService);
//
//   languages = input.required<RadarOption[]>();
//   language = input.required<RadarOption>();
//   label = input<string>();
//   placeholder = input<string>('');
//   required = input<boolean>(false);
//   disabled = input<boolean>(false);
//   textarea = input<boolean>(false);
//   textareaRows = input<number>(3);
//   textareaAutosize = input<boolean>(false);
//
//   override form = new FormGroup<Record<string, FormControl<string | null>>>({});
//
//   constructor() {
//     super();
//     effect(() => {
//       this.initializeLanguageControls();
//       this.updateValidators();
//     });
//   }
//
//   override writeValue(value: Record<string, string>) {
//     if (Object.keys(value).length) {
//       this.initializeLanguageControls();
//       this.updateValidators();
//     }
//     super.writeValue(Object.keys(value).length ? value : null);
//   }
//
//   private updateValidators() {
//     Object.keys(this.form.controls).forEach(key => {
//       const control = this.form.get(key);
//       if (control) {
//         control.setValidators(this.required() ? CustomValidator.requiredValidator : null);
//         control.updateValueAndValidity({ emitEvent: false });
//       }
//     });
//     this.validatorChange();
//   }
//
//   get currentControl(): FormControl<string | null> {
//     const langId = this.language().id.toString();
//     if (!this.form.contains(langId)) {
//       this.form.addControl(langId, new FormControl('', { nonNullable: true }));
//       this.updateValidators();
//     }
//     return this.form.get(langId) as FormControl<string | null>;
//   }
//
//   private initializeLanguageControls() {
//     // [...this.languages(), this.language()].forEach(lang => {
//     // this.languages().forEach(lang => {
//       const languageString = this.language().id.toString();//lang.id.toString();
//       // if (!this.form.contains(languageString)) {
//         this.form.addControl(
//           languageString,
//           new FormControl('', {
//             nonNullable: true
//           })
//         );
//       // }
//     // });
//
//     // this.languages().forEach(lang => {
//     //   const languageString = lang.id.toString();
//     //   if (!this.form.contains(languageString)) {
//     //     this.form.addControl(
//     //       languageString,
//     //       new FormControl('', {
//     //         nonNullable: true
//     //       })
//     //     );
//     //   }
//     // });
//   }
// }
