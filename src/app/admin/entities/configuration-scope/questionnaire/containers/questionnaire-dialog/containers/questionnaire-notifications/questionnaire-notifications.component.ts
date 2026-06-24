import {Component, inject, OnDestroy, OnInit, output} from '@angular/core';
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
import {TextFormGroupComponent} from '../questionnaire-questions/text-form-group/text-form-group.component';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';

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
    TextFormGroupComponent,
  ]
})
export class QuestionnaireNotificationsComponent implements OnInit, OnDestroy {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly UNITS = UNITS;
  protected readonly ValidatorError = ValidatorError;

  changeEvent = output<Partial<AppQuestionnaire>>();
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
    const entity = this.dialogState.selectedQuestionnaire();

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
