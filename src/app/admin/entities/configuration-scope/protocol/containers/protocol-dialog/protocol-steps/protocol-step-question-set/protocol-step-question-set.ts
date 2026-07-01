// import {Component, effect, inject} from '@angular/core';
// import {
//   FormControl,
//   FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
//   ReactiveFormsModule,
// } from "@angular/forms";
// import {MatSlideToggle} from "@angular/material/slide-toggle";
// import {MatError, MatInput} from "@angular/material/input";
// import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
// import {Observable} from "rxjs";
// import {
//   Validator as CustomValidator,
// } from "../../../../../../../../shared/utils/validators";
// import {MatDivider} from "@angular/material/divider";
// import {toSignal} from "@angular/core/rxjs-interop";
// import {debounceTime} from "rxjs/operators";
// import {TranslatePipe} from "@ngx-translate/core";
// import {QuestionnaireService} from '../../../../../questionnaire/services/questionnaire.service';
// import {AppQuestionnaire} from '../../../../../questionnaire/models/questionnaire';
// import {AsyncPipe} from '@angular/common';
// import {
//   BaseFormGroupComponent
// } from '../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
// import {SelectedEntitiesService} from '../../../../../../../services/selected-entities.service';
//
// @Component({
//   selector: 'app-protocol-step-question-set',
//   templateUrl: './protocol-step-question-set.html',
//   imports: [
//     ReactiveFormsModule,
//     MatSlideToggle,
//     MatFormField,
//     MatInput,
//     MatSelect,
//     MatOption,
//     MatDivider,
//     MatError,
//     TranslatePipe,
//     AsyncPipe,
//   ],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: ProtocolStepQuestionSet
//     },
//     {
//       provide: NG_VALIDATORS,
//       multi: true,
//       useExisting: ProtocolStepQuestionSet
//     }
//   ],
// })
// export class ProtocolStepQuestionSet extends BaseFormGroupComponent<Record<string, string>> {
//
//   private questionnaireService = inject(QuestionnaireService);
//   private selectedEntitiesService = inject(SelectedEntitiesService)
//
//   form = new FormGroup({
//     github: new FormControl<boolean>(false),
//     questionnaire: new FormGroup({
//       name: new FormControl<string>('', {nonNullable: true}),
//       repository: new FormControl<string>('', {nonNullable: true}),
//       avsc: new FormControl<string>('questionnaire', {nonNullable: true}),
//     }),
//     appQuestionnaire: new FormControl('', {validators: [CustomValidator.requiredValidator]}),
//     estimatedCompletionTime: new FormControl<number | null>(null),
//   });
//
//   questionnaires: Observable<AppQuestionnaire[]>;
//
//   protected readonly githubValueChanges = toSignal(
//     this.form.controls.github.valueChanges.pipe(debounceTime(300)),
//     {initialValue: this.form.controls.github.getRawValue()}
//   );
//
//   constructor() {
//     super();
//     effect(() => {
//       const githubValue = this.githubValueChanges();
//       this.form.controls.questionnaire.controls.name.setValidators(!githubValue ? [] : [CustomValidator.requiredValidator]);
//       this.form.controls.questionnaire.controls.name.updateValueAndValidity({emitEvent: false});
//       this.form.controls.questionnaire.controls.repository.setValidators(!githubValue ? [] : [CustomValidator.requiredValidator]);
//       this.form.controls.questionnaire.controls.repository.updateValueAndValidity({emitEvent: false});
//       this.form.controls.appQuestionnaire.setValidators(githubValue ? [] : [CustomValidator.requiredValidator]);
//       this.form.controls.appQuestionnaire.updateValueAndValidity({emitEvent: false});
//
//       // IMPORTANT: tell Angular to re-run this component's validator
//       this.validatorChange();
//     });
//
//     // Also notify when the inner form’s status changes (covers field edits)
//     this.statusSub = this.form.statusChanges.subscribe(() => this.validatorChange());
//
//     const projectId = this.selectedEntitiesService.getSelected().project()?.projectName;
//     const subjectId = this.selectedEntitiesService.getSelected().subject()?.login;
//     this.questionnaires = this.questionnaireService.getWithQuery(undefined, projectId, subjectId);
//   }
// }
