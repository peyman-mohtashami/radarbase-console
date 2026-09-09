import {Component, input} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField} from '@angular/material/input';
import {FieldTree, FormField,} from '@angular/forms/signals';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-select-form-field',
  templateUrl: './select-form-field.component.html',
  imports: [
    TranslatePipe,
    MatError,
    MatFormField,
    FormField,
    MatOption,
    MatSelect,
  ]
})
export class SelectFormFieldComponent {
  readonly label = input.required<string>();
  readonly field = input.required<FieldTree<string>>();
  readonly options = input.required<readonly { value: string; label: string }[]>();

  readonly required = input(false);
  readonly appearance = input<'fill' | 'outline'>('outline');
  readonly subscriptSizing = input<'fixed' | 'dynamic'>('fixed');
}
