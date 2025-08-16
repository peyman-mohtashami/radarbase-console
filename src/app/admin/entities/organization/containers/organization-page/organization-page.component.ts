import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import { AppOrganization } from "../../models/organization";
import {ENTITIES} from "../../../../consts/entities";
import {ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {BreadcrumbComponent} from "../../../../components/base-entity-page/breadcrumb/breadcrumb.component";
import {Location} from "@angular/common";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
import {ActionsComponent} from "../../components/actions/actions.component";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {BaseEntityPage} from "../../../../components/base-entity-page/base-entity-page";
import {OrganizationDialogComponent} from "../organization-dialog/organization-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OrganizationService} from "../../services/organization.service";

export interface ILink {
  path: string;
  label: string;
}

@Component({
  selector: 'rb-organization-page',
  templateUrl: './organization-page.component.html',
  imports: [
    BreadcrumbComponent,
    RbPermissionDirective,
    ActionsComponent,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
  ]
})
export class OrganizationPageComponent
  extends BaseEntityPage<AppOrganization, OrganizationDialogComponent>
  implements OnDestroy
{

  protected readonly ENTITIES = ENTITIES;
  protected readonly ROLES = ROLES;

  entities: AppOrganization[] = this.activatedRoute.snapshot.data['entities'];

  links: ILink[] = [
    { path: 'projects', label: 'Projects' },
    { path: 'users', label: 'Users' },
    { path: 'details', label: 'Details' },
  ];

  activePath?: string ;

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    location: Location,
    entityService: OrganizationService,
  ) {
    super(router, activatedRoute, dialog, location, entityService);
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  override getDialogRef(
    mode: DialogMode,
    entity: AppOrganization
  ): MatDialogRef<OrganizationDialogComponent> {
    return this.dialog.open(OrganizationDialogComponent, {
      data: {
        mode,
        entity,
        entities: this.entities,
      },
      disableClose: true,
      panelClass: 'tailwind-slide-panel',
      width: '50%',
      height: '100vh',
      position: { right: '0' },
      hasBackdrop: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'organizations']).then();
  }

  override navigateOnUpdateSuccess(entity: AppOrganization) {}
}
