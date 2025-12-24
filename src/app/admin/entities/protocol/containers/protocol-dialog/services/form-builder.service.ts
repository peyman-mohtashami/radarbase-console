// import {FormControl, FormGroup} from "@angular/forms";
// import {Validator as CustomValidator, Validator} from "../../../../../../shared/utils/validators";
// import {Injectable} from "@angular/core";
//
// @Injectable({providedIn: 'root'})
// export class FormBuilderService {
//   createAnnotationFormGroup() {
//     return new FormGroup({
//       image: new FormControl(null, {validators: [CustomValidator.requiredValidator]}),
//       timer: new FormGroup({
//         start: new FormControl(null, {validators: [CustomValidator.requiredValidator]}),
//         end: new FormControl(null, {validators: [CustomValidator.requiredValidator]}),
//       }),
//       unit: new FormControl(null, {validators: [CustomValidator.requiredValidator]})
//     });
//   }
//
//   createRangeFormGroup() {
//     return new FormGroup({
//       min: new FormControl(null, {validators: [CustomValidator.requiredValidator]}),
//       max: new FormControl(null, {validators: [CustomValidator.requiredValidator]}),
//       step: new FormControl(null, {validators: [CustomValidator.requiredValidator]}),
//     });
//   }
//
//   createSelectChoiceOrCalculationFormArray() {
//     return new FormControl([], {validators: [CustomValidator.requiredValidator]});
//   }
// }
