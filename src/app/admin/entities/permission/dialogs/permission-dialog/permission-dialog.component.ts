import {AfterViewInit, Component, computed, inject, signal} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../shared/enums/dialog';
import {PermissionConfigService} from '../../services/permission-config.service';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AppUser, RoleDto, UpdateUserDto} from "../../../user/models/user";
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ActivatedRoute} from '@angular/router';
import {requiredField} from '../../../../../shared/utils/signal-form-validators';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {PermissionStore} from '../../services/permission.store';
import {form, FormField} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';

export interface PermissionForm {
  email: string,
}

export interface StoredPermissionDialog {
  mode: DialogMode;
  entity?: AppUser;
  model: PermissionForm;
}


@Component({
  selector: 'app-permission-dialog',
  templateUrl: './permission-dialog.component.html',
  imports: [
    MatDialogContent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatInput,
    MatDialogTitle,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
    FormField,
    JsonPipe,
  ]
})
export class PermissionDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;

  protected localeService = inject(LocaleService);
  protected store = inject(PermissionStore);
  protected configService = inject(PermissionConfigService);
  private dialogRef = inject(MatDialogRef<PermissionDialogComponent>);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity: AppUser;
    project?: AppProject;
    organization?: AppOrganization;
    userFullList: AppUser[];
  };

  formFields = this.configService.getFormFields();

  private model = signal<PermissionForm>({
    ...this.dialogData.entity,
    email: this.dialogData.entity?.email ?? '',
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.email);
  });

  selectedUser = computed(() => {
    const email = this.model().email;
    return this.dialogData.userFullList.find(e => e.email === email || e.login === email);
  });

  selectedUserInvalid = computed(() => {
    const project = this.dialogData.project;
    const organization = this.dialogData.organization;

    const sysAdmin = this.selectedUser()?.roles?.some(r => r.authorityName === 'ROLE_SYS_ADMIN');
    if (sysAdmin) return true;

    if (organization) {
      return this.selectedUser()?.roles?.some(r => r.organizationId === organization.id);
    }

    if (project) {
      return this.selectedUser()?.roles?.some(r => r.projectId === project.id);
    }

    return false;
  });

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

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async save(): Promise<void> {
    const user = this.selectedUser();
    if (!user) return;

    const project = this.dialogData.project;
    const organization = this.dialogData.organization;

    if (!project && !organization) return;

    let newRole: RoleDto | undefined = undefined;
    if (organization) {
      newRole = {
        authorityName: "ROLE_ORGANIZATION_ADMIN",
        organizationId: organization.id,
        organizationName: organization.name
      }
    }
    if (project) {
      newRole = {
        authorityName: "ROLE_PROJECT_ADMIN",
        "projectId": project.id,
        "projectName": project.projectName
      }
    }

    if (!newRole) return;

    const updatedUser: UpdateUserDto = {
      ...user,
      roles: [
        ...(user.roles ?? []),
        newRole
      ]
    }
    await this.store.update(updatedUser);

    if (this.store.error()) return;
    this.dialogRef.close();
  }

  protected async delete(): Promise<void> {
    const user = this.dialogData.entity;
    const project = this.dialogData.project;
    const organization = this.dialogData.organization;

    if (!project && !organization) return;

    const roles = (user.roles ?? []).filter(r => {
      if (organization) {
        if (r.authorityName === "ROLE_ORGANIZATION_ADMIN" && r.organizationId === organization.id) {
          return false;
        }
      }
      if (project) {
        if (r.authorityName === "ROLE_PROJECT_ADMIN" && r.projectId === project.id) {
          return false;
        }
      }
      return true;
    });

    const updatedUser: UpdateUserDto = {
      ...user,
      roles
    }
    await this.store.update(updatedUser);

    if (this.store.error()) return;
    this.dialogRef.close();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }
}
