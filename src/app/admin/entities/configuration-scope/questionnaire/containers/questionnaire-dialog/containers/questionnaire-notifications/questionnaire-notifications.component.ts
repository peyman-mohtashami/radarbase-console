import {Component, input, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../shared/utils/validators';
import {TextFormGroupComponent} from '../../components/text-form-group/text-form-group.component';
// import {QuestionnaireTimeUnit} from '../../../../protocol/models/protocol';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {UNITS} from '../../../../../protocol/containers/protocol-dialog/models/unit';

@Component({
  selector: 'app-questionnaire-notifications',
  templateUrl: 'questionnaire-notifications.component.html',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    TextFormGroupComponent,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption
  ]
})
export class QuestionnaireNotificationsComponent implements OnInit {
  protected readonly ValidatorError = ValidatorError;

  entity = input<AppQuestionnaire | undefined>();
  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  form = new FormGroup({
    schedule: new FormGroup({
      notification: new FormGroup({
        title: new FormControl<Record<string, string>>({}, {nonNullable: true}),
        text: new FormControl<Record<string, string>>({}, {nonNullable: true}),
        // title: new FormControl<string>('', {nonNullable: true}),
        // text: new FormControl<string>('', {nonNullable: true}),
      }),
      reminders: new FormGroup({
        enabled: new FormControl<boolean>(false, {nonNullable: true}),
        unit: new FormControl<string>('', {nonNullable: true}),
        amount: new FormControl<string>('', {nonNullable: true}),
        repeat: new FormControl<string>('', {nonNullable: true}),
      }),
    }),
  });

  ngOnInit() {
    const entity = this.entity();
    if (entity) {
      this.form.patchValue(entity);
    }

    this.valid.emit(this.form.valid);

    this.form.valueChanges.subscribe(change => {
      this.changeEvent.emit(change);
      this.valid.emit(this.form.valid);
    });
  }

  protected readonly UNITS = UNITS;
}
