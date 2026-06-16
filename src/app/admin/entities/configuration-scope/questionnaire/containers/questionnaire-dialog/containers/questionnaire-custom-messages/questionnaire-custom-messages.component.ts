import {Component, input, OnDestroy, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../shared/utils/validators';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {TextFormGroupComponent} from '../../components/text-form-group/text-form-group.component';
import {MatFormField, MatInput} from '@angular/material/input';

@Component({
  selector: 'app-questionnaire-custom-messages',
  templateUrl: 'questionnaire-custom-messages.component.html',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatSlideToggle,
    TextFormGroupComponent,
    MatFormField,
    MatInput,
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

    const entity = this.entity();
    if (entity) {
      this.form.patchValue(entity);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
