import {
  Component, effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {DateAdapter, MatOption} from '@angular/material/core';

import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput, MatPrefix, MatSuffix} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker, MatEndDate, MatStartDate
} from "@angular/material/datepicker";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ValidatorError} from '../../../shared/utils/validators';
import {FormFieldType} from '../../models/dialog.model';
import {FilterItem} from '../../models/table.model';
import {format, isValid, Locale, parse} from 'date-fns';
import {enGB, nl, faIR} from 'date-fns/locale';
import {LocalDateComponent} from '../../../core/locale/components/local-date/local-date.component';
import {TagComponent} from '../../../shared/components/tag/tag.component';
import {LocaleService} from "../../../core/locale/services/locale.service";

export type FilterEvent = Record<string, string | null | undefined>

@Component({
  selector: 'app-data-table-filter',
  templateUrl: './data-table-filter.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    TranslatePipe,
    MatIcon,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
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
  ]
})
export class DataTableFilterComponent implements OnInit, OnDestroy {
  protected readonly ValidatorError = ValidatorError;
  protected readonly FilterType = FormFieldType;

  localeService = inject(LocaleService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dateAdapter = inject(DateAdapter<unknown>);

  filters = input<FilterItem[]>([]);
  filterOpened = input<boolean>(true);

  filterChanged = output<FilterEvent>();
  filterEnableChanged = output<boolean>();

  form?: FormGroup;

  filterEnabled = false;

  advancedFilterEnabled = false;

  _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    effect(() => {
      const rawLocale = this.localeService.currentLocale()?.locale;
      const angularLocaleId = rawLocale === 'en-GB' ? 'en-GB' : rawLocale?.substring(0, 2);
      const dfLocaleMap: Record<string, Locale> = {'en': enGB, 'en-GB': enGB, 'nl': nl, 'fa': faIR};
      const dfLocale = angularLocaleId ? (dfLocaleMap[angularLocaleId] || enGB) : enGB;
      this.dateAdapter?.setLocale(dfLocale);
    });
  }

  ngOnInit(): void {
    this.advancedFilterEnabled = !!this.filters()?.find(filter => filter.advanced);

    const filterGroup = this.filters()?.reduce(
      (acc: Record<string, FormControl>, filterItem: FilterItem) => {
        if (
          filterItem.type === FormFieldType.RANGE_PICKER &&
          filterItem.names
        ) {
          acc[filterItem.names[0]] = new FormControl("");
          acc[filterItem.names[1]] = new FormControl("");
          return acc;
        }
        acc[filterItem.name] = new FormControl("");
        return acc;
      }, {}
    );

    this.form = new FormGroup(filterGroup)

    this.form?.valueChanges
      .pipe(debounceTime(300), takeUntil(this._destroy$))
      .subscribe(() => {
        const formValue = {...this.form?.value};
        this.filters()?.map((filter) => {
          if (filter.type === FormFieldType.DATEPICKER && filter.name) {
            if (formValue[filter.name]) {
              formValue[filter.name] = format(formValue[filter.name], 'yyyy-MM-dd')
            }
          }

          if (filter.type === FormFieldType.RANGE_PICKER && filter.names) {
            if (formValue[filter.names[0]]) {
              formValue[filter.names[0]] = format(formValue[filter.names[0]], 'yyyy-MM-dd');
            }
            if (formValue[filter.names[1]]) {
              formValue[filter.names[1]] = format(formValue[filter.names[1]], 'yyyy-MM-dd');
            }
          }
        });
        if (this.form?.controls) {
          this.filterEnabled = Object.keys(this.form?.controls).some(
            (formKey) => this.form?.controls[formKey].value
          );
          this.filterEnableChanged.emit(this.filterEnabled);
        }
        this.applyStateChangesToUrlQueryParams(formValue);
        this.filterChanged.emit(formValue);
      });

    this.checkActiveFilterQuery();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  removeFilter(filter: FilterItem) {
    if (filter.type === FormFieldType.RANGE_PICKER && filter.names) {
      this.form?.get([filter.names[0]])?.reset();
      this.form?.get([filter.names[1]])?.reset();
    } else {
      this.form?.get([filter.name])?.reset();
    }
  }

  resetFilters(): void {
    this.filterEnabled = false;
    this.filterEnableChanged.emit(this.filterEnabled);
    this.form?.reset();
  }

  private checkActiveFilterQuery(): void {
    // todo patch or set
    let noFilter = true;
    this.filters()?.map((filter) => {
      if (filter.type === FormFieldType.RANGE_PICKER && filter.names) {
        const filterValueFrom =
          this.activatedRoute.snapshot.queryParams[filter.names[0]];
        if (filterValueFrom) {
          const parsedDateFrom = parse(filterValueFrom, 'yyyy-MM-dd', new Date());
          if (isValid(parsedDateFrom)) {
            noFilter = false;
            this.form?.get([filter.names[0]])?.setValue(parsedDateFrom);
          }
        }
        const filterValueTo =
          this.activatedRoute.snapshot.queryParams[filter.names[1]];
        if (filterValueTo) {
          const parsedDateTo = parse(filterValueTo, 'yyyy-MM-dd', new Date());

          if (isValid(parsedDateTo)) {
            noFilter = false;
            this.form?.get([filter.names[1]])?.setValue(parsedDateTo);
          }
        }
      } else if (filter.type === FormFieldType.DATEPICKER) {
        const filterValue =
          this.activatedRoute.snapshot.queryParams[filter.name];
        if (filterValue) {
          const parsedDate = parse(filterValue, 'yyyy-MM-dd', new Date());
          if (isValid(parsedDate)) {
            noFilter = false;
            this.form?.get([filter.name])?.setValue(parsedDate);
          }
        }
      } else {
        const filterValue =
          this.activatedRoute.snapshot.queryParams[filter.name];
        if (filterValue) {
          noFilter = false;
          this.form?.get([filter.name])?.setValue(filterValue);
        }
      }
    });
    if (noFilter) {
      this.form?.reset();
    }
  }

  private applyStateChangesToUrlQueryParams(queryParams: Params): void {
    const currentUrlSegments = this.router.url.split('?')[0];
    this.router.navigate([decodeURIComponent(currentUrlSegments)], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      fragment: this.activatedRoute.snapshot.fragment ?? undefined,
    }).then();
  }
}
