import {
  Component,
  inject,
  OnInit,
  output,
  signal,
  ChangeDetectionStrategy,
  input, effect
} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {
  QuestionHeaderComponent
} from '../../../../questionnaire-preview/question/question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../../questionnaire-preview/pipes/replace-placeholders.pipe';
import {QuestionnaireDialogStateService} from '../../../../../services/questionnaire-dialog-state.service';
import {MatSelectChange} from '@angular/material/select';
import {QuestionChoicesComponent} from '../../question-choices/question-choices.component';
import {applyEach, form} from '@angular/forms/signals';
import {requiredField} from '../../../../../../../../../../shared/utils/signal-form-validators';

@Component({
  selector: 'app-info-question',
  imports: [
    TranslatePipe,
    MatIcon,
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
    QuestionChoicesComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './info-question.component.html'
})
export class InfoQuestionComponent implements OnInit {
  private dialogState = inject(QuestionnaireDialogStateService);

  type = input.required<'form' | 'button'| 'preview' | 'logic'>();
  entity = input.required<AppQuestion>();
  index = input.required<number>();
  language = input(this.dialogState.questionnaire()!.defaultLanguage);
  languages = input.required<AppQuestionnaireLanguage[]>();
  value = input.required<string>();
  operator = input.required<string>();
  answer = input.required<{ value: string}>();

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  model = signal({
    select_choices_or_calculations: [] as { code: string; label: string }[],
  });

  protected form = form(this.model, (schema) => {
    applyEach(schema.select_choices_or_calculations, (choice) => {
      requiredField(choice.code);
      requiredField(choice.label);
    });
  });

  formEvent = output<{isValid: boolean; formValue: any}>();

  constructor() {
    effect(() => {
      const model = this.model();
      this.formEvent.emit({
        isValid: this.form().valid(),
        formValue: {
          select_choices_or_calculations: [
            ...model.select_choices_or_calculations.map(((c, i) => ({
              code: c.code,
              label: {
                ...this.entity().select_choices_or_calculations?.[i].label,
                [this.dialogState.questionnaire()!.defaultLanguage.code]: c.label
              }
            })))
          ]
        },
      });
    });
  }

  ngOnInit(): void {
    if (this.type() === 'form') {
      this.model.set({
        select_choices_or_calculations:
          this.entity().select_choices_or_calculations?.map(c => ({
            code: c.code,
            label: c.label[this.dialogState.questionnaire()!.defaultLanguage.code]
          })) ?? [{code: '', label: ''}],
      });
    }
    if (this.type() === 'preview') {
      this.onPreviewInputChange(`${Date.now()}`);
    }
  }

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }

  // getFormValue(): {select_choices_or_calculations: {code: string, label: Record<string, string>}[]} {
  //   return {
  //     select_choices_or_calculations: [
  //       ...this.model().select_choices_or_calculations.map(((c, i) => ({
  //         code: c.code,
  //         label: {
  //           ...this.entity().select_choices_or_calculations?.[i].label,
  //           [this.dialogState.questionnaire()!.defaultLanguage.code]: c.label
  //         }
  //       })))
  //     ]
  //   };
  // }
}
