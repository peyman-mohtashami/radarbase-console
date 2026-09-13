import {Component, input} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {FieldTree} from '@angular/forms/signals';

@Component({
  selector: 'app-label-form-field',
  templateUrl: './label-form-field.component.html',
  imports: [
    TranslatePipe,
  ]
})
export class LabelFormFieldComponent {
  readonly label = input.required<string | null>();
  readonly field = input.required<FieldTree<unknown>>();

  readonly required = input(false);
}
