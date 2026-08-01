import {Component, inject, OnDestroy, OnInit, output, ChangeDetectionStrategy} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../shared/utils/validators';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {TextFormGroupComponent} from '../questionnaire-questions/text-form-group/text-form-group.component';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {UNITS} from '../../models/unit';

@Component({
  selector: 'app-questionnaire-notifications',
  templateUrl: 'questionnaire-notifications.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    TextFormGroupComponent,
  ]
})
export class QuestionnaireNotificationsComponent implements OnInit, OnDestroy {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly UNITS = UNITS;
  protected readonly ValidatorError = ValidatorError;

  valid = output<boolean>();

  form = new FormGroup({
    schedule: new FormGroup({
      notification: new FormGroup({
        title: new FormGroup({}),
        text: new FormGroup({}),
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

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      const entity = this.dialogState.questionnaire();
      const formValue = this.form.getRawValue();
      const updated = {
        ...entity,
        schedule: {
          ...entity?.schedule,
          notification: {...entity?.schedule?.notification, ...formValue.schedule.notification},
          reminders: {...entity?.schedule?.reminders, ...formValue.schedule.reminders
          }
        }
      } as AppQuestionnaire;
      this.dialogState.questionnaire.set(updated);
      this.valid.emit(this.form.valid);
    });

    const entity = this.dialogState.questionnaire();
    if (entity) {
      this.form.patchValue(entity);
      this.valid.emit(this.form.valid);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
