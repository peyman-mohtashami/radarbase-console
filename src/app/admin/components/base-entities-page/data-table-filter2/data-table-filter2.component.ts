import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Moment } from 'moment';
import moment from 'moment/moment';
import {DateAdapter, MatOption} from '@angular/material/core';

import {Store} from "@ngrx/store";
import {FormFieldType} from "../../../models/dialog.model";
import {FilterItem} from "../../../models/table.model";
import {locale} from "../../../../core/locale/store/locale.selectors";
import {ValidatorError} from "../../../../shared/utils/validators";
import {NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {LocalDateComponent} from "../../../../core/locale/components/local-date/local-date.component";
import {MatSelect} from "@angular/material/select";
import {MatIconButton} from "@angular/material/button";

export interface FilterEvent {
  [key: string]: string | null | undefined;
}

@Component({
  selector: 'rb-data-table-filter2',
  templateUrl: './data-table-filter2.component.html',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    NgForOf,
    TranslatePipe,
    MatDatepickerToggle,
    MatDatepicker,
    MatDateRangeInput,
    MatDateRangePicker,
    MatInput,
    MatDatepickerInput,
    MatMenuTrigger,
    MatMenu,
    MatSelect,
    MatOption,
    MatChipListbox,
    MatChipOption,
    LocalDateComponent,
    MatIconButton
  ]
})
export class DataTableFilter2Component implements OnInit, OnDestroy {
  protected readonly ValidatorError = ValidatorError;

  FilterType = FormFieldType;

  @Output() filterChanged: EventEmitter<FilterEvent> =
    new EventEmitter<FilterEvent>();

  @Output() filterEnableChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() filters?: FilterItem[];

  form?: FormGroup;

  filterEnabled = false;

  _destroy$: Subject<void> = new Subject<void>();

  _isFilterOpened = true;
  @Input() set filterOpened(value: boolean) {
    this._isFilterOpened = value;
  }

  dateFormat = 'mm/dd/yyy';
  advancedFilterEnabled = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private dateAdapter?: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.advancedFilterEnabled = !!this.filters?.find(
      (filter) => filter.advanced
    );

    this.store.select(locale).pipe(
      takeUntil(this._destroy$)
    ).subscribe((locale) => {
        this.dateAdapter?.setLocale(locale.currentLanguage?.locale);
        this.dateFormat = locale.currentLanguage?.dateFormat || 'mm/dd/yyy';
    });

    const filterGroup = this.filters?.reduce(
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

    if (filterGroup) {
      filterGroup['search'] = new FormControl("");
    }

    this.form = new FormGroup(filterGroup)

    this.form?.valueChanges
      .pipe(debounceTime(300), takeUntil(this._destroy$))
      .subscribe(() => {
        const formValue = { ...this.form?.value };
        this.filters?.map((filter) => {
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
    this.filters?.map((filter) => {
      if (filter.type === FormFieldType.RANGE_PICKER && filter.names) {
        const filterValueFrom =
          this.activatedRoute.snapshot.queryParams[filter.names[0]];
        if (filterValueFrom) {
          const newDateFrom: Moment = moment(filterValueFrom);
          if (newDateFrom.isValid()) {
            noFilter = false;
            this.form?.get([filter.names[0]])?.setValue(newDateFrom);
          }
        }
        const filterValueTo =
          this.activatedRoute.snapshot.queryParams[filter.names[1]];
        if (filterValueTo) {
          const newDateTo: Moment = moment(filterValueTo);
          if (newDateTo.isValid()) {
            noFilter = false;
            this.form?.get([filter.names[1]])?.setValue(newDateTo);
          }
        }
      } else if (filter.type === FormFieldType.DATEPICKER) {
        const filterValue =
          this.activatedRoute.snapshot.queryParams[filter.name];
        if (filterValue) {
          const newDate: Moment = moment(filterValue);
          if (newDate.isValid()) {
            noFilter = false;
            this.form?.get([filter.name])?.setValue(newDate);
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
    this.router
      .navigate([], {
        replaceUrl: true,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      })
      .then();
  }
}
