import {
  Component,
  computed,
  input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Field,
  FormField,
} from '@angular/forms/signals';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
  selector: 'app-searchable-multi-select',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
    FormField,
  ],
  templateUrl: './searchable-multi-select.html',
})
export class SearchableMultiSelectComponent<T extends object> {

  readonly formField = input.required<Field<any>>();

  readonly options = input.required<T[]>();

  readonly valueKey = input.required<keyof T>();
  readonly labelKey = input.required<keyof T>();


  readonly label = input<string>('');


  readonly placeholder = input<string>(
    'Select'
  );

  readonly multiple = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);

  readonly disabledItem = input<T>();

  readonly searchControl = new FormControl(
    '',
    {
      nonNullable: true,
    }
  );

  private readonly searchValue = toSignal(
    this.searchControl.valueChanges,
    {
      initialValue: '',
    }
  );

  readonly filteredOptions = computed(() => {
    const search = this.searchValue().trim().toLowerCase();
    const options = this.options();

    if (!search) {
      return options;
    }

    const labelKey = this.labelKey();

    return options.filter(option => {
      const label = String(option[labelKey]).toLowerCase();
      return label.includes(search);
    });
  });

  readonly selectedValues = computed(() => {
    const value = this.formField()().value();

    if (!value) {
      return [];
    }

    return Array.isArray(value)
      ? value
      : [value];
  });

  readonly selectedOptions = computed(() => {
    const values = this.selectedValues();
    const valueKey = this.valueKey();
    const options = this.options();
    const selectedOptions = options.filter(option =>  values.includes(`${option[valueKey]}`));

    const disabledOption = selectedOptions.find(i => i[this.valueKey()] === this.disabledItem()?.[this.valueKey()]);
    if (disabledOption) {
      return [
        disabledOption,
        ...selectedOptions.filter(i => i[this.valueKey()] !== this.disabledItem()?.[this.valueKey()])
      ];
    }
    return selectedOptions;
  });

  display(option: T): string {
    return String(option[this.labelKey()]);
  }

  remove(option: T): void {

    const field = this.formField()();
    const valueKey = this.valueKey();
    const selected = this.selectedValues();

    const newValue = selected.filter(value => value !== option[valueKey]);

    field.value.set(newValue);
  }

  trackByOption(_: number, option: T): unknown {
    return option[this.valueKey()];
  }
}
