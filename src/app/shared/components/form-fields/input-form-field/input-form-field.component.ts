import {Component, input} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {FieldTree, FormField,} from '@angular/forms/signals';
import {LabelFormFieldComponent} from '../label-form-field/label-form-field.component';

@Component({
  selector: 'app-input-form-field',
  templateUrl: './input-form-field.component.html',
  imports: [
    TranslatePipe,
    MatError,
    MatFormField,
    MatInput,
    FormField,
    LabelFormFieldComponent
  ]
})
export class InputFormFieldComponent {
  readonly label = input.required<string | null>();
  readonly field = input.required<FieldTree<string>>();

  readonly required = input(false);
  readonly appearance = input<'fill' | 'outline'>('outline');
  readonly subscriptSizing = input<'fixed' | 'dynamic'>('fixed');
  readonly type = input<string>('text');
  readonly errors = input<'none' | 'one' | 'all'>('one');
}
