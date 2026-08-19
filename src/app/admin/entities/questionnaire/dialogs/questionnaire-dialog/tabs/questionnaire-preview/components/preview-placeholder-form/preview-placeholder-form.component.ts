import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {debounceTime} from 'rxjs/operators';
import {PreviewStore} from '../../services/preview.store';
import {parsePlaceholder, Placeholder} from '../../pipes/replace-placeholders.pipe';
import {AppQuestionnaireLanguage, DEFAULT_LANGUAGE} from '../../../../../../models/questionnaire';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';

type PlaceholderFormGroup = FormGroup<{
  questionnaireId: FormControl<string>;
  questionId: FormControl<string>;
  operator: FormControl<string>;
  startTimestamp: FormControl<string>;
  endTimestamp: FormControl<string>;
  value: FormControl<string>;
}>;

@Component({
  selector: 'app-preview-placeholder-form',
  templateUrl: 'preview-placeholder-form.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput
  ]
})
export class PreviewPlaceholderFormComponent implements OnInit {
  store = inject(QuestionnaireStore);
  previewState = inject(PreviewStore);

  private fb = inject(FormBuilder);

  entity = this.store.selected;
  selectedLanguage = (this.entity()?.defaultLanguage ?? [DEFAULT_LANGUAGE]) as AppQuestionnaireLanguage;

  protected loading = true;

  placeholders: Placeholder[] = [];

  placeholderForm = this.fb.group({
    placeholders: this.fb.array<PlaceholderFormGroup>([]),
  });

  get placeholderControls(): PlaceholderFormGroup[] {
    return this.placeholderForm.controls.placeholders.controls;
  }

  async ngOnInit(): Promise<void> {
    this.placeholders = this.findPlaceholders();
    console.log('Class: QuestionnairePreviewComponent, Function: initQuestionnaire, Line 67 placeholders' , this.placeholders);
    this.buildPlaceholderForm(this.placeholders);

    this.placeholderForm.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(change => {
      console.log('Class: QuestionnairePreviewComponent, Function: , Line 98 change' , change);
      this.previewState.placeholderAnswers.set(change);
    });

  }

  private buildPlaceholderForm(placeholders: Placeholder[]): void {
    const placeholderArray = this.placeholderForm.controls.placeholders;

    placeholderArray.clear();

    placeholders.forEach((placeholder) => {
      placeholderArray.push(this.fb.nonNullable.group({
        questionnaireId: placeholder.questionnaireId ?? '',
        questionId: placeholder.questionId,
        operator: placeholder.operator ?? 'latest',
        startTimestamp: placeholder.startTimestamp ?? '',
        endTimestamp: placeholder.endTimestamp ?? '',
        value: '',
      }));
    });
  }

  findPlaceholders() {
    const result: string[] = [];

    this.entity()!.questions.forEach((question) => {
      result.push(...extractPlaceholders(question.field_label[this.selectedLanguage.code]));
      result.push(...extractPlaceholders(question.section_header?.[this.selectedLanguage.code]));
      result.push(...extractPlaceholders(question.field_note?.[this.selectedLanguage.code]));
      question.select_choices_or_calculations?.forEach((choice) => {
        result.push(...extractPlaceholders(choice.label[this.selectedLanguage.code]));
      });
    });

    const uniqueResult = [...new Set(result)];

    return uniqueResult.map((p) => {
      const placeholder = parsePlaceholder(p);
      if (!placeholder) {
        // Invalid placeholder, leave unchanged
        return null;
      }

      const {
        questionnaireId,
        questionId,
        operator,
        startTimestamp,
        endTimestamp,
      } = placeholder;

      if (questionnaireId) {
        return placeholder;
      }
      return null;
    }).filter((p) => p !== null);
  }
}

function extractPlaceholders(str?: string) {
  const matches = str?.match(/\[([^[\]]+)]/g);
  if (!matches) {
    return [];
  }
  return matches.map(match => match.slice(1, -1));
}
