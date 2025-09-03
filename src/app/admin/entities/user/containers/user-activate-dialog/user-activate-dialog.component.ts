import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { BaseDialogComponent } from '../../../../base/base-dialog.component';
import { AppUser } from "../../models/user";
import { AppProject } from "../../../project/models/project";
import { AppOrganization } from "../../../organization/models/organization";
import {Store} from "@ngrx/store";
import {TranslatePipe} from "@ngx-translate/core";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'rb-user-activate-dialog',
  templateUrl: './user-activate-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatDialogClose,
    MatIcon,
    TranslatePipe,
    MatDialogContent,
    UserDetailsComponent,
    ErrorMessageComponent,
    NgIf,
    MatButton,
    MatIcon,
    MatProgressSpinner
  ]
})
export class UserActivateDialogComponent
  extends BaseDialogComponent<AppUser, UserActivateDialogComponent>
  implements OnInit, OnDestroy
{
  constructor(
    router: Router,
    store: Store,
    dialogRef: MatDialogRef<UserActivateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppUser;
      projects: AppProject[];
      organizations: AppOrganization[];
    }
  ) {
    super(router, dialogRef, data);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  // override initForm(): void {
  //   //
  // }

  override save(): void {
    console.log(this.form?.value);
    this.isLoading = true;
    // const formRoles = this.form?.value.roles;
    // const roles = [];
    // if(formRoles.sysAdmin) {
    //   roles.push({
    //     authorityName: 'ROLE_SYS_ADMIN',
    //     projectName: null,
    //     projectId: null,
    //     organizationName: null,
    //     organizationId: null,
    //   });
    // }
    // if(formRoles.organizationAdmin){
    //   formRoles.organizations.forEach((organizationName: string) => {
    //     const organizationId = this.organizations.filter(item => item.name === organizationName)[0].id;
    //     roles.push({
    //       authorityName: 'ROLE_ORGANIZATION_ADMIN',
    //       projectName: null,
    //       projectId: null,
    //       organizationName,
    //       organizationId
    //     });
    //   });
    // }
    // if(formRoles.projectAdmin){
    //   formRoles.projects.map((projectName: string) => {
    //     const projectId = this.projects.filter(item => item.projectName === projectName)[0].id
    //     roles.push({
    //       authorityName: 'ROLE_PROJECT_ADMIN',
    //       projectName,
    //       projectId,
    //       organizationName: null,
    //       organizationId: null
    //     });
    //   });
    // }
    // console.log(roles);
    // // const roles = this.form?.value.roles.map((role: any) => {
    // //     return {
    // //       authorityName: role.authorityName,
    // //       projectName: role.project?.projectName,
    // //       projectId: role.project?.id,
    // //       organizationName: role.organization?.name,
    // //       organizationId: role.organization?.id
    // //     };
    // //   }
    // // )
    // const user = { ...this.entity, ...this.form?.value, roles}
    const user = { ...this.entity };
    this.actionTriggered.emit({ action: this.mode, entity: user });
  }

  // save(): void {
  //   console.log(this.form?.value)
  //   this.error = undefined;
  //   this.isLoading = true;
  //   this.formChanged = false;
  //   this.actionTriggered.emit({action: this.mode, entity: {...this.entity, ...this.form?.value}})
  // }

  sendActivationEmail() {
    this.error.set(false);// = false;
    this.isLoading = true;
    if (this.entity.id) {
      this.actionTriggered.emit({ action: this.mode, entity: this.entity });
    }
  }
}
