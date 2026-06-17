import {Component, input, OnDestroy, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestionnaire, DEFAULT_LANGUAGE} from '../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../shared/utils/validators';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {UNITS} from '../../../../../protocol/containers/protocol-dialog/models/unit';
import {debounceTime} from 'rxjs/operators';
import {RadarOption} from '../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {Subscription} from 'rxjs';

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
    MatError
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

  defaultLang: RadarOption = DEFAULT_LANGUAGE;

  private subscription?: Subscription;

  ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      const updated = this.getUpdatedEntity(entity, change);
      this.changeEvent.emit(updated);
      this.valid.emit(this.form.valid);
    });

    const entity = this.entity();
    if (entity) {
      this.defaultLang = entity.defaultLanguage;
      const formEntity = this.getFormEntity(entity, this.defaultLang);
      this.form.patchValue(formEntity);
      this.valid.emit(this.form.valid);
    }
  }

  getFormEntity(entity: AppQuestionnaire, language: RadarOption): any {
    return {
      ...entity,
      schedule: {
        ...entity.schedule,
        notification: {
          title: entity.schedule?.notification?.title?.[language.id],
          text: entity.schedule?.notification?.text?.[language.id]
        }
      }
    };
  }

  getUpdatedEntity(originalEntity: AppQuestionnaire | undefined, formEntity: any): AppQuestionnaire {
    return {
      ...originalEntity,
      ...formEntity,
      schedule: {
        ...originalEntity?.schedule,
        ...formEntity.schedule,
        notification: {
          title: {...originalEntity?.schedule?.notification?.title, [this.defaultLang.id]: formEntity.schedule?.notification?.title ?? ''},
          text: {...originalEntity?.schedule?.notification?.text, [this.defaultLang.id]: formEntity.schedule?.notification?.text ?? ''}
        }
      },
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
