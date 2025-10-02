import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from "../../../admin/enums/dialog";
import {ValidatorError, ValidatorHint} from "../../utils/validators";
import {FormFieldConfig} from "../../../admin/models/dialog.model";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {locale} from "../../../core/locale/store/locale.selectors";
import {Store} from "@ngrx/store";
// import {ProjectStatus} from "@rb/models";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatSelectAutocompleteComponent} from "../mat-select-autocomplete/mat-select-autocomplete.component";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ProjectStatus} from '../../../admin/entities/project/models/project';
// import {ProjectStatus} from '../../../admin/entities/organization/models/organization';
// import {ProjectStatus} from '../../models/radar-project.model';

@Component({
  selector: 'rb-dynamic-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    MatSelectAutocompleteComponent,
    MatSlideToggle,
  ],
  templateUrl: './dynamic-input.component.html',
})
export class DynamicInputComponent implements OnInit {
  protected readonly DialogMode = DialogMode
  protected readonly floatLabel = false;

  protected readonly ValidatorError = ValidatorError;
  protected readonly ValidatorHint = ValidatorHint;

  @Input({required: true}) field: any;

  @Input({required: true}) name!: string;
  // @Input({required: true}) config!: FormFieldConfig;
  @Input({required: true}) control!: AbstractControl;
  @Input() mode: DialogMode = DialogMode.ADD;
  @Input() customValidators?: { duplicateValidator: (control: AbstractControl) => { duplicate: boolean } | null };
  // @Input() dynamicOptions?: any

  dateFormat = 'mm/dd/yyy';

  constructor(private store?: Store) {}

  get formControl(): FormControl {
    if (this.control instanceof FormControl) {
      return this.control as FormControl;
    }
    console.log('Class: DynamicInputComponent, Function: formControl, Line 56 "ERROR"' , "ERROR");
    return new FormControl();
  }
  get formGroup(): FormGroup {
    const t = this.control as FormGroup
    console.log('Class: DynamicInputComponent, Function: formGroup, Line 57 t.controls' , t.controls);
    console.log('Class: DynamicInputComponent, Function: formGroup, Line 56 this.control' , this.control);
    return this.control as FormGroup;
  };

  ngOnInit() {
    this.control?.updateValueAndValidity();
    this.store?.select(locale)
      // .pipe(takeUntil(this.subscription$))
      .subscribe((locale) => {
        // this.dateAdapter?.setLocale(locale.currentLanguage?.locale);
        this.dateFormat = locale.currentLanguage?.dateFormat || 'mm/dd/yyy';
      });
  }

  protected readonly ProjectStatus = ProjectStatus;

}
