import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../models/questionnaire';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';

@Component({
  selector: 'app-text-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
  ],
  templateUrl: './text-question.component.html'
})
export class TextQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);


  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.questionnaire()!.defaultLanguage);
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

  protected error: any;

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('text_validation_max')) {
        this.form.addControl(
          'text_validation_max',
          this.fb.control(this.entity().text_validation_max)
        );
      }
      if (!this.form.contains('multi_line')) {
        this.form.addControl(
          'multi_line',
          this.fb.control(this.entity().multi_line)
        );
      }
      if (!this.form.contains('matrix_group_name')) {
        this.form.addControl(
          'matrix_group_name',
          this.fb.control(this.entity().matrix_group_name)
        );
      }
    }
  }

  get text_validation_max(): FormControl {
    return this.form.get('text_validation_max') as FormControl;
  }


  get multi_line(): FormControl {
    return this.form.get('multi_line') as FormControl;
  }

  get matrix_group_name(): FormControl {
    return this.form.get('matrix_group_name') as FormControl;
  }

  protected onLogicInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.logicValueChange.emit(value);
  }

  protected onPreviewInputChange(event: Event | null) {
    if (event === null) {
      this.previewValueChange.emit(null);
      this.error = null;
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    this.validate(value);

    if (this.error === null) {
      this.previewValueChange.emit(value);
    } else {
      this.previewValueChange.emit(null);
    }
  }

  validate(valueString: string) {
    const regex = this.entity().text_validation_max;
    if (!regex) {
      this.error = null;
      return;
    }

    const isValid = matchesRegex(regex, valueString);

    if (!isValid) {
      this.error = "VALIDATION_ERROR";
      return;
    } else {
      this.error = null;
    }
  }
}


export function isValidRegex(pattern: string, flags: string = ''): boolean {
  try {
    new RegExp(pattern, flags);
    return true;
  } catch {
    return false;
  }
}

export function matchesRegex(pattern: string, value: string, flags: string = ''): boolean {
  try {
    const regex = new RegExp(pattern, flags);
    return regex.test(value);
  } catch {
    return false; // Invalid regex
  }
}


// email: ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
// url: ^https?:\/\/([A-Za-z0-9-]+\.)+[A-Za-z]{2,}(\/.*)?$
// international phone: ^\+?[1-9]\d{7,14}$
// Dutch post code: ^\d{4}\s?[A-Za-z]{2}$
// Numbers only	^\d+$
// Letters only	^[A-Za-z]+$
// Letters & numbers	^[A-Za-z0-9]+$
// Username (3–20 chars)	^[A-Za-z0-9_]{3,20}$
// Password (min 8 chars, upper, lower, digit)	^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
// Hex color	`^#?([A-Fa-f0-9]{6}
// IPv4	`^((25[0-5]
