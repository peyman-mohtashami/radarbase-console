import { Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'

import { BaseInputComponent } from '../base-input/base-input.component'
import {MatButton} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

/**
 * Component for handling yes/no radio button inputs in a question.
 * Manages user interactions and value changes.
 */
@Component({
  selector: 'app-yesno-input',
  templateUrl: 'yesno-input.component.html',
  imports: [TranslatePipe, MatButton, MatRadioButton, MatRadioGroup]
})
export class YesnoInputComponent extends BaseInputComponent {

  defaultYesNoResponse: {code: string; label: string;}[] = [
    { code: '1', label: 'Yes' },
    { code: '0', label: 'No' }
  ]
}
