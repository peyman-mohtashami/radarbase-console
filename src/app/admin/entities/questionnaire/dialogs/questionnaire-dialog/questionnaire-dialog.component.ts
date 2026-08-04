import {
  Component,
  inject,
  ChangeDetectionStrategy, signal, effect, OnInit
} from '@angular/core';
import {
  FormArray
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {DialogMode} from "../../../../shared/enums/dialog";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {AppQuestionnaire} from "../../models/questionnaire";
// import {
//   DialogAction,
// } from "../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component";
import {Observable} from 'rxjs';
// import {
//   BaseEntityDialogComponent
// } from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {
  MatTab,
  MatTabContent,
  MatTabGroup,
  MatTabLabel,
} from '@angular/material/tabs';
import {AsyncPipe, JsonPipe} from '@angular/common';
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
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {QuestionnaireDialogStateService} from './services/questionnaire-dialog-state.service';
import {AppProject, CreateProjectDto, toProjectStatus, UpdateProjectDto} from '../../../project/models/project';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ProjectStore} from '../../../project/services/project.store';
import {OrganizationStore} from '../../../organization/services/organization.store';
import {ProjectConfigService} from '../../../project/services/project-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppOrganization, OrganizationDto} from '../../../organization/models/organization';
import {AppSourceType} from '../../../source-type/models/source-type';
import {disabled, validate} from '@angular/forms/signals';
import {longTextField, normalTextField, requiredField} from '../../../../../shared/utils/signal-form-validators';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {getLastSegment} from '../../../../shared/utils/route.util';
import {QuestionnaireStore} from '../../services/questionnaire.store';

export interface QuestionnaireForm {
  id: string;
  projectName: string,
  description: string;
  location: string;
  humanReadableProjectName: string,
  organizationName: string,
  organization: string,
  projectStatus: string,
  startDate: string,
  endDate: string,
  sourceTypes: number[],
  attributes: Record<string, string>,
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
    // AsyncPipe,
    QuestionnairePreviewComponent,
    QuestionnaireTranslationComponent,
    MatIcon,
    MatButton,
    MatProgressSpinner,
    MatDialogTitle,
    JsonPipe,
    // MatIconButton,
  ]
})
export class QuestionnaireDialogComponent implements OnInit {
  protected readonly DialogMode = DialogMode;

  protected localeService = inject(LocaleService);
  protected store = inject(QuestionnaireStore);
  protected dialogState = inject(QuestionnaireDialogStateService);
  private organizationStore = inject(OrganizationStore);
  private configService = inject(QuestionnaireConfigService);
  private dialogRef = inject(MatDialogRef<QuestionnaireDialogComponent>);
  // private router = inject(Router);
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

  // private model = signal<QuestionnaireForm>(this.dialogData.restoredModel ??{
  //   ...this.dialogData.entity,
  //   id: `${this.dialogData.entity?.id ?? ''}`,
  //   location: this.dialogData.entity?.location ?? '',
  //   description: this.dialogData.entity?.description ?? '',
  //   projectName: this.dialogData.entity?.projectName ?? '',
  //   humanReadableProjectName: this.dialogData.entity?.humanReadableProjectName ?? '',
  //   organizationName: this.dialogData.entity?.organizationName ?? '',
  //   organization: `${this.dialogData.entity?.organization.id ?? ''}`,
  //   projectStatus: `${this.dialogData.entity?.projectStatus ?? ''}`,
  //   startDate: this.dialogData.entity?.startDate ?? '',
  //   endDate: this.dialogData.entity?.endDate ?? '',
  //   sourceTypes: this.dialogData.entity?.sourceTypes?.map(s => s.id) ?? [],
  //   attributes: {
  //     ...this.dialogData.entity?.attributes,
  //     'Phase': this.dialogData.entity?.attributes?.['Phase'] ?? '',
  //     'Work-package': this.dialogData.entity?.attributes?.['Work-package'] ?? '',
  //     'External-project-url': this.dialogData.entity?.attributes?.['External-project-url'] ?? '',
  //     'External-project-id': this.dialogData.entity?.attributes?.['External-project-id'] ?? '',
  //     'Privacy-policy-url': this.dialogData.entity?.attributes?.['Privacy-policy-url'] ?? '',
  //   },
  // });
  //
  // protected form = form(this.model, (schema) => {
  //   disabled(schema.id);
  //   requiredField(schema.projectName);
  //   normalTextField(schema.projectName);
  //   disabled(schema.projectName, {when: () => !!this.dialogData.entity});
  //   validate(schema.projectName, ({value}) => {
  //     const matchedProject = this.dialogData.projectFullList?.find((project) => project.name === value());
  //     if (!matchedProject) return null;
  //     if (this.dialogData.entity?.name === value()) return null;
  //     return {
  //       kind: 'duplicate',
  //       message: 'SHARED.validatorError.duplicateName',
  //     };
  //   });
  //   normalTextField(schema.humanReadableProjectName);
  //   longTextField(schema.description);
  //   normalTextField(schema.location);
  //   requiredField(schema.organization);
  // });

  // minDate: Date = new Date(2000, 0, 1);
  // maxDate: Date = new Date(2050, 0, 1);

  // constructor() {
  //   effect(() => {
  //     const model = this.model();
  //     if (this.dialogData.mode === DialogMode.ADD || this.dialogData.mode === DialogMode.EDIT) {
  //       this.configService.setDialogState({
  //         mode: this.dialogData.mode,
  //         entity: this.dialogData.entity,
  //         model,
  //       });
  //     }
  //   });
  // }

  //TODO CHECK
  ngOnInit() {
    // super.ngOnInit();
    this.dialogState.questionnaire.set(this.dialogData.entity);
  }


  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async save(): Promise<void> {
    const entity = this.dialogState.questionnaire();
    if (entity) {
      entity.isValid = this.sectionsValidity.general && this.sectionsValidity.questions && this.sectionsValidity.scheduling && this.sectionsValidity.customMessages && this.sectionsValidity.notifications && this.sectionsValidity.translations;
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
    // switch(this.dialogData.mode) {
    //   case DialogMode.ADD:
    //     await this.store.add(entity);
    //     break;
    //   case DialogMode.EDIT:
    //     await this.store.update(entity);
    //     break;
    // }
    // await this.store.publish();

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    // this.navigateOnUpdateSuccess(this.model());
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    await this.store.publish();

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    // this.navigateOnDeleteSuccess();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  // navigateOnUpdateSuccess(model: QuestionnaireForm) {
  //   const selectedProject = this.store.selected();
  //   if (!selectedProject) return;
  //
  //   const urlTree = this.router.parseUrl(this.router.url);
  //   const organization = this.organizationStore.selected();
  //   if (!organization) return;
  //   this.router.navigate(['./admin/organizations', organization, 'projects', model.projectName, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  // }
  //
  // navigateOnDeleteSuccess() {
  //   const organization = this.organizationStore.selected();
  //   if (organization) {
  //     this.router.navigate(['/admin/organizations', organization], { queryParamsHandling: 'preserve' }).then();
  //   } else {
  //     this.router.navigate(['/admin/projects'], { queryParamsHandling: 'preserve' }).then();
  //   }
  // }

  // toCreateDtoModel(model: QuestionnaireForm): CreateQuestionnaireDto {
  //   return {
  //     ...model,
  //     organization: this.organizationStore.selected()!,
  //     projectStatus: toProjectStatus(this.model().projectStatus),
  //     sourceTypes: model.sourceTypes.map((s) => this.dialogData.sourceTypeFullList.find(i => i.id === s)).filter(s => !!s)
  //   };
  // }
  //
  // toUpdateDtoModel(model: QuestionnaireForm): UpdateQuestionnaireDto {
  //   return {
  //     ...model,
  //     id: Number(model.id),
  //     organization: this.organizationStore.selected()!,
  //     projectStatus: toProjectStatus(this.model().projectStatus),
  //     sourceTypes: model.sourceTypes.map((s) => this.dialogData.sourceTypeFullList.find(i => i.id === s)).filter(s => !!s)
  //   };
  // }

  // protected dialogState = inject(QuestionnaireDialogStateService);
  // override configService = inject(QuestionnaireConfigService);
  // override dialogRef = inject(MatDialogRef<QuestionnaireDialogComponent>);
  // override dialogData = inject(MAT_DIALOG_DATA) as {
  //   id: string;
  //   mode: DialogMode;
  //   entity?: AppQuestionnaire;
  //   questionnaireFullList: Observable<AppQuestionnaire[]>;
  // };
  //

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

  // protected readonly DialogAction = DialogAction;

//   protected override handleSaveAction(): void {
//     const entity = this.dialogState.questionnaire();
//     if (entity) {
//       console.log('Class: QuestionnaireDialogComponent, Function: handleSaveAction, Line 127 this.sectionsValidity' , this.sectionsValidity);
//       entity.isValid = this.sectionsValidity.general && this.sectionsValidity.questions && this.sectionsValidity.scheduling && this.sectionsValidity.customMessages && this.sectionsValidity.notifications && this.sectionsValidity.translations;
//     }
//     this.dialogActionEvent.emit({
//       action: this.dialogData.mode,
//       entity: this.dialogState.questionnaire(),
//     });
//   }
//
//   protected override handleDeleteAction(): void {
//     this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
//   }
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
