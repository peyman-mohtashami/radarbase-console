import {
  Component,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormArray
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from "../../../../../base-entities/enums/dialog";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {AppQuestionnaire} from "../../models/questionnaire";
import {
  DialogAction,
} from "../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component";
import {Observable} from 'rxjs';
import {
  BaseEntityDialogComponent
} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {
  MatTab,
  MatTabContent,
  MatTabGroup,
  MatTabLabel,
} from '@angular/material/tabs';
import {AsyncPipe} from '@angular/common';
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
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {QuestionnaireDialogStateService} from './services/questionnaire-dialog-state.service';

@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    MatDialogContent,
    ErrorMessageBoxComponent,
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
    MatDialogTitle,
    MatIconButton,
  ]
})
export class QuestionnaireDialogComponent extends BaseEntityDialogComponent<AppQuestionnaire> {
  protected dialogState = inject(QuestionnaireDialogStateService);
  override configService = inject(QuestionnaireConfigService);
  override dialogRef = inject(MatDialogRef<QuestionnaireDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppQuestionnaire;
    questionnaireFullList: Observable<AppQuestionnaire[]>;
  };

  override ngOnInit() {
    super.ngOnInit();
    this.dialogState.questionnaire.set(this.dialogData.entity);
  }

  // protected onEntityUpdate(event: Partial<AppQuestionnaire>) {
  //   const defined = Object.fromEntries(
  //     Object.entries(event).filter(([, v]) => v !== undefined)
  //   ) as Partial<AppQuestionnaire>;
  //   console.log('Class: QuestionnaireDialogComponent, Function: onEntityUpdate, Line 103 defined' , defined);
  //   const selectedQuestionnaire = this.dialogState.selectedQuestionnaire();
  //   this.dialogState.selectedQuestionnaire.set({...selectedQuestionnaire, ...defined} as AppQuestionnaire);
  //   console.log('^111Class: QuestionnaireDialogComponent, Function: onEntityUpdate, Line 106 this.dialogState.selectedQuestionnaire()' , this.dialogState.selectedQuestionnaire());
  // }

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
    this.sectionsValidity[name] = valid;
  }

  protected readonly DialogAction = DialogAction;

  protected override handleSaveAction(): void {
    const entity = this.dialogState.questionnaire();
    if (entity) {
      console.log('Class: QuestionnaireDialogComponent, Function: handleSaveAction, Line 127 this.sectionsValidity' , this.sectionsValidity);
      entity.isValid = this.sectionsValidity.general && this.sectionsValidity.questions && this.sectionsValidity.scheduling && this.sectionsValidity.customMessages && this.sectionsValidity.notifications && this.sectionsValidity.translations;
    }
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: this.dialogState.questionnaire(),
    });
  }

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
