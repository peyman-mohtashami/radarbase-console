import {
  Component,
  inject,
  ChangeDetectionStrategy, AfterViewInit, signal, effect
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {Validator} from "../../../../../../shared/utils/validators";
import {AppConfig, CreateConfigDto, UpdateConfigDto} from "../../models/config";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {
  DialogActionsComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {ConfigConfigService} from "../../services/config-config.service";
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {AppSource, CreateSourceDto, UpdateSourceDto} from '../../../../project-source/models/source';
import {SourceStore} from '../../../../project-source/services/source.store';
import {ProjectStore} from '../../../../project/services/project.store';
import {SourceConfigService} from '../../../../project-source/services/source-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigStore} from '../../services/config.store';
import {ConfigService} from '../../services/config.service';
import {animateDialogIn, animateDialogOut} from '../../../../../shared/utils/dialog.util';
import {getLastSegment} from '../../../../../shared/utils/route.util';
import {SourceForm} from '../../../../project-source/dialogs/source-dialog/source-dialog.component';
import {form, FormField, validate} from '@angular/forms/signals';
import {requiredField} from '../../../../../../shared/utils/signal-form-validators';
import {JsonPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

export interface ConfigForm {
  name: string;
  value: string;
}

export interface StoredConfigDialog {
  mode: DialogMode;
  entity?: AppConfig;
  model: ConfigForm;
}

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  imports: [
    MatDialogContent,
    MatFormField,
    TranslatePipe,
    DialogActionsComponent,
    MatInput,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    ErrorMessageBoxComponent,
    MatDialogTitle,
    FormField,
    JsonPipe,
    MatButton,
    MatDialogActions,
    MatIcon,
    MatProgressSpinner
  ]
})
export class ConfigDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;

  protected store = inject(ConfigStore);
  private projectStore = inject(ProjectStore);
  protected configService = inject(ConfigConfigService);
  private dialogRef = inject(MatDialogRef<ConfigDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppConfig;
    restoredModel: ConfigForm;
  };

  formFields = this.configService.getFormFields();

  private model = signal<ConfigForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    name: this.dialogData.entity?.name ?? '',
    value: this.dialogData.entity?.value ?? '',
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.name);
    // validate(schema.name, ({value}) => {
    //   const matchedConfig = this.dialogData.configFullList?.find((c) => c.name === value());
    //   if (!matchedConfig) return null;
    //   if (this.dialogData.entity?.name === value()) return null;
    //   return {
    //     kind: 'duplicate',
    //     message: 'SHARED.validatorError.duplicateName',
    //   };
    // });
  });

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
    // this.navigateOnUpdateSuccess(this.model());
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.clearDialogState();
    this.dialogRef.close();
    // this.navigateOnDeleteSuccess();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  // navigateOnUpdateSuccess(model: SourceForm) {
  //   const selectedSource = this.store.selected();
  //   if (!selectedSource) return;
  //
  //   const project = this.dialogData.project;
  //   const urlTree = this.router.parseUrl(this.router.url);
  //   this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'sources', model.sourceName, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  // }

  // navigateOnDeleteSuccess() {
  //   const project = this.dialogData.project;
  //   this.router.navigate(['./admin/organizations', project.organization.name, 'projects', project.projectName, 'sources'], {queryParamsHandling: 'preserve'}).then();
  // }

  toCreateDtoModel(model: ConfigForm): CreateConfigDto {
    return {
      ...model,
      // sourceType: this.dialogData.sourceTypeFullList.find(s => `${s.id}` === model.sourceType),
      // assigned: false,
      // project: this.projectStore.selected()!,
    };
  }

  toUpdateDtoModel(model: ConfigForm): UpdateConfigDto {
    return {
      ...model,
      // id: Number(model.id),
      // sourceType: this.dialogData.sourceTypeFullList.find(s => `${s.id}` === model.sourceType),
      // project: this.projectStore.selected()!
    };
  }
}
