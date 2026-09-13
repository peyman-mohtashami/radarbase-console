import {Component, computed, effect, inject, input, OnInit, output, signal,} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatPrefix, MatSuffix} from "@angular/material/input";
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {FormFieldType} from '../../models/dialog.model';
import {FilterItem} from '../../models/table.model';
import {format, isValid, parse} from 'date-fns';
import {LocalDateComponent} from '../../../../core/locale/components/local-date/local-date.component';
import {TagComponent} from '../../../../shared/components/tag/tag.component';
import {LocaleService} from "../../../../core/locale/services/locale.service";
import {form, FormField} from '@angular/forms/signals';
import {
  InputFormFieldComponent
} from '../../../../shared/components/form-fields/input-form-field/input-form-field.component';
import {
  SelectFormFieldComponent
} from '../../../../shared/components/form-fields/select-form-field/select-form-field.component';
import {
  DateFormFieldComponent
} from '../../../../shared/components/form-fields/date-form-field/date-form-field.component';

export type FilterEvent = Record<string, string | null | undefined>

@Component({
  selector: 'app-data-table-filter',
  templateUrl: './data-table-filter.component.html',
  imports: [
    MatFormField,
    TranslatePipe,
    MatIcon,
    MatDatepickerToggle,
    MatDateRangeInput,
    MatDateRangePicker,
    MatMenuTrigger,
    MatMenu,
    MatFormField,
    MatIconButton,
    MatEndDate,
    MatStartDate,
    MatSuffix,
    MatPrefix,
    LocalDateComponent,
    TagComponent,
    FormField,
    InputFormFieldComponent,
    SelectFormFieldComponent,
    DateFormFieldComponent,
  ]
})
export class DataTableFilterComponent implements OnInit {
  protected readonly FilterType = FormFieldType;

  localeService = inject(LocaleService);

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  filters = input<FilterItem[]>([]);
  _filters: FilterItem[] = [];
  filterOpened = input<boolean>(true);

  filterChanged = output<FilterEvent>();
  filterEnableChanged = output<boolean>();

  filterEnabled = false;
  // advFilterEnabled = false;

  advancedFilterEnabled = false;

  protected model = signal<Record<string, string>>({});

  protected form = form(this.model);

  readonly requestModel = computed(() => {
    const model = this.model();

    return this._filters.reduce((acc, filter) => {
      switch (filter.type) {
        case FormFieldType.RANGE_PICKER:
          if (filter.names) {
            if (model[filter.names[0]]) {
              acc[filter.names[0]] = format(model[filter.names[0]]!, 'yyyy-MM-dd');
            } else {
              acc[filter.names[0]] = null;
            }
            if (model[filter.names[1]]) {
              acc[filter.names[1]] = format(model[filter.names[1]]!, 'yyyy-MM-dd');
            } else {
              acc[filter.names[1]] = null;
            }
          }
          break;
        case FormFieldType.DATEPICKER:
          if (model[filter.name]) {
            acc[filter.name] = format(model[filter.name]!, 'yyyy-MM-dd');
          } else {
            acc[filter.name] = null;
          }
          break;
        default:
          if (model[filter.name]) {
            acc[filter.name] = model[filter.name];
          } else {
            acc[filter.name] = null;
          }
          break;
      }
      return acc;
    }, {} as Record<string, string | null>);
  });

  constructor() {
    effect(() => {
      const model = this.requestModel();
      this.applyStateChangesToUrlQueryParams(model);
      Object.entries(model).forEach(([key, value]) => {
        if (!value) {
          delete model[key];
        }
      });
      this.filterChanged.emit(model);
    });
  }

  ngOnInit(): void {
    this._filters = this.filters();
    this.model.set(this._filters.reduce((acc, filter) => {
      if (filter.type === FormFieldType.RANGE_PICKER && filter.names) {
        acc[filter.names[0]] = '';
        acc[filter.names[1]] = '';
      } else {
        acc[filter.name] = '';
      }
      return acc;
    }, {} as Record<string, string>));
    this.advancedFilterEnabled = !!this._filters?.find(filter => filter.advanced);
    this.checkActiveFilterQuery();
  }

  removeFilter(filter: FilterItem) {
    if (filter.type === FormFieldType.RANGE_PICKER && filter.names) {
      this.model.update((value) => {
        return {...value, [filter.names![0]]: ''};
      })
      this.model.update((value) => {
        return {...value, [filter.names![1]]: ''};
      })
    } else {
      this.model.update((value) => {
        return {...value, [filter.name]: ''};
      })
    }
  }

  resetFilters(): void {
    this.filterEnabled = false;
    this.filterEnableChanged.emit(this.filterEnabled);
    this.form().reset();
  }

  private checkActiveFilterQuery(): void {
    let noFilter = true;
    this._filters?.map((filter) => {
      if (filter.type === FormFieldType.RANGE_PICKER && filter.names) {
        const filterValueFrom = this.activatedRoute.snapshot.queryParams[filter.names[0]];
        if (filterValueFrom) {
          const parsedDateFrom = parse(filterValueFrom, 'yyyy-MM-dd', new Date());
          if (isValid(parsedDateFrom)) {
            noFilter = false;
            this.model.update((value) => {
              return {...value, [filter.names![0]]: filterValueFrom};
            });
          }
        }
        const filterValueTo =
          this.activatedRoute.snapshot.queryParams[filter.names[1]];
        if (filterValueTo) {
          const parsedDateTo = parse(filterValueTo, 'yyyy-MM-dd', new Date());

          if (isValid(parsedDateTo)) {
            noFilter = false;
            this.model.update((value) => {
              return {...value, [filter.names![1]]: filterValueTo};
            });
          }
        }
      } else if (filter.type === FormFieldType.DATEPICKER) {
        const filterValue =
          this.activatedRoute.snapshot.queryParams[filter.name];
        if (filterValue) {
          const parsedDate = parse(filterValue, 'yyyy-MM-dd', new Date());
          if (isValid(parsedDate)) {
            noFilter = false;
            this.model.update((value) => {
              return {...value, [filter.name]: filterValue};
            });
          }
        }
      } else {
        const filterValue = this.activatedRoute.snapshot.queryParams[filter.name];
        if (filterValue) {
          noFilter = false;
          this.model.update((value) => {
            return {...value, [filter.name]: filterValue};
          });
        }
      }
    });
    if (noFilter) {
      this.form().reset();
    }
  }

  private applyStateChangesToUrlQueryParams(queryParams: Params): void {
    const currentUrlSegments = this.router.url.split('?')[0];
    this.router.navigate([decodeURIComponent(currentUrlSegments)], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    }).then();
  }
}
