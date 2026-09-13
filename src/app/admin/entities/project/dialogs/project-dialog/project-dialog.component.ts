import {Component, inject, AfterViewInit, signal, effect} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

import {AppProject, CreateProjectDto, toProjectStatus, UpdateProjectDto} from "../../models/project";
import {
  AppOrganization,
  OrganizationDto,
} from "../../../organization/models/organization";
import {TranslatePipe} from "@ngx-translate/core";
import {ProjectConfigService} from '../../services/project-config.service';
import {DialogMode} from '../../../../shared/models/dialog.model';
import {AppSourceType, SourceTypeDto} from '../../../source-type/models/source-type';
import {LocaleService} from "../../../../../core/locale/services/locale.service";
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorBoxComponent} from '../../../../../shared/components/error-box/error-box.component';
import {OrganizationStore} from '../../../organization/services/organization.store';
import {ProjectStore} from '../../services/project.store';
import {disabled, form, validate} from '@angular/forms/signals';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {
  SearchableMultiSelectComponent
} from '../../../../../shared/components/form-fields/searchable-multi-select/searchable-multi-select';
import {
  longTextField,
  normalTextField,
  requiredField,
} from '../../../../../shared/utils/signal-form-validators';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {getLastSegment} from '../../../../shared/utils/route.util';
import {JsonPipe} from '@angular/common';
import {
  InputFormFieldComponent
} from '../../../../../shared/components/form-fields/input-form-field/input-form-field.component';
import {
  TextareaFormFieldComponent
} from '../../../../../shared/components/form-fields/textarea-form-field/textarea-form-field.component';
import {
  DateFormFieldComponent
} from '../../../../../shared/components/form-fields/date-form-field/date-form-field.component';
import {
  SelectFormFieldComponent
} from '../../../../../shared/components/form-fields/select-form-field/select-form-field.component';

export interface ProjectForm {
  id: string;
  projectName: string,
  description: string;
  location: string;
  humanReadableProjectName: string,
  organizationName: string,
  organization: OrganizationDto | null,
  projectStatus: string,
  startDate: string,
  endDate: string,
  sourceTypes: SourceTypeDto[],
  attributes: Record<string, string>,
}

export interface StoredProjectDialog {
  mode: DialogMode;
  entity?: AppProject;
  model: ProjectForm;
}

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  imports: [
    MatDialogContent,
    TranslatePipe,
    ErrorBoxComponent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatIcon,
    MatProgressSpinner,
    SearchableMultiSelectComponent,
    JsonPipe,
    InputFormFieldComponent,
    TextareaFormFieldComponent,
    DateFormFieldComponent,
    SelectFormFieldComponent,
  ]
})
export class ProjectDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;

  protected localeService = inject(LocaleService);
  protected store = inject(ProjectStore);
  private organizationStore = inject(OrganizationStore);
  private configService = inject(ProjectConfigService);
  private dialogRef = inject(MatDialogRef<ProjectDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppProject;
    organization?: OrganizationDto;
    projectFullList: AppProject[];
    organizationFullList: AppOrganization[];
    sourceTypeFullList: AppSourceType[];
    restoredModel?: ProjectForm;
  };

  formFields = this.configService.getFormFields();

  private model = signal<ProjectForm>(this.dialogData.restoredModel ??{
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    location: this.dialogData.entity?.location ?? '',
    description: this.dialogData.entity?.description ?? '',
    projectName: this.dialogData.entity?.projectName ?? '',
    humanReadableProjectName: this.dialogData.entity?.humanReadableProjectName ?? '',
    organizationName: this.dialogData.entity?.organizationName ?? '',
    organization: this.dialogData.entity?.organization ?? this.dialogData.organization ?? null,
    projectStatus: `${this.dialogData.entity?.projectStatus ?? ''}`,
    startDate: this.dialogData.entity?.startDate ?? '',
    endDate: this.dialogData.entity?.endDate ?? '',
    sourceTypes: this.dialogData.entity?.sourceTypes ?? [],
    attributes: {
      ...this.dialogData.entity?.attributes,
      'Phase': this.dialogData.entity?.attributes?.['Phase'] ?? '',
      'Work-package': this.dialogData.entity?.attributes?.['Work-package'] ?? '',
      'External-project-url': this.dialogData.entity?.attributes?.['External-project-url'] ?? '',
      'External-project-id': this.dialogData.entity?.attributes?.['External-project-id'] ?? '',
      'Privacy-policy-url': this.dialogData.entity?.attributes?.['Privacy-policy-url'] ?? '',
    },
  });

  protected form = form(this.model, (schema) => {
    disabled(schema.id);
    requiredField(schema.projectName);
    normalTextField(schema.projectName);
    disabled(schema.projectName, {when: () => !!this.dialogData.entity});
    validate(schema.projectName, ({value}) => {
      const matchedProject = this.dialogData.projectFullList?.find((project) => project.projectName === value());
      if (!matchedProject) return null;
      if (this.dialogData.entity?.projectName === value()) return null;
      return {
        kind: 'duplicate',
        message: 'SHARED.validatorError.duplicateName',
      };
    });
    normalTextField(schema.humanReadableProjectName);
    longTextField(schema.description);
    normalTextField(schema.location);
    requiredField(schema.organization);
  });

  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date(2050, 0, 1);

  constructor() {
    effect(() => {
      const model = this.model();
      if (this.dialogData.mode === DialogMode.ADD || this.dialogData.mode === DialogMode.EDIT) {
        this.configService.setDialogState({
          mode: this.dialogData.mode,
          entity: this.dialogData.entity,
          model,
        });
      }
    });
  }

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async save(): Promise<void> {
    switch(this.dialogData.mode) {
      case DialogMode.ADD:
        await this.store.add(this.toCreateDtoModel(this.model()));
        break;
      case DialogMode.EDIT:
        await this.store.update(this.toUpdateDtoModel(this.model()));
        break;
    }

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model());
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(model: ProjectForm) {
    const selectedProject = this.store.selected();
    if (!selectedProject) return;

    const urlTree = this.router.parseUrl(this.router.url);
    const organization = this.organizationStore.selected();
    if (!organization) return;
    this.router.navigate(['./admin/organizations', organization, 'projects', model.projectName, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    const organization = this.organizationStore.selected();
    if (organization) {
      this.router.navigate(['/admin/organizations', organization], { queryParamsHandling: 'preserve' }).then();
    } else {
      this.router.navigate(['/admin/projects'], { queryParamsHandling: 'preserve' }).then();
    }
  }

  toCreateDtoModel(model: ProjectForm): CreateProjectDto {
    return {
      projectName: model.projectName,
      description: model.description,
      location: model.location,
      humanReadableProjectName: model.humanReadableProjectName || undefined,
      organizationName: undefined,
      organization: model.organization ?? this.organizationStore.selected()!,
      projectStatus: toProjectStatus(this.model().projectStatus),
      startDate: model.startDate || undefined,
      endDate: model.endDate || undefined,
      sourceTypes: model.sourceTypes,
      attributes: removeEmptyProperties(model.attributes),
    };
  }

  toUpdateDtoModel(model: ProjectForm): UpdateProjectDto {
    return {
      id: Number(model.id),
      projectName: model.projectName,
      description: model.description,
      location: model.location,
      humanReadableProjectName: model.humanReadableProjectName || undefined,
      organizationName: undefined,
      organization: model.organization ?? this.organizationStore.selected()!,
      projectStatus: toProjectStatus(this.model().projectStatus),
      startDate: model.startDate || undefined,
      endDate: model.endDate || undefined,
      sourceTypes: model.sourceTypes,
      attributes: removeEmptyProperties(model.attributes),
    };
  }
}

export function removeEmptyProperties(value: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v));
}
