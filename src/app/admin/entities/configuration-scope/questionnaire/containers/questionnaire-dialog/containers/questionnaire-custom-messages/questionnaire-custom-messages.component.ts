import {Component, input, OnDestroy, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestionnaire, DEFAULT_LANGUAGE} from '../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../shared/utils/validators';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {RadarOption} from '../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {MatOption, MatSelect} from '@angular/material/select';

export interface CustomMessagesForm {
  showIntroduction?: string;
  startText?: string;
  endText?: string;
  warningEnabled?: boolean;
  warn?: string;
  estimatedCompletionTime?: string;
}

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
    MatError,
  ]
})
export class QuestionnaireCustomMessagesComponent implements OnInit, OnDestroy {
  protected readonly ValidatorError = ValidatorError;

  entity = input<AppQuestionnaire | undefined>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  form = new FormGroup({
    showIntroduction: new FormControl<string>('no', {nonNullable: true}),
    startText: new FormControl<string>('', {nonNullable: true}),
    endText: new FormControl<string>('', {nonNullable: true}),
    warningEnabled: new FormControl<boolean>(false, {nonNullable: true}),
    warn: new FormControl<string>('', {nonNullable: true}),
    estimatedCompletionTime: new FormControl<string>('', {nonNullable: true}),
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

  getFormEntity(entity: AppQuestionnaire, language: RadarOption): CustomMessagesForm {
    return {
      ...entity,
      startText: entity.startText?.[language.id],
      endText: entity.endText?.[language.id],
      warn: entity.warn?.[language.id]
    };
  }

  getUpdatedEntity(originalEntity: AppQuestionnaire | undefined, formEntity: any): AppQuestionnaire {
    return {
      ...originalEntity,
      ...formEntity,
      startText: {...originalEntity?.startText, [this.defaultLang.id]: formEntity.startText ?? ''},
      endText: {...originalEntity?.endText, [this.defaultLang.id]: formEntity.endText ?? ''},
      warn: {...originalEntity?.warn, [this.defaultLang.id]: formEntity.warn ?? ''},
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
