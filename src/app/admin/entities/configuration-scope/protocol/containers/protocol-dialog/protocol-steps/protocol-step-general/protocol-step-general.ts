import {Component, effect, inject, input, OnInit, output} from '@angular/core';
import {MatHint, MatInput} from "@angular/material/input";
import {
  MatSelectAutocompleteComponent
} from "../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
  AbstractControl,
  FormControl,
  FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {
  Validator as CustomValidator,
} from "../../../../../../../../shared/utils/validators";
import {DEFAULT_LANGUAGE, ISO_LANGUAGES} from "../../../../../questionnaire/models/questionnaire";
import {MatError} from "@angular/material/form-field";
import {MatFormField} from "@angular/material/select";
import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {AppProtocol} from "../../../../models/protocol";
import {toSignal} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs/operators";
import {ProtocolStateService} from "../../services/protocol-state.service";
import {
  BaseFormGroupComponent
} from '../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';

@Component({
  selector: 'app-protocol-step-general',
  templateUrl: './protocol-step-general.html',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatSelectAutocompleteComponent,
    MatSlideToggle,
    ReactiveFormsModule,
    TranslatePipe,
    MatHint
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProtocolStepGeneral
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProtocolStepGeneral
    }
  ],
})
export class ProtocolStepGeneral extends BaseFormGroupComponent<Record<string, string>> implements OnInit {

  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;
  protected readonly DEFAULT_LANG = DEFAULT_LANGUAGE;

  private protocolStateService = inject(ProtocolStateService);

  entities = input.required<AppProtocol[]>();
  entity = input<AppProtocol | undefined>();

  languagesUpdated = output<RadarOption[]>();
  typeUpdated = output<boolean>();

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [CustomValidator.requiredValidator, CustomValidator.stringIdValidator],
    }),
    languages: new FormControl<RadarOption[]>([this.DEFAULT_LANG], {nonNullable: true}),
    onDemand: new FormControl<boolean>(false),
    showInCalendar: new FormControl<boolean>(true),
    isDemo: new FormControl<boolean>(false),
    order: new FormControl<number>(0),
  });

  private readonly onDemandValueChanges = toSignal(
    this.form.controls.onDemand.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.onDemand.getRawValue()}
  );

  private readonly languagesValueChanges = toSignal(
    this.form.controls.languages.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.languages.getRawValue()}
  );

  constructor() {
    super();
    effect(() => {
      const onDemandValue = this.onDemandValueChanges();
      this.typeUpdated.emit(!!onDemandValue);
      const languagesValue = this.languagesValueChanges();
      this.languagesUpdated.emit(languagesValue);
      const selectedLanguage = this.protocolStateService.selectedLanguage();
      const validLanguage = languagesValue.find(l => l.id === selectedLanguage) ?? languagesValue[0];
      this.protocolStateService.selectedLanguage.set(validLanguage.id.toString())
    });
  }

  ngOnInit() {
    this.form.controls.name.addValidators(this.duplicateValidator);
  }


  private duplicateValidator = (control: AbstractControl) => {
    return this.entities()?.find(entity =>
      control.value === entity.name && this.entity()?.name !== entity.name
    )
      ? {duplicate: true}
      : null;
  };
}
