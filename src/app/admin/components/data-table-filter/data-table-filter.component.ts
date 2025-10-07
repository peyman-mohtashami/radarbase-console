import {
  Component,
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

import {Store} from "@ngrx/store";
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
import {locale} from '../../../core/locale/store/locale.selectors';
import {isValid, parse} from 'date-fns';
import {LocalDateComponent} from '../../../core/locale/components/local-date/local-date.component';
import {TagComponent} from '../../../shared/components/tag/tag.component';

export interface FilterEvent {
  [key: string]: string | null | undefined;
}

@Component({
  selector: 'rb-data-table-filter',
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

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);
  private dateAdapter = inject(DateAdapter<any>);

  filters$ = input<FilterItem[]>([]);
  filterOpened$ = input<boolean>(true);

  filterChanged = output<FilterEvent>();
  filterEnableChanged = output<boolean>();

  form?: FormGroup;

  filterEnabled = false;

  dateFormat = 'mm/dd/yyy';
  advancedFilterEnabled = false;

  _destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.advancedFilterEnabled = !!this.filters$()?.find(filter => filter.advanced);

    this.store.select(locale).pipe(
      takeUntil(this._destroy$)
    ).subscribe((locale) => {
      this.dateAdapter?.setLocale(locale.currentLanguage?.locale);
      this.dateFormat = locale.currentLanguage?.dateFormat || 'mm/dd/yyy';
    });

    const filterGroup = this.filters$()?.reduce(
      (acc: { [key: string]: FormControl }, filterItem: FilterItem) => {
        if (
          filterItem.type === FormFieldType.RANGE_PICKER &&
          filterItem.names
        ) {
          acc[filterItem.names[0]] = new FormControl("");
          acc[filterItem.names[1]] = new FormControl("");
          return acc;
        }
        return (acc[filterItem.name] = new FormControl("")), acc;
      },
      {}
    );

    this.form = new FormGroup(filterGroup)

    this.form?.valueChanges
      .pipe(debounceTime(300), takeUntil(this._destroy$))
      .subscribe(() => {
        const formValue = {...this.form?.value};
        this.filters$()?.map((filter) => {
          if (filter.type === FormFieldType.DATEPICKER && filter.name) {
            if (formValue[filter.name]) {
              formValue[filter.name] =
                formValue[filter.name].format('YYYY-MM-DD');
            }
          }

          if (filter.type === FormFieldType.RANGE_PICKER && filter.names) {
            if (formValue[filter.names[0]]) {
              formValue[filter.names[0]] =
                formValue[filter.names[0]].format('YYYY-MM-DD');
            }
            if (formValue[filter.names[1]]) {
              formValue[filter.names[1]] =
                formValue[filter.names[1]].format('YYYY-MM-DD');
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
    this.filters$()?.map((filter) => {
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
    this.router.navigate([currentUrlSegments], {queryParams: queryParams}).then();
  }
}
