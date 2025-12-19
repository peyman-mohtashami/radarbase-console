import {Component, inject, input, OnDestroy} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatStepperPrevious} from "@angular/material/stepper";
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors, Validator
} from "@angular/forms";
import {TextFormGroupComponent} from "../../components/custom-form-controls/text-form-group/text-form-group.component";
import {Subscription} from "rxjs";
import {RadarOption} from "../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {ProtocolStateService} from "../../services/protocol-state.service";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatFormField, MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-protocol-step-content',
  templateUrl: './protocol-step-content.html',
  imports: [
    MatDivider,
    MatIconButton,
    ReactiveFormsModule,
    TextFormGroupComponent,
    MatSelect,
    MatOption,
    MatFormField
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProtocolStepContent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProtocolStepContent
    }
  ],
})
export class ProtocolStepContent implements ControlValueAccessor, OnDestroy, Validator {
  protocolStateService = inject(ProtocolStateService);

  languages = input.required<RadarOption[]>();
  onDemand = input.required<boolean>();

  form = new FormGroup({
    showIntroduction: new FormControl<boolean>(true),
    startText: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    endText: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    warn: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    notification: new FormGroup({
      title: new FormControl<Record<string, string>>({}, {nonNullable: true}),
      text: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    }),
  });

  private valueChangesSub?: Subscription;

  validate(control: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};

    // Check main form controls
    Object.keys(this.form.controls).forEach(key => {
      const ctrl = this.form.get(key);
      if (ctrl?.errors) {
        errors[key] = ctrl.errors;
      }

      // Check nested form groups
      if (ctrl instanceof FormGroup) {
        Object.keys(ctrl.controls).forEach(nestedKey => {
          const nestedCtrl = ctrl.get(nestedKey);
          if (nestedCtrl?.errors) {
            errors[`${key}.${nestedKey}`] = nestedCtrl.errors;
          }

          // Handle nested form groups (like timer)
          if (nestedCtrl instanceof FormGroup) {
            Object.keys(nestedCtrl.controls).forEach(deepKey => {
              const deepCtrl = nestedCtrl.get(deepKey);
              if (deepCtrl?.errors) {
                errors[`${key}.${nestedKey}.${deepKey}`] = deepCtrl.errors;
              }
            });
          }
        });
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  ngOnDestroy() {
    this.valueChangesSub?.unsubscribe();
  }

  onChange = (value: any) => {};
  onTouch = () => {};

  writeValue(value?: Record<string, string>) {
    if (value) {
      this.form.patchValue(value, { emitEvent: true });
    } else {
      this.form.reset();
    }
  }

  registerOnChange(fn: any) {
    this.valueChangesSub?.unsubscribe();
    this.valueChangesSub = this.form.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  protected switchLanguage($event: any, language: RadarOption) {
    $event.stopPropagation();
    const validLanguage = this.languages().find(l => l.id === language.id) ?? this.languages()[0];
    this.protocolStateService.selectedLanguage.set(validLanguage.id.toString())
  }
}
