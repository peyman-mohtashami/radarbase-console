import { Component, OnDestroy, OnInit } from '@angular/core';
import {Location, NgIf} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';


import { UserDialogComponent } from '../user-dialog/user-dialog.component';
// import { UserEntityService } from '../../store/services/user.entity.service';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { DialogMode } from '../../../../enums/dialog';
import { BaseEntityPage } from '../../../../components/base-entity-page/base-entity-page';
import { AppUser } from "../../models/user";
import { AppProject } from "../../../project/models/project";
import { AppOrganization } from "../../../organization/models/organization";
import { ENTITY_NAME } from '../../../../enums/entities';
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TranslatePipe} from "@ngx-translate/core";
import {
  StaticBreadcrumbComponent
} from "../../../../components/base-entity-page/static-breadcrumb/static-breadcrumb.component";
import {
  DetailsPageHeaderComponent
} from "../../../../components/base-details/details-page-header/details-page-header.component";
import {ActivateComponent} from "../../components/activate/activate.component";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'rb-user-page',
  templateUrl: './user-page.component.html',
  imports: [
    LoaderComponent,
    NgIf,
    TranslatePipe,
    StaticBreadcrumbComponent,
    DetailsPageHeaderComponent,
    ActivateComponent,
    UserDetailsComponent
  ]
})
export class UserPageComponent
  extends BaseEntityPage<AppUser, UserDialogComponent>
  implements OnInit, OnDestroy
{
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entities: AppUser[] = this.activatedRoute.snapshot.data['entities'];
  projects: AppProject[] = this.activatedRoute.snapshot.data['projects'];
  organizations: AppOrganization[] =
    this.activatedRoute.snapshot.data['organizations'];

  deleteDisabled = false;

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    location: Location,
    entityService: UserService, //UserEntityService,
    public currentUserService: AuthService,
  ) {
    super(router, activatedRoute, dialog, location, entityService);
  }

  ngOnInit() {
    if (this.entity.roles && this.entity.roles.length > 0) {
      if (this.entity.roles[0].authorityName === 'ROLE_PARTICIPANT') {
        this.deleteDisabled = true;
      }
      if (this.entity.roles[0].authorityName === 'ROLE_INACTIVE_PARTICIPANT') {
        this.deleteDisabled = true;
      }
    }

    // (currentUserService.getUser() | async)?.['login'] === entity['login'] || (entity['roles']?.length && (entity['roles']?.[0]?.['authorityName'] === 'ROLE_PARTICIPANT' || entity['roles']?.[0]?.['authorityName'] === 'ROLE_INACTIVE_PARTICIPANT'))

  }

  ngOnDestroy(): void {
    this.destroy();
  }

  override getDialogRef(
    mode: DialogMode,
    entity: AppUser
  ): MatDialogRef<UserDialogComponent> {
    return this.dialog.open(UserDialogComponent, {
      data: {
        mode,
        entity,
        entities: this.entities,
        projects: this.projects,
        organizations: this.organizations,
      },
      panelClass: ['scrollable', 'full-width-dialog'],
      disableClose: true,
    });
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'users']).then();
  }

  override navigateOnUpdateSuccess(entity: AppUser) {
    this.router.navigate(['/admin', 'users', entity.login]).then();
  }

}
