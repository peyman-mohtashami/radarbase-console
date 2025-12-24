import {AfterViewInit, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../enums/dialog';
import {PermissionDialogService} from '../../services/permission-dialog.service';
import {PermissionConfigService} from '../../services/permission-config.service';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {MatButton, MatIconButton} from '@angular/material/button';
import {DetailType} from '../../../../enums/detail-type';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AppUser} from "../../../user/models/user";
import {DialogAction} from "../../../../components/dialog/dialog-actions/dialog-actions.component";
import {BaseDialogComponent} from '../../../../components/dialog/base-dialog.component';
import {debounceTime} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';

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
    MatIconButton,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
  ]
})
export class PermissionDialogComponent extends BaseDialogComponent<AppUser> implements OnInit, AfterViewInit, OnDestroy {
  protected readonly DetailType = DetailType;
  protected readonly DialogAction = DialogAction;

  override configService = inject(PermissionConfigService);
  override dialogRef = inject(MatDialogRef<PermissionDialogService>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppUser;
    project?: AppProject;
    organization?: AppOrganization;
    userFullList: Observable<AppUser[]>;
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    email: new FormControl<string>( '', {nonNullable: true}),
  })

  selectedUser = signal<AppUser | undefined>(undefined);

  usersFullList: AppUser[] = [];

  ngOnInit() {
    this.dialogData.userFullList.subscribe(users => {
      this.usersFullList = users;
    })
    this.formFields = this.configService.getFormFields();
    this.form.patchValue(this.dialogData.entity);
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if (value) {
        this.error.set(null);
        const email = this.form.value.email;
        const user = this.usersFullList.find(e => e.email === email || e.login === email);
        this.selectedUser.set(user);
      }
    })
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override handleSaveAction(): void {
    const selectedUser = this.selectedUser();
    if (!selectedUser) return;

    const updatedEntity: AppUser = {...selectedUser};
    updatedEntity._roles = updatedEntity._roles ?? {};

    if (this.dialogData.project) {
      updatedEntity._roles._projectAdmin = true;
      updatedEntity._roles._projects = updatedEntity._roles._projects ?? [];
      const selectedProject = {id: this.dialogData.project.id, _name: this.dialogData.project.projectName};
      updatedEntity._roles._projects.push(selectedProject);
    }
    if (this.dialogData.organization) {
      updatedEntity._roles._organizationAdmin = true;
      updatedEntity._roles._organizations = updatedEntity._roles._organizations ?? [];
      const selectedOrganization = {id: this.dialogData.organization.id, _name: this.dialogData.organization.name};
      updatedEntity._roles._organizations.push(selectedOrganization);
    }

    this.dialogActionEvent.emit({action: DialogMode.EDIT, entity: updatedEntity});
  }

  override handleDeleteAction(): void {
    const updatedEntity: AppUser = {...this.dialogData.entity};
    updatedEntity._roles = updatedEntity._roles ?? {};

    if (this.dialogData.project) {
      updatedEntity._roles._projects = updatedEntity._roles._projects?.filter(p => p._name !== this.dialogData.project?.projectName) ?? [];
      updatedEntity._roles._projectAdmin = updatedEntity._roles._projects.length > 0;
    }
    if (this.dialogData.organization) {
      updatedEntity._roles._organizations = updatedEntity._roles._organizations?.filter(o => o._name !== this.dialogData.organization?.name) ?? [];
      updatedEntity._roles._organizationAdmin = updatedEntity._roles._organizations?.length > 0;
    }
    this.dialogActionEvent.emit({action: DialogMode.EDIT, entity: updatedEntity});
  }
}
