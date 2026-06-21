import {
  Component,
  inject, signal,
} from '@angular/core';
import {
  FormArray
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from "../../../../../base-entities/enums/dialog";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {AppQuestionnaire} from "../../models/questionnaire";
import {
  DialogBodyDescriptionComponent
} from "../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component";
import {
  DialogAction,
} from "../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component";
import {Observable} from 'rxjs';
import {
  BaseEntityDialogComponent
} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {
  DialogTitleComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
// import {QuestionnaireDialogStateService} from './services/questionnaire-dialog-state.service';
import {
  MatTab,
  MatTabContent,
  MatTabGroup,
  MatTabLabel,
} from '@angular/material/tabs';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {QuestionnaireGeneralComponent} from './containers/questionnaire-general/questionnaire-general.component';
import {QuestionnaireQuestionsComponent} from './containers/questionnaire-questions/questionnaire-questions.component';
import {
  QuestionnaireSchedulingComponent
} from './containers/questionnaire-scheduling/questionnaire-scheduling.component';
import {
  QuestionnaireNotificationsComponent
} from './containers/questionnaire-notifications/questionnaire-notifications.component';
import {
  QuestionnaireInterventionFlowComponent
} from './containers/questionnaire-intervention-flow/questionnaire-intervention-flow.component';
import {
  QuestionnaireJsonEditorComponent
} from './containers/questionnaire-json-editor/questionnaire-json-editor.component';
import {
  QuestionnaireCustomMessagesComponent
} from './containers/questionnaire-custom-messages/questionnaire-custom-messages.component';
import {QuestionnairePreviewComponent} from './containers/questionnaire-preview/questionnaire-preview.component';
import {
  QuestionnaireTranslationComponent
} from './containers/questionnaire-translation/questionnaire-translation.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ErrorMessageBoxComponent,
    DialogTitleComponent,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    MatTabContent,
    QuestionnaireGeneralComponent,
    QuestionnaireQuestionsComponent,
    QuestionnaireSchedulingComponent,
    QuestionnaireNotificationsComponent,
    QuestionnaireInterventionFlowComponent,
    QuestionnaireJsonEditorComponent,
    QuestionnaireCustomMessagesComponent,
    AsyncPipe,
    QuestionnairePreviewComponent,
    QuestionnaireTranslationComponent,
    MatIcon,
    MatButton,
    MatProgressSpinner,
    JsonPipe,
  ]
})
export class QuestionnaireDialogComponent extends BaseEntityDialogComponent<AppQuestionnaire> {
  // protected questionnaireStateService = inject(QuestionnaireDialogStateService);
  override configService = inject(QuestionnaireConfigService);
  override dialogRef = inject(MatDialogRef<QuestionnaireDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppQuestionnaire;
    questionnaireFullList: Observable<AppQuestionnaire[]>;
  };

  entity = signal(this.dialogData.entity);

  protected onEntityUpdate(event: Partial<AppQuestionnaire>) {
    const defined = Object.fromEntries(
      Object.entries(event).filter(([, v]) => v !== undefined)
    ) as Partial<AppQuestionnaire>;
    this.entity.set({...this.entity(), ...defined} as AppQuestionnaire);
  }

  sectionsValidity: any = {
    general: false,
    questions: true,
    scheduling: true,
    customMessages: true,
    notifications: true,
    translations: true
  }

  protected isLoading = false;

  onSectionValidEvent(name: string, valid: boolean) {
    console.log('Class: QuestionnaireDialogComponent, Function: onSectionValidEvent, Line 122 name, valid' , name, valid);
    this.sectionsValidity[name] = valid;
  }

  protected readonly DialogAction = DialogAction;

  protected override handleSaveAction(): void {
    // toValidAppQuestionnaire

    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: this.entity(),
    });
    // this.dialogActionEvent.emit({
    //   action: this.dialogData.mode,
    //   entity: {
    //     ...(this.dialogData.entity ?? ({} as T)),
    //     ...(this.form.getRawValue() as Partial<T>),
    //   } as T,
    // });
  }

  // override handleSaveAction(): void {
  //   const value = this.form.getRawValue();
  //   const updatedEntity: FormProtocol = {
  //     //...this.dialogData.entity,
  //     _name: value.general.name,
  //     ...value
  //   };
  //   const appProtocol = this.entityService.formToAppModel(updatedEntity);
  //   const radarProtocol = this.entityService.appToRadarModel(appProtocol);
  //   this.dialogActionEvent.emit({
  //     action: this.dialogData.mode,
  //     entity: appProtocol,
  //   });
  // }

  protected override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }
}

export function moveItemInFormArray(
  formArray: FormArray,
  fromIndex: number,
  toIndex: number
): void {
  const dir = toIndex > fromIndex ? 1 : -1;

  const item = formArray.at(fromIndex);
  for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
    const current = formArray.at(i + dir);
    formArray.setControl(i, current);
  }
  formArray.setControl(toIndex, item);
}
