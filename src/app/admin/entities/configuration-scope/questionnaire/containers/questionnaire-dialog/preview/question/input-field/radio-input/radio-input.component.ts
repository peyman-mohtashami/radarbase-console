import { Component } from '@angular/core'
import { IonButton, IonItem, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
// import { ReplacePlaceholdersPipe } from '../../../../pipes/replace-placeholders.pipe';
import { BaseInputComponent } from '../base-input/base-input.component';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-radio-input',
  templateUrl: 'radio-input.component.html',
  imports: [
    IonRadioGroup,
    IonItem,
    IonRadio,
    ReplacePlaceholdersPipe,
    IonButton,
    MatRadioGroup,
    MatRadioButton,
    MatButton,
  ]
})
export class RadioInputComponent extends BaseInputComponent {}
