import {
  Component, input,
  OnInit
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import { IonButton, IonDatetime } from '@ionic/angular/standalone'
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from '@angular/material/timepicker';
// import { LocalizationService } from '../../../../../../core/app-lifecycle/localization/localization.service'

export interface TaskTimer {
  duration: number
  secondsElapsed: number
  secondsRemaining: number
  hasStarted: boolean
  hasFinished: boolean
  displayTime: number
}


@Component({
  selector: 'app-time-input',
  templateUrl: 'time-input.component.html',
  imports: [
    FormsModule,
    TranslateModule,
    IonButton,
    IonDatetime,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatTimepickerToggle,
    MatTimepicker,
    MatTimepickerInput
  ]
})
export class TimeInputComponent extends BaseInputComponent implements OnInit {
  // private localizationService = inject(LocalizationService);

  isMeridianEnabled = input<boolean>(true);

  locale?: string;
  min?: string;
  max?: string;
  timePickerValue?: string;

  override ngOnInit(): void {
    super.ngOnInit();

    // this.locale = this.localizationService.currentLocale()?.locale ?? 'en-GB';
    this.calculateConstraints();

    const currentDate = new Date();
    if (this.selectedValue) {
      const {hour, minute, meridian} = JSON.parse(this.selectedValue);

      let parsedHour = +hour;
      const parsedMinute = +minute;

      if (meridian === 'PM' && parsedHour < 12) {
        parsedHour += 12;
      } else if (meridian === 'AM' && parsedHour === 12) {
        parsedHour = 0;
      }
      const finalHour = parsedHour > 23 ? parsedHour - 24 : parsedHour;

      currentDate.setUTCHours(finalHour, parsedMinute, 0, 0);
    } else {
      currentDate.setUTCHours(0,0,0,0)
    }
    this.timePickerValue = currentDate.toISOString();
  }

  private calculateConstraints() {
    const { field_annotation } = this.question()
    if (field_annotation.includes("@NOFUTURE")) {
      this.max = new Date().toISOString();
    }
    if (field_annotation.includes("@NOPAST")) {
      this.min = new Date().toISOString();
    }
  }

  // onPickerChange(isoString?: string) {
  //   const value =
  //   if (!isoString) return;
  //   this.timePickerValue = isoString;
  //   this.onInputChange(JSON.stringify(this.formatTime(isoString)));
  // }

  onPickerChange(event: Event) {
    const value = (event.target as HTMLInputElement).value
    if (!value) return;
    this.timePickerValue = value;
    this.onInputChange(JSON.stringify(this.formatTime(value)));
  }

  formatTime(isoString: string) {
    const date = new Date(isoString);

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    let meridian: 'AM' | 'PM' = 'AM';
    if (this.isMeridianEnabled()) {
      meridian = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // convert 0 to 12 for 12 AM
    }
    const formattedHour = String(hours).padStart(2, '0');

    return {
      hour: formattedHour,
      minute: minutes,
      meridian: meridian
    };
  }

  override onReset(): void {
    const currentDate = new Date();
    currentDate.setUTCHours(0,0,0,0);
    this.timePickerValue =  currentDate.toISOString();
    super.onReset();
  }
}
