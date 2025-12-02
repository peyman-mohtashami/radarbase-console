import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of, timeout} from 'rxjs';
import {AppOrganization, RadarOrganization} from '../../organization/models/organization';
import {AppSourceType} from '../../source-type/models/source-type';
import {AppConfig} from '../models/config';
import {ConfigService} from './config.service';
import {ConfigDialogComponent} from '../containers/config-dialog/config-dialog.component';
import {ConfigPublishDialogComponent} from '../containers/config-publish-dialog/config-publish-dialog.component';

export interface UpdateTrigger {
  mode: DialogMode | string;
  entity?: AppConfig;
}

@Injectable({providedIn: 'root'})
export class ConfigDialogService {
  private entityService = inject(ConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent$: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(mode: DialogMode, entity: AppConfig | undefined) { //}, entities: AppConfig[], organization: RadarOrganization | undefined, organizations: AppOrganization[], sourceTypes: AppSourceType[]) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    // const dialogRef = this.createDialogRef(mode, entity, entities, organization, organizations, sourceTypes);
    const dialogRef = this.createDialogRef(mode, entity);//, entities, organization, organizations, sourceTypes);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode; entity: AppConfig }) => {
        console.log('Class: ConfigDialogService, Function: next, Line 38 ' , );
        // setTimeout(() => {
          this.dialogUpdateEvent$.set({mode, entity: entity ? value.entity : this.entityService.toAppModel(value.entity)});
          dialogRef.close();
        // }, 100);


        // this.processDialogAction(value.action, value.entity).subscribe({
        //   next: (res) => {
        //     this.dialogUpdateEvent$.set({mode, entity: res ?? value.entity})
        //   },
        //   error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
        // });
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  // private processDialogAction(actionType: DialogMode, entity: AppConfig): Observable<AppConfig | void> {
  //   switch (actionType) {
  //     case DialogMode.ADD:
  //       return entity; //this.entityService.add(entity);
  //     case DialogMode.EDIT:
  //       return this.entityService.update(entity);
  //     case DialogMode.DELETE:
  //       return this.entityService.delete(entity);
  //     default:
  //       this.clearFragmentUrl();
  //       return of();
  //   }
  //   // return of();
  // }

  clearFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined // Explicitly remove the fragment
    }).then();
  }

  createDialogRef(mode: DialogMode, entity: AppConfig | undefined): MatDialogRef<ConfigDialogComponent> { //}, entities: AppConfig[], organization: RadarOrganization | undefined, organizations: AppOrganization[], sourceTypes: AppSourceType[]): MatDialogRef<ConfigDialogComponent> {
    return this.dialog.open(ConfigDialogComponent, {
      data: {mode, entity},//, entities, organization, organizations, sourceTypes},
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

  openPublishDialog(mode: "publish" | "discard", entities: AppConfig[], clientId: string, projectId?: string, subjectId?: string) {
    const dialogRef = this.createPublishDialogRef(mode, entities);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode | string; entity: AppConfig }) => {
        console.log('Class: ConfigDialogService, Function: next, Line 102 value' , value);
        if (value.action === 'publish') {
          console.log('Class: ConfigDialogService, Function: next, Line 103 ' , );
          if (entities) {
            this.entityService.publish1(entities, clientId, projectId, subjectId).subscribe({
              next: (res) => {
                console.log('Class: ConfigDialogService, Function: next, Line 106 ',);
                this.dialogUpdateEvent$.set({mode: 'published', entity: undefined});
                dialogRef.close();
              },
              error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
            })
          }
        } else if (value.action === 'discard') {
          this.dialogUpdateEvent$.set({mode: 'discarded', entity: undefined});
          dialogRef.close();
        }
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  createPublishDialogRef(mode: "publish" | "discard", entities?: AppConfig[]): MatDialogRef<ConfigPublishDialogComponent> {
    return this.dialog.open(ConfigPublishDialogComponent, {
      data: {mode, entities},
      // panelClass: 'tailwind-slide-panel',
      width: '50%',
      // height: '100vh',
      // position: {right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

}
