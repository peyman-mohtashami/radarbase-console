// import {Component, inject, input} from '@angular/core';
// import {MatIconButton} from "@angular/material/button";
// import {MatDivider} from "@angular/material/divider";
// import {
//   FormControl,
//   FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
//   ReactiveFormsModule,
// } from "@angular/forms";
// import {TextFormGroupComponent} from "../../components/custom-form-controls/text-form-group/text-form-group.component";
// import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
// import {ProtocolStateService} from "../../services/protocol-state.service";
// import {MatFormField, MatSelect} from '@angular/material/select';
// import {MatOption} from '@angular/material/core';
// import {TranslatePipe} from '@ngx-translate/core';
// import {
//   BaseFormGroupComponent
// } from '../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
//
// @Component({
//   selector: 'app-protocol-step-content',
//   templateUrl: './protocol-step-content.html',
//   imports: [
//     MatDivider,
//     MatIconButton,
//     ReactiveFormsModule,
//     TextFormGroupComponent,
//     MatSelect,
//     MatOption,
//     MatFormField,
//     TranslatePipe
//   ],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: ProtocolStepContent
//     },
//     {
//       provide: NG_VALIDATORS,
//       multi: true,
//       useExisting: ProtocolStepContent
//     }
//   ],
// })
// export class ProtocolStepContent extends BaseFormGroupComponent<Record<string, string>> {
//   protocolStateService = inject(ProtocolStateService);
//
//   languages = input.required<RadarOption[]>();
//   onDemand = input.required<boolean>();
//
//   form = new FormGroup({
//     showIntroduction: new FormControl<boolean>(true),
//     startText: new FormControl<Record<string, string>>({}, {nonNullable: true}),
//     endText: new FormControl<Record<string, string>>({}, {nonNullable: true}),
//     warn: new FormControl<Record<string, string>>({}, {nonNullable: true}),
//     notification: new FormGroup({
//       title: new FormControl<Record<string, string>>({}, {nonNullable: true}),
//       text: new FormControl<Record<string, string>>({}, {nonNullable: true}),
//     }),
//   });
//
//   protected switchLanguage($event: Event, language: RadarOption) {
//     $event.stopPropagation();
//     const validLanguage = this.languages().find(l => l.id === language.id) ?? this.languages()[0];
//     this.protocolStateService.selectedLanguage.set(validLanguage.id.toString())
//   }
// }
