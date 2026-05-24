import {Component, input, OnDestroy, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {TextFormGroupComponent} from '../../components/text-form-group/text-form-group.component';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../shared/utils/validators';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {UNITS} from '../../../../../protocol/containers/protocol-dialog/models/unit';

@Component({
  selector: 'app-questionnaire-custom-messages',
  templateUrl: 'questionnaire-custom-messages.component.html',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    TextFormGroupComponent,
    MatFormField,
    MatOption,
    MatSelect,
    MatInput,
    MatSlideToggle,
  ]
})
export class QuestionnaireCustomMessagesComponent implements OnInit, OnDestroy {
  protected readonly ValidatorError = ValidatorError;

  entity = input<AppQuestionnaire | undefined>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  form = new FormGroup({
    // showIntroduction: new FormControl<string>('', {nonNullable: true}),
    // startText: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    endText: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    warningEnabled: new FormControl<boolean>(false, {nonNullable: true}),
    warn: new FormControl<Record<string, string>>({}, {nonNullable: true}),

    // schedule: new FormGroup({
    //   notification: new FormGroup({
    //     title: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    //     text: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    //   }),
    //   // reminders: new FormGroup({
    //   //   enabled: new FormControl<boolean>(false, {nonNullable: true}),
    //   //   unit: new FormControl<string>('', {nonNullable: true}),
    //   //   amount: new FormControl<string>('', {nonNullable: true}),
    //   //   repeat: new FormControl<string>('', {nonNullable: true}),
    //   // }),
    // }),
  });

  private subscription?: Subscription;

  ngOnInit() {
    const entity = this.entity();
    if (entity) {
      this.form.patchValue(entity);
    }

    this.valid.emit(this.form.valid);

    this.form.valueChanges.pipe(
      debounceTime(0)
    ).subscribe(change => {
      this.changeEvent.emit(change);
      this.valid.emit(this.form.valid);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  protected readonly UNITS = UNITS;
}
