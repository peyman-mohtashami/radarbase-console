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

  readonly selectedValues = computed<T[]>(() => this.toArray(this.formField()().value()));

  readonly selectedOptions = computed<T[]>(() => {
    const valueKey = this.valueKey();
    const options = this.options();

    // Resolve the stored value against the option list so labels stay in sync
    // even when the value came from a partial/stale object.
    const selectedOptions = this.selectedValues().map(
      value => options.find(option => option[valueKey] === value[valueKey]) ?? value
    );

    const disabledOption = selectedOptions.find(i => i[valueKey] === this.disabledItem()?.[valueKey]);
    if (disabledOption) {
      return [
        disabledOption,
        ...selectedOptions.filter(i => i[valueKey] !== this.disabledItem()?.[valueKey])
      ];
    }
    return selectedOptions;
  });

  // mat-select compares option values by reference, which fails once the value
  // is an object coming from somewhere else than the options array.
  readonly compareWith = (a: T | null, b: T | null): boolean => {
    if (a === b) return true;
    if (!a || !b) return false;
    return a[this.valueKey()] === b[this.valueKey()];
  };

  display(option: T): string {
    return String(option[this.labelKey()]);
  }

  remove(option: T): void {

    const field = this.formField()();
    const valueKey = this.valueKey();

    if (!this.multiple()) {
      field.value.set(null);
      return;
    }

    const newValue = this.toArray(field.value())
      .filter(value => value[valueKey] !== option[valueKey]);

    field.value.set(newValue);
  }

  private toArray(value: unknown): T[] {
    if (!value) {
      return [];
    }

    return (Array.isArray(value) ? value : [value]) as T[];
  }

  trackByOption(_: number, option: T): unknown {
    return option[this.valueKey()];
  }
}
