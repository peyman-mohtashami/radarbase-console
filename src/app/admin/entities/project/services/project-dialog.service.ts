import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AppProject} from '../models/project';
import {ProjectService} from './project.service';
import {ProjectDialogComponent} from '../containers/project-dialog/project-dialog.component';
import {AppOrganization, RadarOrganization} from '../../organization/models/organization';
import {AppSourceType} from '../../source-type/models/source-type';

export interface UpdateTrigger {
  mode: DialogMode;
  entity: AppProject;
}

@Injectable({providedIn: 'root'})
export class ProjectDialogService {
  private entityService = inject(ProjectService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent$: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(mode: DialogMode, entity: AppProject | undefined, entities: AppProject[], organization: RadarOrganization | undefined, organizations: AppOrganization[], sourceTypes: AppSourceType[]) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity, entities, organization, organizations, sourceTypes);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode; entity: AppProject }) => {
        this.processDialogAction(value.action, value.entity).subscribe({
          next: (res) => {
            this.dialogUpdateEvent$.set({mode, entity: res ?? value.entity})
            dialogRef.close();
          },
          error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
        });
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  private processDialogAction(actionType: DialogMode, entity: AppProject): Observable<AppProject | void> {
    switch (actionType) {
      case DialogMode.ADD:
        return this.entityService.add(entity);
      case DialogMode.EDIT:
        return this.entityService.update(entity);
      case DialogMode.DELETE:
        return this.entityService.delete(entity);
      default:
        this.clearFragmentUrl();
        return of();
    }
  }

  clearFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined // Explicitly remove the fragment
    }).then();
  }

  createDialogRef(mode: DialogMode, entity: AppProject | undefined, entities: AppProject[], organization: RadarOrganization | undefined, organizations: AppOrganization[], sourceTypes: AppSourceType[]): MatDialogRef<ProjectDialogComponent> {
    return this.dialog.open(ProjectDialogComponent, {
      data: {mode, entity, entities, organization, organizations, sourceTypes},
      panelClass: 'tailwind-slide-panel',
      width: '50%',
      height: '100vh',
      position: {right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}
