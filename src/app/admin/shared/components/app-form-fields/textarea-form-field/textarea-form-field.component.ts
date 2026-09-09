import {Component, input} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatHint, MatInput} from '@angular/material/input';
import {FieldTree, FormField,} from '@angular/forms/signals';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-textarea-form-field',
  templateUrl: './textarea-form-field.component.html',
  imports: [
    TranslatePipe,
    MatError,
    MatFormField,
    MatInput,
    FormField,
    MatHint,
    CdkTextareaAutosize,
  ]
})
export class TextareaFormFieldComponent {
  readonly label = input.required<string | null>();
  readonly field = input.required<FieldTree<string>>();

  readonly required = input(false);
  readonly appearance = input<'fill' | 'outline'>('outline');
  readonly subscriptSizing = input<'fixed' | 'dynamic'>('fixed');
  readonly rows = input(3);

  readonly simple = input(false);
}
