import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
  IonButton,
  IonDatetime,
} from '@ionic/angular/standalone'
import { TranslateModule } from '@ngx-translate/core'
import { addIcons } from 'ionicons'
import { calendar } from 'ionicons/icons'
// import { LocalizationService } from '../../../../../../core/app-lifecycle/localization/localization.service'
import { BaseInputComponent } from '../base-input/base-input.component'
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';

/**
 * Component for handling date inputs in a question.
 * Manages user interactions and value changes.
 */
@Component({
  selector: 'app-date-input',
  templateUrl: 'date-input.component.html',
  imports: [
    FormsModule,
    // IonDatetime,
    TranslateModule,
    // IonButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerInput,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
  ]
})
export class DateInputComponent extends BaseInputComponent implements OnInit {
  locale = 'en-GB'
  presentation = 'date'
  min?: string
  max?: string

  // constructor(private localizationService: LocalizationService) {
  //   super()
  //   addIcons({ calendar })
  // }

  override ngOnInit() {
    super.ngOnInit()
    // this.locale = this.localizationService.currentLocale()?.locale ?? 'en-GB';
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
    if (field_annotation.includes('@NOFUTURE')) {
      this.max = new Date().toISOString()
    }
    if (field_annotation.includes('@NOPAST')) {
      this.min = new Date().toISOString()
    }
    if (text_validation_min) {
      this.min = text_validation_min
    }
    if (text_validation_max) {
      this.max = text_validation_max
    }
  }

  onDateChange(event: any) {
    this.onInputChange(event.detail.value)
  }
}


