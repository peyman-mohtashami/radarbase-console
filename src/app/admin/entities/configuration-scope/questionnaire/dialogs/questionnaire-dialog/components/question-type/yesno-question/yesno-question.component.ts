import {Component, inject, Input, InputSignal, output, signal, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../models/questionnaire';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../containers/questionnaire-preview/pipes/replace-placeholders.pipe';

@Component({
  selector: 'app-yesno-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatFormField,
    MatOption,
    MatSelect,
    MatButton,
    MatRadioButton,
    MatRadioGroup,
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './yesno-question.component.html'
})
export class YesNoQuestionComponent {
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.questionnaire()!.defaultLanguage);// ?? DEFAULT_LANGUAGE);// InputSignal<RadarOption>;
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: AppQuestionnaireLanguage[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{ value: string}>;

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();
  protected yesNoOptions: {code: string, label: {[key: string]: string}}[] = [
    {
      code: '1',
      label: {
        en: 'Yes',
        it: 'Sì',
        nl: 'Ja',
        es: 'Sí',
        fr: 'Oui',
        pl: 'Tak',
        he: 'כן',
        da: 'Ja',
        de: 'Ja'
      }
    },
    {
      code: '0',
      label: {
        en: 'No',
        it: 'No',
        nl: 'Nee',
        es: 'No',
        fr: 'Non',
        pl: 'Nie',
        he: 'לא',
        da: 'Nej',
        de: 'Nein'
      }
    }
  ]

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }
}
