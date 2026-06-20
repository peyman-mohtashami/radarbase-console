import {Component, input, OnDestroy, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../shared/utils/validators';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {UNITS} from '../../../../../protocol/containers/protocol-dialog/models/unit';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {TextFormGroupComponent} from '../../components/text-form-group/text-form-group.component';

@Component({
  selector: 'app-questionnaire-notifications',
  templateUrl: 'questionnaire-notifications.component.html',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    TextFormGroupComponent
  ]
})
export class QuestionnaireNotificationsComponent implements OnInit, OnDestroy {
  protected readonly UNITS = UNITS;
  protected readonly ValidatorError = ValidatorError;

  entity = input<AppQuestionnaire | undefined>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  form = new FormGroup({
    schedule: new FormGroup({
      notification: new FormGroup({
        title: new FormControl<Record<string, string>>({}, {nonNullable: true}),
        text: new FormControl<Record<string, string>>({}, {nonNullable: true}),
      }),
      reminders: new FormGroup({
        enabled: new FormControl<boolean>(false, {nonNullable: true}),
        unit: new FormControl<string>('', {nonNullable: true}),
        amount: new FormControl<string>('', {nonNullable: true}),
        repeat: new FormControl<string>('', {nonNullable: true}),
      }),
    }),
  });

  private subscription?: Subscription;

  ngOnInit() {
    const entity = this.entity();

    this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      this.changeEvent.emit({schedule: {...entity?.schedule, ...change.schedule}});
      this.valid.emit(this.form.valid);
    });

    if (entity) {
      this.form.patchValue(entity);
      this.valid.emit(this.form.valid);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
