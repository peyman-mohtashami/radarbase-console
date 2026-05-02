import { Component, input, OnInit } from '@angular/core'
// import { IonButton } from '@ionic/angular/standalone'
// import { ReplacePlaceholdersPipe } from '../../../../pipes/replace-placeholders.pipe';
import { BaseInputComponent } from '../base-input/base-input.component';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-range-input',
  templateUrl: 'range-input.component.html',
  imports: [
    ReplacePlaceholdersPipe,
    // IonButton,
    MatButton,
  ]
})
export class RangeInputComponent extends BaseInputComponent implements OnInit {
  labelsDisabled = input<boolean>(false);

  items: string[] = [];

  override ngOnInit() {
    this.initializeRange();
    super.ngOnInit();
  }

  /**
   * Initializes the range values and generates items.
   */
  private initializeRange(): void {
    const choices = this.question().select_choices_or_calculations;
    if (choices) {
      const min = parseInt(choices[0].code);
      const max = parseInt(choices[choices.length - 1].code);
      this.items = Array.from({ length: max - min + 1 }, (_, i) => `${min + i}`);
    } else {
      const range = this.question().range;
      if (range) {
        const { min, max, step } = range;
        this.items = Array.from(
          { length: (max - min) / (step ?? 1) + 1 },
          (_, i) => `${min + i * (step ?? 1)}`
        );
      }
    }
  }
}
