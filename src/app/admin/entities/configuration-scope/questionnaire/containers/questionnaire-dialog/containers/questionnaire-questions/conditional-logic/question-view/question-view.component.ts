import {Component, effect, inject, input, OnInit, output, signal, viewChild, ViewContainerRef} from '@angular/core'
// import {AppQuestion} from '../../../../models/questionnaire';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
// import {QuestionnaireStateService} from '../../services/questionnaire-state.service';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent, MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {ReplacePlaceholdersPipe} from '../../../questionnaire-preview/pipes/replace-placeholders.pipe';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatNativeDateModule} from '@angular/material/core';
import {distinctUntilChanged, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {QUESTION_COMPONENTS} from '../../../../components/question-type/question-type.registry';
// import {ReplacePlaceholdersPipe} from '../../questionnaire-preview/pipes/replace-placeholders.pipe';

enum TEXT_INPUT_PRESENTATION_TYPE {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  TEL = 'tel',
  URL = 'url'
}

enum TEXT_INPUT_TYPE {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  INTEGER = 'integer',
  TEL = 'tel',
  URL = 'url',
  NHS_NUMBER = 'nhs'
}

const TEXT_INPUT_TYPES: Record<string, any> = {
  [TEXT_INPUT_TYPE.TEXT]: TEXT_INPUT_PRESENTATION_TYPE.TEXT,
  [TEXT_INPUT_TYPE.EMAIL]: TEXT_INPUT_PRESENTATION_TYPE.EMAIL,
  [TEXT_INPUT_TYPE.NUMBER]: TEXT_INPUT_PRESENTATION_TYPE.NUMBER,
  [TEXT_INPUT_TYPE.INTEGER]: TEXT_INPUT_PRESENTATION_TYPE.NUMBER,
  [TEXT_INPUT_TYPE.TEL]: TEXT_INPUT_PRESENTATION_TYPE.TEL,
  [TEXT_INPUT_TYPE.URL]: TEXT_INPUT_PRESENTATION_TYPE.URL,
  [TEXT_INPUT_TYPE.NHS_NUMBER]: TEXT_INPUT_PRESENTATION_TYPE.NUMBER,
}


@Component({
  selector: 'app-question-view',
  templateUrl: 'question-view.component.html',
  imports: [
    MatRadioButton,
    MatRadioGroup,
    MatButton,
    MatSlider,
    MatSliderThumb,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatDatepicker,
    MatDatepickerInput,
    MatHint,
    MatLabel,
    ReplacePlaceholdersPipe,
    MatDatepickerToggle,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class QuestionViewComponent implements OnInit {

  question = input.required<AppQuestion>();
  operator = input.required<string>();
  conditionalLogicItem = input<ConditionalLogicItem>();
  questionnaireStateService = inject(QuestionnaireDialogStateService);
  selectionChange = output<any>();

  textInputType: any = TEXT_INPUT_PRESENTATION_TYPE.TEXT;
  rangeItems: string[] = [];

  private inputChanges$ = new Subject<string>();

  host = viewChild('questionHost', { read: ViewContainerRef });

  constructor() {
    effect(() => this.loadQuestionEditor());
  }

  private loadQuestionEditor(): void {
    const host = this.host();
    if (!host) return;
    host.clear();
    // console.log('***Class: QuestionViewComponent, Function: loadQuestionEditor, Line 103 this.question()' , this.question());
    const componentType = QUESTION_COMPONENTS[this.question().field_type];
    const componentRef = host.createComponent(componentType);
    componentRef.instance.type = 'cl-view';
    // componentRef.instance.language = signal();//this.language;
    componentRef.instance.entity = this.question;
    componentRef.instance.value = this.conditionalLogicItem()?.value;
    componentRef.instance.operator = this.operator();

    componentRef.instance.valueChange.subscribe((value: any) => {
      console.log('Child emitted value:', value);

      // handle it here
      // this.handleChildValueChange(value);
      this.selectionChange.emit(value);
    });

  }

  ngOnInit() {
    const { text_validation_type_or_show_slider_number: type } =
      this.question();
    this.textInputType = TEXT_INPUT_TYPES[type ?? TEXT_INPUT_TYPE.TEXT];

    const range = this.question().range;
    if (range) {
      const { min, max, step } = range;
      this.rangeItems = Array.from(
        { length: (max - min) / (step ?? 1) + 1 },
        (_, i) => `${min + i * (step ?? 1)}`
      );
    }

    this.inputChanges$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.updateValue(value);
      });
  }

  protected onInputChange(value: any) {
    this.selectionChange.emit(value);
  }

  // protected onInputStringChange(event: Event) {
  //   this.selectionChange.emit((event.target as HTMLInputElement).value);
  // }

  onInputStringChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputChanges$.next(value);
  }

  private updateValue(value: string): void {
    this.selectionChange.emit(value);
  }

  protected onDateChange(event: MatDatepickerInputEvent<any>) {
    this.onInputChange(event.value)
  }
}
