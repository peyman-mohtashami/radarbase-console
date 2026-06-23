import {Component, inject, input, OnInit, output} from '@angular/core';
import {AppQuestionnaire, DEFAULT_LANGUAGE, ISO_LANGUAGES} from '../../../../models/questionnaire';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RadarOption} from '../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {
  MatSelectAutocompleteComponent
} from '../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {TranslatePipe} from '@ngx-translate/core';
// import {TextFormGroupComponent} from '../../components/text-form-group/text-form-group.component';
import {debounceTime} from 'rxjs/operators';
import {TextFormGroupComponent} from '../questionnaire-questions/text-form-group/text-form-group.component';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';

@Component({
  selector: 'app-questionnaire-translation',
  templateUrl: 'questionnaire-translation.component.html',
  imports: [
    MatSelectAutocompleteComponent,
    ReactiveFormsModule,
    TranslatePipe,
    TextFormGroupComponent,
    // TextFormGroupComponent,
  ]
})
export class QuestionnaireTranslationComponent implements OnInit {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;

  // entity = input<AppQuestionnaire>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  form = new FormGroup({
    languages: new FormControl<RadarOption[]>([this.dialogState.selectedQuestionnaire()?.defaultLanguage ?? DEFAULT_LANGUAGE], {nonNullable: true}),
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

  numberOfRows = 0;

  ngOnInit() {

    const entity = this.dialogState.selectedQuestionnaire();
    if (entity) {
      const t = entity.questions?.reduce((acc, curr) => {
        return acc + 2 + (curr.field_note?.[entity.defaultLanguage.id] ? 1 : 0) + (curr.section_header?.[entity.defaultLanguage.id] ? 1 : 0) + (curr.select_choices_or_calculations?.length ?? 0);
      }, 0);
      this.numberOfRows = 6 + (this.dialogState.selectedQuestionnaire()?.warningEnabled ? 1 : 0) + (t ?? 0);

      const questionsFormGroup = entity.questions?.map(q => {
        const choices = q.select_choices_or_calculations?.map(c => new FormGroup({
          label: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
        })) ?? [];
        const formGroup: any = {
          field_label: new FormGroup({}),//new FormControl<Record<string, string>>({}, {nonNullable: true}),
          select_choices_or_calculations: new FormArray<FormGroup>(choices),
        };
        if (q.field_note?.[entity.defaultLanguage.id]) {
          formGroup['field_note'] = new FormGroup({})//new FormControl<Record<string, string>>({}, {nonNullable: true})
        }
        if (q.section_header?.[entity.defaultLanguage.id]) {
          formGroup['section_header'] = new FormGroup({})//new FormControl<Record<string, string>>({}, {nonNullable: true})
        }
        return new FormGroup(formGroup);
      });

      this.form = new FormGroup({
        languages: new FormControl<RadarOption[]>([entity.defaultLanguage], {nonNullable: true}),
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

      this.form.patchValue(entity);
    }

    this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      this.changeEvent.emit({...entity, ...change, schedule: {...entity?.schedule, ...change.schedule}});
      this.valid.emit(this.form.valid);
    });
  }

  protected asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
