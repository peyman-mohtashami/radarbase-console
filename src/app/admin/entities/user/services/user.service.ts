import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import { BaseEntityService } from '../../../services/base.entity.service';
import {AppUser} from "../models/user";
import {Observable} from "rxjs";
import {RadarUser} from '../../../../shared/models/radar-users.model';
import {RadarRole} from '../../../../shared/models/auth.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogMode} from '../../../enums/dialog';
// import {TableType} from '../../../models/table.model';
import {DialogData} from '../../source-data/services/source-data.service';
import {UserDialogComponent} from '../containers/user-dialog/user-dialog.component';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseEntityService<
  RadarUser,
  AppUser
> {
  override resourceUrl = 'api/users';
  // type = TableType.GET_WITH_QUERY;

  constructor(http: HttpClient,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    super(http);
  }

  sendActivationEmail(entity: AppUser): Observable<void> {
    console.log(entity);
    return this.http.post<void>('api/account/reset-activation/init', entity.login);
  }

  override toAppModel(entity: RadarUser): AppUser {
    const organizations = this.getOrganizationsWithAdminRole(entity);
    const projects = this.getProjectsWithAdminRole(entity);
    const roles = {
      _sysAdmin: this.isSysAdmin(entity),
      _organizationAdmin: !!organizations && organizations.length > 0,
      _projectAdmin: !!projects && projects.length > 0,
      _organizations: organizations,
      _projects: projects,
    };
    return { ...entity, name: entity.login, _roles: roles };
  }

  override toRadarModel(entity: AppUser): RadarUser {
    console.log('Class: UserDataService, Function: toRadarModel, Line 39 entity' , entity);
    const roles: RadarRole[] = [];
    if (entity._roles?._sysAdmin) {
      roles.push({
        authorityName: 'ROLE_SYS_ADMIN',
      });
    } else {
      if (entity._roles?._organizationAdmin) {
        entity._roles._organizations.forEach((organization: any) => {
          roles.push({
            authorityName: 'ROLE_ORGANIZATION_ADMIN',
            projectName: null,
            projectId: null,
            organizationName: organization.name,
            organizationId: organization.id ? +organization.id : null,
          });
        });
      }
      if (entity._roles?._projectAdmin) {
        entity._roles._projects?.forEach((project: any) => {
          roles.push({
            authorityName: 'ROLE_PROJECT_ADMIN',
            projectName: project.name,
            projectId: project.id ? +project.id : null,
            organizationName: null,
            organizationId: null,
          });
        });
      }
    }
    console.log('Class: UserDataService, Function: toRadarModel, Line 69 entity._roles' , entity._roles);
    // delete entity._roles;
    const { ['_roles']: _roles, ...user } = entity;
    // return { ...entity, roles, _roles: undefined };
    return { ...user, roles };
  }

  isSysAdmin(entity: RadarUser): boolean {
    const roles = entity.roles?.filter(
      (r) => r.role === 'SYS_ADMIN' || r.authorityName === 'ROLE_SYS_ADMIN'
    );
    return !!roles && roles?.length > 0;
  }

  getOrganizationsWithAdminRole(entity: RadarUser) {
    return (
      entity?.roles
        ?.filter(
          (r) =>
            r.authorityName === 'ROLE_ORGANIZATION_ADMIN' ||
            r.authority?.name === 'ROLE_ORGANIZATION_ADMIN'
        )
        .map((r) => {
          return {
            name: r.organizationName || r.organization?.name,
            id: r.organizationId || (r.organization ? r.organization.id : ''),
          };
        }) || []
    );
  }

  getProjectsWithAdminRole(entity: RadarUser) {
    return (
      entity.roles
        ?.filter(
          (r) =>
            r.authorityName === 'ROLE_PROJECT_ADMIN' ||
            r.authority?.name === 'ROLE_PROJECT_ADMIN'
        )
        .map((r) => {
          return {
            name: r.projectName || r.project?.projectName,
            id: r.projectId || (r.project ? r.project.id : ''),
          };
        }) || []
    );
  }

  override openDialog(dialogData: DialogData) {
    const dialogRef = this.getDialogRef(dialogData);

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: ({action, entity}: { action: DialogMode | string; entity: any }) => {
          switch (action) {
            case DialogMode.EDIT:
              this.update(entity).subscribe({
                next: () => this.onSuccess(dialogRef, entity),
                error: (err) => this.onError(err, dialogRef),
              });
              break;
            case DialogMode.ADD:
              this.add(entity).subscribe({
                next: (res) => this.onSuccess(dialogRef, res),
                error: (err) => this.onError(err, dialogRef),
              });
              break;
            case DialogMode.DELETE:
              this.delete(entity['name']).subscribe({
                next: () => this.onSuccess(dialogRef, entity),
                error: (err) => this.onError(err, dialogRef),
              });
              break;
            case 'close':
              this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParamsHandling: 'preserve'
              }).then(() => {
                // dialogRef.componentInstance.close()
              });
            // this.router.navigate([], {
            //   relativeTo: this.activatedRoute,
            //   queryParamsHandling: 'preserve'
            // }).then();
            // break;
          }
        },
      });
    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  onSuccess(dialogRef: MatDialogRef<any>, entity: AppUser): void {
    // if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL) {
      this.updateTrigger$.next(`${entity?.['id'] ?? '0'}`);
    // }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve'
    }).then(() => {
      dialogRef.componentInstance.close()
    });

    this.updated.set(`${entity['id']}`);// = undefined;
    // this.updated = entity['id'];
    setTimeout(() => {
      this.updated.set(undefined);// = undefined;
    }, 1000);
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<any>) {
    dialogRef.componentInstance.errorHappened(error);
  }

  getDialogRef(data: DialogData): MatDialogRef<UserDialogComponent> {
    return this.dialog.open(UserDialogComponent,
      {
        data: data,
        panelClass: 'tailwind-slide-panel',
        width: '50%',
        height: '100vh',
        position: {right: '0'},
        hasBackdrop: true,
        disableClose: true,
        autoFocus: false,
        restoreFocus: false
      }
    );
  }
}
