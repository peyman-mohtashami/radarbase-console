import {Component, input} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {FieldTree, FormField,} from '@angular/forms/signals';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {LabelFormFieldComponent} from '../label-form-field/label-form-field.component';

@Component({
  selector: 'app-date-form-field',
  templateUrl: './date-form-field.component.html',
  imports: [
    TranslatePipe,
    MatError,
    MatFormField,
    MatInput,
    FormField,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    LabelFormFieldComponent,
  ]
})
export class DateFormFieldComponent {
  readonly label = input.required<string>();
  readonly field = input.required<FieldTree<string>>();

  readonly required = input(false);
  readonly appearance = input<'fill' | 'outline'>('outline');
  readonly subscriptSizing = input<'fixed' | 'dynamic'>('fixed');
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly errors = input<'none' | 'one' | 'all'>('one');

}
