import {Component, inject, OnInit, output, ChangeDetectionStrategy} from '@angular/core';
import {
  AppQuestionnaire,
  AppQuestionnaireLanguage,
  DEFAULT_LANGUAGE,
  ISO_LANGUAGES
} from '../../../../models/questionnaire';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  MatSelectAutocompleteAdapter,
  MatSelectAutocompleteComponent
} from '../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {TranslatePipe} from '@ngx-translate/core';
import {debounceTime} from 'rxjs/operators';
import {TextFormGroupComponent} from '../questionnaire-questions/text-form-group/text-form-group.component';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-questionnaire-translation',
  templateUrl: 'questionnaire-translation.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatSelectAutocompleteComponent,
    ReactiveFormsModule,
    TranslatePipe,
    TextFormGroupComponent,
    JsonPipe,
  ]
})
export class QuestionnaireTranslationComponent implements OnInit {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;

  valid = output<boolean>();

  form = new FormGroup({
    languages: new FormControl<AppQuestionnaireLanguage[]>([this.dialogState.questionnaire()?.defaultLanguage ?? DEFAULT_LANGUAGE], {nonNullable: true}),
    title: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
    description: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
    endText: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
    warn: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
    schedule: new FormGroup({
      notification: new FormGroup({
        title: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
        text: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
      }),
    }),
    questions: new FormArray<FormGroup>([]),
  });

  entity?: AppQuestionnaire;

  numberOfRows = 0;

  languageAdapter: MatSelectAutocompleteAdapter<AppQuestionnaireLanguage> = {
    value: l => l.code,
    label: l => l.label
  };

  ngOnInit() {

    const entity = this.dialogState.questionnaire();
    this.entity = entity;
    if (entity) {
      const t = entity.questions?.reduce((acc, curr) => {
        return acc + 2 + (curr.field_note?.[entity.defaultLanguage.code] ? 1 : 0) + (curr.section_header?.[entity.defaultLanguage.code] ? 1 : 0) + (curr.select_choices_or_calculations?.length ?? 0);
      }, 0);
      this.numberOfRows = 6 + (this.dialogState.questionnaire()?.warningEnabled ? 1 : 0) + (t ?? 0);

      const questionsFormGroup = entity.questions?.map(q => {
        const choices = q.select_choices_or_calculations?.map(c => new FormGroup({
          label: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
        })) ?? [];
        const formGroup: any = {
          field_label: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
          select_choices_or_calculations: new FormArray<FormGroup>(choices),
        };
        if (q.field_note?.[entity.defaultLanguage.code]) {
          formGroup['field_note'] = new FormGroup({})//new FormControl<Record<string, string>>({}, {nonNullable: true})
        }
        if (q.section_header?.[entity.defaultLanguage.code]) {
          formGroup['section_header'] = new FormGroup({})//new FormControl<Record<string, string>>({}, {nonNullable: true})
        }
        return new FormGroup(formGroup);
      });

      this.form = new FormGroup({
        languages: new FormControl<AppQuestionnaireLanguage[]>([entity.defaultLanguage], {nonNullable: true}),
        title: new FormGroup({}), //new FormControl<Record<string, string>>({}, {nonNullable: true}),
        description: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
        endText: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
        warn: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
        schedule: new FormGroup({
          notification: new FormGroup({
            title: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
            text: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
          }),
        }),
        questions: new FormArray<FormGroup>(questionsFormGroup ?? []),

      });

      this.form.patchValue({...entity});
    }

    this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      // console.log('Class: QuestionnaireTranslationComponent, Function: , Line 106 change' , change);
      // console.log('Class: QuestionnaireTranslationComponent, Function: , Line 107 {...entity, ...change}' , {...entity, ...change});
      const entity = this.dialogState.questionnaire();
      // this.dialogState.selectedQuestionnaire.set({...this.dialogState.selectedQuestionnaire(), schedule: {...this.dialogState.selectedQuestionnaire()?.schedule, ...change.schedule}} as AppQuestionnaire);

      // this.changeEvent.emit({
      //   ...entity,
      //   ...change,
      //   schedule: {
      //     ...entity?.schedule,
      //     ...change.schedule,
      //     notification: {
      //       ...entity?.schedule?.notification,
      //       ...change.schedule?.notification,
      //     },
      //   },
      //   questions: entity?.questions?.map((question, questionIndex) => {
      //     const questionChange = change.questions?.[questionIndex];
      //
      //     return {
      //       ...question,
      //       ...questionChange,
      //       select_choices_or_calculations: question.select_choices_or_calculations?.map((choice, choiceIndex) => ({
      //         ...choice,
      //         ...questionChange?.select_choices_or_calculations?.[choiceIndex],
      //         label: {
      //           ...choice.label,
      //           ...questionChange?.select_choices_or_calculations?.[choiceIndex]?.label,
      //         },
      //       })),
      //       field_label: {
      //         ...question.field_label,
      //         ...questionChange?.field_label,
      //       },
      //       field_note: {
      //         ...question.field_note,
      //         ...questionChange?.field_note,
      //       },
      //       section_header: {
      //         ...question.section_header,
      //         ...questionChange?.section_header,
      //       },
      //     };
      //   }),
      // });

      this.dialogState.questionnaire.set({
        ...entity,
        ...change,
        schedule: {
          ...entity?.schedule,
          ...change.schedule,
          notification: {
            ...entity?.schedule?.notification,
            ...change.schedule?.notification,
          },
        },
        questions: entity?.questions?.map((question, questionIndex) => {
          const questionChange = change.questions?.[questionIndex];

          return {
            ...question,
            ...questionChange,
            select_choices_or_calculations: question.select_choices_or_calculations?.map((choice, choiceIndex) => ({
              ...choice,
              ...questionChange?.select_choices_or_calculations?.[choiceIndex],
              label: {
                ...choice.label,
                ...questionChange?.select_choices_or_calculations?.[choiceIndex]?.label,
              },
            })),
            field_label: {
              ...question.field_label,
              ...questionChange?.field_label,
            },
            field_note: {
              ...question.field_note,
              ...questionChange?.field_note,
            },
            section_header: {
              ...question.section_header,
              ...questionChange?.section_header,
            },
          };
        }),
      } as AppQuestionnaire);

      this.valid.emit(this.form.valid);
    });

    // this.form.valueChanges.pipe(
    //   debounceTime(300)
    // ).subscribe(change => {
    //   this.changeEvent.emit({...entity, ...change, schedule: {...entity?.schedule, ...change.schedule}});
    //   this.valid.emit(this.form.valid);
    // });
  }

  protected asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
