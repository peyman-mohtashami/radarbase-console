import {Component, inject, AfterViewInit, signal} from "@angular/core";
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
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatError, MatFormField, MatHint, MatInput, MatSuffix} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatOption, MatSelect} from '@angular/material/select';
import {AppSourceType} from '../../../source-type/models/source-type';
import {
  DialogAction,
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {LocaleService} from "../../../../../core/locale/services/locale.service";
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {HttpErrorResponse} from '@angular/common/http';
import {OrganizationStore} from '../../../organization/services/organization.store';
import {ProjectStore} from '../../services/project.store';
import {form, FormField, validate} from '@angular/forms/signals';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {
  SearchableMultiSelectComponent
} from '../../../../../shared/components/searchable-multi-select/searchable-multi-select';
import {longTextField, normalTextField, requiredField} from '../../../../../shared/utils/signal-form-validators';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';

export interface ProjectForm {
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
  sourceTypes: string[],
  attributes: Record<string, string>,
}

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  imports: [
    MatDialogContent,
    TranslatePipe,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatFormField,
    MatHint,
    MatError,
    MatDatepickerToggle,
    MatDatepicker,
    MatOption,
    MatSelect,
    MatDatepickerInput,
    MatSuffix,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
    MatButton,
    MatDialogActions,
    MatIcon,
    MatProgressSpinner,
    SearchableMultiSelectComponent,
  ]
})
export class ProjectDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly DialogAction = DialogAction;

  protected localeService = inject(LocaleService);
  private projectStore = inject(ProjectStore);
  private organizationStore = inject(OrganizationStore);
  private configService = inject(ProjectConfigService);
  private dialogRef = inject(MatDialogRef<ProjectDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppProject;
    organization: OrganizationDto;
    projectFullList: AppProject[];
    organizationFullList: AppOrganization[];
    sourceTypeFullList: AppSourceType[];
  };

  formFields = this.configService.getFormFields();

  private model = signal<ProjectForm>({
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    location: this.dialogData.entity?.location ?? '',
    description: this.dialogData.entity?.description ?? '',
    projectName: this.dialogData.entity?.projectName ?? '',
    humanReadableProjectName: this.dialogData.entity?.humanReadableProjectName ?? '',
    organizationName: this.dialogData.entity?.organizationName ?? '',
    organization: `${this.dialogData.entity?.organization.id ?? ''}`,
    projectStatus: `${this.dialogData.entity?.projectStatus ?? ''}`,
    startDate: this.dialogData.entity?.startDate ?? '',
    endDate: this.dialogData.entity?.endDate ?? '',
    sourceTypes: this.dialogData.entity?.sourceTypes?.map(s => `${s.id}`) ?? [],
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
    requiredField(schema.projectName);
    normalTextField(schema.projectName);
    validate(schema.projectName, ({value}) => {
      const matchedProject = this.dialogData.projectFullList?.find((project) => project.name === value());
      if (!matchedProject) return null;
      if (this.dialogData.entity?.name === value()) return null;
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

  // override form = new FormGroup({
  //   id: new FormControl<string | number>({ value: '', disabled: true }, {nonNullable: true}),
  //   projectName: new FormControl<string>(
  //     {value: '', disabled: this.dialogData.mode !== DialogMode.ADD},
  //     {nonNullable: true, validators: [Validator.requiredValidator, Validator.stringIdValidator]}
  //   ),
  //   humanReadableProjectName: new FormControl<string>('', {validators: [Validator.normalTextValidator]}),
  //   description: new FormControl<string>('', {validators: [Validator.longTextValidator]}),
  //   location: new FormControl<string>(''), //TODO, validators: [Validator.normalTextValidator]}),
  //   organizationName: new FormControl<string>({value: '', disabled: true}),
  //   organization: new FormControl<OrganizationDto>(
  //     this.dialogData.organization ?? this.dialogData.entity?.organization,
  //     {nonNullable: true, validators: [Validator.requiredValidator]}
  //   ),
  //   projectStatus: new FormControl<ProjectStatus | null>(null, {nonNullable: true}),
  //   startDate: new FormControl<string>(''),
  //   endDate: new FormControl<string>(''),
  //   sourceTypes: new FormControl<RadarSourceType[]>([]),
  //   attributes: new FormGroup<Record<string, FormControl<string | null | undefined>> | null | undefined>({
  //     "Work-package": new FormControl<string | null>(null),//TODO, validators: [Validator.normalTextValidator]}),
  //     "Phase": new FormControl<string | null>(null),//TODO, validators: [Validator.normalTextValidator]}),
  //     "External-project-url": new FormControl<string | null>(null),//TODO, validators: [Validator.urlValidator]}),
  //     "External-project-id": new FormControl<string | null>(null),//TODO, validators: [Validator.stringIdValidator]}),
  //     "Privacy-policy-url": new FormControl<string | null>(null),//TODO, validators: [Validator.urlValidator]}),
  //   }),
  // });

  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date(2050, 0, 1);

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  // initialized = signal(false);

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  async onAction($event: DialogAction) {
    switch ($event) {
      case DialogAction.CLOSE:
        this.close();
        break;
      case DialogAction.DELETE:
        await this.handleDeleteAction();
        break;
      case DialogAction.SAVE:
        await this.handleSaveAction();
        break;
    }
  }

  // async ngOnInit() {
  //   await this.organizationStore.getWithQuery();
  //   this.organizations = this.organizationStore.items();
  //
  //   this.initialized.set(true);
  // }
  //
  // ngAfterViewInit() {
  //   const containerId = this.dialogData.id;
  //   const innerContainer = document.getElementById(containerId);
  //   const panel = innerContainer?.closest('.tailwind-slide-panel');
  //   setTimeout(() => {
  //     panel?.classList.add('dialog-enter-active');
  //   });
  // }
  //
  // async onAction($event: DialogAction) {
  //   this.error.set(null);
  //   this.loading.set(true);
  //   switch ($event) {
  //     case DialogAction.CLOSE:
  //       this.close();
  //       break;
  //     case DialogAction.DELETE:
  //       await this.handleDeleteAction();
  //       break;
  //     case DialogAction.SAVE:
  //       await this.handleSaveAction();
  //       break;
  //   }
  // }
  protected async handleSaveAction(): Promise<void> {
    this.configService.setLatestFormEntry(this.model());

    if (this.dialogData.mode === DialogMode.ADD) {
      await this.projectStore.add(this.toCreateDtoModel(this.model()));
    } else if (this.dialogData.mode === DialogMode.EDIT) {
      await this.projectStore.update(this.toUpdateDtoModel(this.model()));
    }

    if (this.projectStore.error()) return;

    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model().projectName);
  }

  protected async handleDeleteAction(): Promise<void> {
    await this.projectStore.delete(this.dialogData.entity!);
    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }



  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(entityName: string) {
    const selectedOrganization = this.projectStore.selected();
    if (!selectedOrganization) return;



    const urlTree = this.router.parseUrl(this.router.url);
    const primaryRoute = urlTree.root.children['primary'];

    if (!primaryRoute) {
      return;
    }

    const segments = primaryRoute.segments.map(segment => segment.path);
    const organizationsIndex = segments.indexOf('organizations');
    const organizationNameIndex = organizationsIndex + 1;

    const hasOrganizationNameInUrl =
      organizationsIndex !== -1 &&
      organizationNameIndex < segments.length;

    if (!hasOrganizationNameInUrl) {
      return;
    }

    segments[organizationNameIndex] = entityName;

    this.router.navigate(segments, {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin/organizations'], { queryParamsHandling: 'preserve' }).then();
  }

  toCreateDtoModel(model: ProjectForm): CreateProjectDto {
    return {
      ...model,
      organization: this.organizationStore.selected()!,
      projectStatus: toProjectStatus(this.model().projectStatus),
      sourceTypes: model.sourceTypes.map((s) => this.dialogData.sourceTypeFullList.find(i => `${i.id}` === s)).filter(s => !!s)
    };
  }

  toUpdateDtoModel(model: ProjectForm): UpdateProjectDto {
    return {
      ...model,
      id: Number(model.id),
      organization: this.organizationStore.selected()!,
      projectStatus: toProjectStatus(this.model().projectStatus),
      sourceTypes: model.sourceTypes.map((s) => this.dialogData.sourceTypeFullList.find(i => `${i.id}` === s)).filter(s => !!s)
    };
  }


  // protected async handleSaveAction(): Promise<void> {
  //   // const sourceTypes = this.model().sourceTypes.map(s =>
  //   //   this.dialogData.sourceTypeFullList.find(t => t.id === s)).filter(s => !!s);
  //
  //   const entity: AppProject = {
  //     ...this.model(),
  //     organization: this.dialogData.entity!.organization,
  //     projectStatus: toProjectStatus(this.model().projectStatus),
  //     sourceTypes: [],
  //     _name: this.model().projectName,
  //     _search: `${this.model().projectName}_${this.model().location}_${this.model().description}`,
  //   };
  //
  //   this.configService.setLatestFormEntry(entity);
  //   if (this.dialogData.mode === DialogMode.ADD) {
  //     await this.projectStore.add(entity);
  //   } else if (this.dialogData.mode === DialogMode.EDIT) {
  //     await this.projectStore.update(entity);
  //   }
  //   this.configService.setLatestFormEntry(null);
  //   this.dialogRef.close();
  //   this.navigateOnUpdateSuccess(entity);
  // }
  //
  // protected async handleDeleteAction(): Promise<void> {
  //   await this.projectStore.delete(this.dialogData.entity!);
  //   this.configService.setLatestFormEntry(null);
  //   this.dialogRef.close();
  //   this.navigateOnDeleteSuccess();
  // }


  // navigateOnUpdateSuccess(entity: AppProject) {
  //   this.router.navigate(['./admin/organizations', entity.projectName], {
  //     queryParamsHandling: 'preserve',
  //   }).then();
  // }
  //
  // navigateOnDeleteSuccess() {
  //   this.router.navigate(['./admin/organizations'], {
  //     queryParamsHandling: 'preserve',
  //   }).then();
  // }
}
