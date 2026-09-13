import {Component, input} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatSuffix} from '@angular/material/input';
import {FieldTree, FormField,} from '@angular/forms/signals';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {LabelFormFieldComponent} from '../label-form-field/label-form-field.component';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

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
    LabelFormFieldComponent,
    MatIconButton,
    MatIcon,
    MatSuffix
  ]
})
export class SelectFormFieldComponent {
  readonly label = input.required<string | null>();
  readonly field = input.required<FieldTree<string>>();
  readonly options = input.required<readonly { value: string | boolean | number; label: string }[]>();

  readonly required = input(false);
  readonly appearance = input<'fill' | 'outline'>('outline');
  readonly subscriptSizing = input<'fixed' | 'dynamic'>('fixed');
  readonly errors = input<'none' | 'one' | 'all'>('one');
  readonly placeholder = input<string | null>(null);

  clearSelection(event: Event): void {
    event.stopPropagation(); // prevents the dropdown from opening
    this.field()().value.set('');
  }
}
