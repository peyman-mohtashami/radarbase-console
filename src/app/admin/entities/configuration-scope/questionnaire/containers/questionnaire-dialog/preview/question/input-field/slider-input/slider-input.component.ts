import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonButton, IonLabel, IonRange } from '@ionic/angular/standalone'
// import { ReplacePlaceholdersPipe } from '../../../../pipes/replace-placeholders.pipe'
import { BaseInputComponent } from '../base-input/base-input.component'
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';

/**
 * Component for handling slider inputs in a question.
 * Manages user interactions and value changes.
 */
@Component({
  selector: 'app-slider-input',
  templateUrl: 'slider-input.component.html',
  imports: [FormsModule, IonRange, IonLabel, ReplacePlaceholdersPipe, IonButton, MatButton, MatSlider, MatSliderThumb],
  styles: [
    `
      ion-range::part(pin) {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        background: var(--color-primary);
        color: var(--color-on-primary);

        border-radius: 50%;
        transform: scale(1.01);

        top: -20px;

        min-width: 28px;
        height: 28px;
        transition: transform 120ms ease, background 120ms ease;
      }
    `
  ]
})
export class SliderInputComponent extends BaseInputComponent {}
