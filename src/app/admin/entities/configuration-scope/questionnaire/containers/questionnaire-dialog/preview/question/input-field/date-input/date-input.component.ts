import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';

/**
 * Component for handling date inputs in a question.
 * Manages user interactions and value changes.
 */
@Component({
  selector: 'app-date-input',
  templateUrl: 'date-input.component.html',
  imports: [
    FormsModule,
    TranslateModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerInput,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
  ],
  // providers: [provideNativeDateAdapter()],
  // changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DateInputComponent extends BaseInputComponent implements OnInit {
  locale = 'en-GB'
  presentation = 'date'
  min?: string
  max?: string

  override ngOnInit() {
    super.ngOnInit()
    const { text_validation_type_or_show_slider_number: type } =
      this.question()
    if (type?.includes('time')) {
      this.presentation = 'date-time'
    }
    this.calculateConstraints()
  }

  private calculateConstraints() {
    const { text_validation_min, text_validation_max, field_annotation } =
      this.question()
    // if (field_annotation?.includes('@NOFUTURE')) {
    //   this.max = new Date().toISOString()
    // }
    // if (field_annotation?.includes('@NOPAST')) {
    //   this.min = new Date().toISOString()
    // }
    if (text_validation_min) {
      this.min = text_validation_min
    }
    if (text_validation_max) {
      this.max = text_validation_max
    }
  }

  onDateChange(event: MatDatepickerInputEvent<any>) {
    this.onInputChange(event.value)
  }
}


