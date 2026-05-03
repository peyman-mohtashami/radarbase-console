import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
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
  imports: [FormsModule, ReplacePlaceholdersPipe, MatButton, MatSlider, MatSliderThumb],
})
export class SliderInputComponent extends BaseInputComponent {}
