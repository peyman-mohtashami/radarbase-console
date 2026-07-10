import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import jexl from 'jexl';

@Component({
  selector: 'app-calculation-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
  ],
  templateUrl: './calculation-question.component.html'
})
export class CalculationQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);


  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.selectedQuestionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{ value: string}>;

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();
  previewResult = signal('N/A');

  protected error: any;

  async ngOnInit(): Promise<void> {
    if (this.type === 'form') {
    //   if (!this.form.contains('multi_line')) {
    //     this.form.addControl(
    //       'multi_line',
    //       this.fb.control(this.entity().multi_line)
    //     );
    //   }
      if (!this.form.contains('calculation_fn')) {
        this.form.addControl(
          'calculation_fn',
          this.fb.control(this.entity().calculation_fn)
        );
      }
      if (!this.form.contains('calculation_args')) {
        this.form.addControl(
          'calculation_args',
          this.fb.control(this.entity().calculation_args)
        );
      }
    }
    if (this.type === 'preview') {
      const expression = this.entity().calculation_fn;
      const args = this.entity().calculation_args?.split(',');
      if (expression && args) {
        const context = args.reduce((acc: Record<string, any>, arg) => {
          acc[arg.trim()] = 10;
          return acc;
        }, {});
        this.previewResult.set(await jexl.eval(expression, context));
        console.log('Class: CalculationQuestionComponent, Function: ngOnInit, Line 82 result' , this.previewResult());
      }
      // const context = {
      //   height: 200,
      //   weight: 100,
      //   age: 5,
      // };


    }
  }

  //
  // "calculation_fn": "(phq8_1 || 0)|num + (phq8_2 || 0)|num + (phq8_3 || 0)|num + (phq8_4 || 0)|num + (phq8_5 || 0)|num + (phq8_6 || 0)|num + (phq8_7 || 0)|num + (phq8_8 || 0)|num;",
  // "calculation_args": "['phq8_1', 'phq8_2', 'phq8_3', 'phq8_4', 'phq8_5', 'phq8_6', 'phq8_7', 'phq8_8']"


  // get multi_line(): FormControl {
  //   return this.form.get('multi_line') as FormControl;
  // }
  //
  get calculation_fn(): FormControl {
    return this.form.get('calculation_fn') as FormControl;
  }

  get calculation_args(): FormControl {
    return this.form.get('calculation_args') as FormControl;
  }

  protected onLogicInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.logicValueChange.emit(value);
  }

  protected onPreviewInputChange(event: Event | null) {
    if (event === null) {
      this.previewValueChange.emit(null);
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    this.previewValueChange.emit(value);
  }
}
