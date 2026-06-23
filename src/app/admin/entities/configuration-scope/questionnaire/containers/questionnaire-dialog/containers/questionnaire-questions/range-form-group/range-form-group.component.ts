// import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
// import {MatFormField, MatInput} from '@angular/material/input';
// import {MatError} from '@angular/material/form-field';
// import {TranslatePipe} from '@ngx-translate/core';
// import {Validator as CustomValidator} from "../../../../../../../../../shared/utils/validators";
// // import {
// //   BaseFormGroupComponent
// // } from '../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
// import {Component} from '@angular/core';
// import {
//   BaseFormGroupComponent
// } from '../../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
//
// @Component({
//   selector: 'app-range-form-group',
//   templateUrl: './range-form-group.component.html',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     MatFormField,
//     MatInput,
//     MatError,
//     TranslatePipe,
//   ],
//   providers: [
//     { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: RangeFormGroupComponent },
//     { provide: NG_VALIDATORS, multi: true, useExisting: RangeFormGroupComponent }
//   ]
// })
// export class RangeFormGroupComponent extends BaseFormGroupComponent<{min: number; max: number; step: number;}> {
//   override form = new FormGroup({
//     min: new FormControl<number | null>(null, {validators: [CustomValidator.requiredValidator]}),
//     max: new FormControl<number | null>(null, {validators: [CustomValidator.requiredValidator]}),
//     step: new FormControl<number | null>(null, {validators: [CustomValidator.requiredValidator]}),
//   });
// }
