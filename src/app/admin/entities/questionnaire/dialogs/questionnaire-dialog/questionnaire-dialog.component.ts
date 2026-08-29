import {
  Component,
  inject,
  OnInit, AfterViewInit
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from "../../../../shared/enums/dialog";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {AppQuestionnaire} from "../../models/questionnaire";
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {
  MatTab,
  MatTabContent,
  MatTabGroup,
  MatTabLabel,
} from '@angular/material/tabs';
import {JsonPipe} from '@angular/common';
import {QuestionnaireGeneralComponent} from './tabs/questionnaire-general/questionnaire-general.component';
import {QuestionnaireQuestionsComponent} from './tabs/questionnaire-questions/questionnaire-questions.component';
import {
  QuestionnaireSchedulingComponent
} from './tabs/questionnaire-scheduling/questionnaire-scheduling.component';
import {
  QuestionnaireNotificationsComponent
} from './tabs/questionnaire-notifications/questionnaire-notifications.component';
import {
  QuestionnaireInterventionFlowComponent
} from './tabs/questionnaire-intervention-flow/questionnaire-intervention-flow.component';
import {
  QuestionnaireJsonEditorComponent
} from './tabs/questionnaire-json-editor/questionnaire-json-editor.component';
import {
  QuestionnaireCustomMessagesComponent
} from './tabs/questionnaire-custom-messages/questionnaire-custom-messages.component';
import {QuestionnairePreviewComponent} from './tabs/questionnaire-preview/questionnaire-preview.component';
import {
  QuestionnaireTranslationComponent
} from './tabs/questionnaire-translation/questionnaire-translation.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ActivatedRoute} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {QuestionnaireStore} from '../../services/questionnaire.store';
import {QuestionnaireVariablesComponent} from './tabs/questionnaire-variables/questionnaire-variables.component';
import {RichTextEditorComponent} from '../../../../../shared/components/rich-text-editor/rich-text-editor.component';

export interface QuestionnaireForm {
  id: string; //TODO
}

export interface StoredQuestionnaireDialog {
  mode: DialogMode;
  entity?: AppQuestionnaire;
  model: QuestionnaireForm;
}

@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
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
    QuestionnairePreviewComponent,
    QuestionnaireTranslationComponent,
    MatIcon,
    MatButton,
    MatProgressSpinner,
    MatDialogTitle,
    JsonPipe,
    QuestionnaireVariablesComponent,
    // RichTextEditorComponent,
  ]
})
export class QuestionnaireDialogComponent implements OnInit, AfterViewInit {
  protected readonly DialogMode = DialogMode;

  protected localeService = inject(LocaleService);
  protected store = inject(QuestionnaireStore);
  private configService = inject(QuestionnaireConfigService);
  private dialogRef = inject(MatDialogRef<QuestionnaireDialogComponent>);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppQuestionnaire;
    questionnaireFullList: AppQuestionnaire[];
    restoredModel?: QuestionnaireForm;
  };

  formFields = this.configService.getFormFields();

  protected isLoading = false;

  //TODO CHECK
  ngOnInit() {
    this.store.selected.set(this.dialogData.entity ?? null);
  }


  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async save(): Promise<void> {
    const entity = this.store.selected();
    if (entity) {
      switch(this.dialogData.mode) {
        case DialogMode.ADD:
          await this.store.add(entity);
          break;
        case DialogMode.EDIT:
          await this.store.update(entity);
          break;
      }
      await this.store.publish();
    }

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    await this.store.publish();

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  // description = `
  //   <p>Hello <strong>world</strong>!</p>
  // `;
  //
  // onDescriptionChange(value: string): void {
  //   console.log(value);
  // }
}
