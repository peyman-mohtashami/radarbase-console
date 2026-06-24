import {Component, inject, OnDestroy, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../shared/utils/validators';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {TextFormGroupComponent} from '../questionnaire-questions/text-form-group/text-form-group.component';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';

@Component({
  selector: 'app-questionnaire-custom-messages',
  templateUrl: 'questionnaire-custom-messages.component.html',
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
export class QuestionnaireCustomMessagesComponent implements OnInit, OnDestroy {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ValidatorError = ValidatorError;

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  form = new FormGroup({
    showIntroduction: new FormControl<string>('no', {nonNullable: true}),
    startText: new FormGroup({}),
    endText: new FormGroup({}),
    warningEnabled: new FormControl<boolean>(false, {nonNullable: true}),
    warn: new FormGroup({}),
    estimatedCompletionTime: new FormControl<string>('', {nonNullable: true}),
  });

  private subscription?: Subscription;

  ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      this.changeEvent.emit(change);
      this.valid.emit(this.form.valid);
    });

    const entity = this.dialogState.selectedQuestionnaire();
    if (entity) {
      this.form.patchValue(entity);
      this.valid.emit(this.form.valid);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
