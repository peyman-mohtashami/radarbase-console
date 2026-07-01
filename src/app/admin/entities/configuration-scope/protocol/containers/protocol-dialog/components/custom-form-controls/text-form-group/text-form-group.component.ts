// import {Component, effect, inject, input} from '@angular/core';
// import {
//   FormGroup,
//   FormControl,
//   NG_VALUE_ACCESSOR,
//   ReactiveFormsModule, NG_VALIDATORS
// } from '@angular/forms';
// import {MatFormField} from "@angular/material/form-field";
// import {MatInput} from "@angular/material/input";
// import {CdkTextareaAutosize} from "@angular/cdk/text-field";
// import {Validator as CustomValidator} from "../../../../../../../../../shared/utils/validators";
// import {RadarOption} from "../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
// import {ProtocolStateService} from "../../../services/protocol-state.service";
// import {
//   BaseFormGroupComponent
// } from '../../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
//
// @Component({
//   selector: 'app-text-form-group',
//   templateUrl: './text-form-group.component.html',
//   imports: [
//     ReactiveFormsModule,
//     MatFormField,
//     MatInput,
//     CdkTextareaAutosize,
//   ],
//   providers: [{
//     provide: NG_VALUE_ACCESSOR,
//     multi: true,
//     useExisting: TextFormGroupComponent
//   },
//     {
//       provide: NG_VALIDATORS,
//       multi: true,
//       useExisting: TextFormGroupComponent
//     }]
// })
// export class TextFormGroupComponent extends BaseFormGroupComponent<Record<string, string>> {
//
//   protocolStateService = inject(ProtocolStateService);
//
//   languages = input.required<RadarOption[]>();
//
//   label = input.required<string | undefined>();
//   placeholder = input<string>('');
//   required = input<boolean>(false);
//   disabled = input<boolean>(false);
//   textarea = input<boolean>(false);
//   textareaRows = input<number>(3);
//   textareaAutosize = input<boolean>(false);
//
//   form = new FormGroup<Record<string, FormControl<string | null>>>({});
//
//   constructor() {
//     super();
//     effect(() => {
//       this.initializeLanguageControls();
//     });
//   }
//
//   override writeValue(value: Record<string, string>) {
//     if (value) {
//       this.initializeLanguageControls();
//       this.form.patchValue(value, { emitEvent: false });
//     } else {
//       this.form.reset();
//     }
//   }
//
//   // registerOnChange(fn: any) {
//   //   this.valueChangesSub?.unsubscribe();
//   //   this.valueChangesSub = this.form.valueChanges.subscribe(value => {
//   //     fn(value);
//   //   });
//   // }
//   //
//   // registerOnTouched(fn: any) {
//   //   this.onTouch = fn;
//   // }
//
//
//   private initializeLanguageControls() {
//     this.languages().forEach(lang => {
//       const languageString = lang.id.toString();
//       if (!this.form.contains(languageString)) {
//         this.form.addControl(
//           languageString,
//           new FormControl('', {
//             validators: this.required() ? CustomValidator.requiredValidator : undefined,
//             nonNullable: true
//           })
//         );
//       }
//     });
//   }
// }
