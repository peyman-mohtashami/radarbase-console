import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AppQuestionnaire} from "../models/questionnaire";
import {QuestionnaireService} from "./questionnaire.service";
import {
  QuestionnaireDialogComponent
} from "../containers/questionnaire-dialog/questionnaire-dialog.component";
import {AppConfig} from "../../config/models/config";
import {
  ConfigPublishDialogComponent
} from "../../config/containers/config-publish-dialog/config-publish-dialog.component";
import {AppOrganization} from "../../organization/models/organization";
import {Observable, of} from "rxjs";

export interface UpdateTrigger {
  mode: DialogMode | string;
  entity?: AppQuestionnaire;
}

@Injectable({providedIn: 'root'})
export class QuestionnaireDialogService {
  private entityService = inject(QuestionnaireService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(
    mode: DialogMode,
    entity: AppQuestionnaire | undefined,
    entities: AppQuestionnaire[],
    language: string = 'en'
  ) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity, entities, language);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode; entity: AppQuestionnaire }) => {
        this.processDialogAction(value.action, value.entity, entities).subscribe({
          next: (res) => {
            // const entity = res ?? value.entity;
            this.dialogUpdateEvent.set({mode, entity})
            dialogRef.close();
          },
          error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
        });
      }
      // next: (value: { action: DialogMode; entity: AppQuestionnaire }) => {
      //   this.dialogUpdateEvent.set({mode, entity: entity ? value.entity : value.entity});
      //   dialogRef.close();
      // }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  private processDialogAction(actionType: DialogMode, entity: AppQuestionnaire, entities: AppQuestionnaire[]): Observable<AppQuestionnaire[] | void> {

    switch (actionType) {
      case DialogMode.ADD: {
        const updated = [...entities, entity];
        return this.entityService.publish(updated);
      }
      case DialogMode.EDIT: {
        const updated = [...entities];
        const idx = updated.findIndex(e => e.name === entity.name); // use your unique key
        if (idx !== -1) {
          updated.splice(idx, 1, entity);
        } else {
          updated.push(entity);
        }
        return this.entityService.publish(updated);
      }
      case DialogMode.DELETE: {
        const updated = [...entities];
        const idx = updated.findIndex(e => e.name === entity.name);
        if (idx !== -1) {
          updated.splice(idx, 1);
        }
        return this.entityService.publish(updated);
      }
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

  createDialogRef(
    mode: DialogMode,
    entity: AppQuestionnaire | undefined,
    entities: AppQuestionnaire[],
    language: string
  ): MatDialogRef<QuestionnaireDialogComponent> {
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(QuestionnaireDialogComponent, {
          data: {mode, entity, entities, language},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(QuestionnaireDialogComponent, {
          data: {mode, entity, entities, language},
          panelClass: 'tailwind-slide-panel',
          width: '80%',
          height: '100vh',
          position: {right: '0'},
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
    }
  }

  // openPublishDialog(
  //   mode: "publish" | "discard",
  //   entities: AppQuestionnaire[],
  //   projectId?: string,
  //   subjectId?: string
  // ) {
  //   const dialogRef = this.createPublishDialogRef(mode, entities);
  //
  //   const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
  //     next: (value: { action: DialogMode | string; entity: AppConfig }) => {
  //       if (value.action === 'publish') {
  //         if (entities) {
  //           this.entityService.publish(entities, projectId, subjectId).subscribe({
  //             next: (res) => {
  //               this.dialogUpdateEvent$.set({mode: 'published', entity: undefined});
  //               dialogRef.close();
  //             },
  //             error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
  //           })
  //         }
  //       } else if (value.action === 'discard') {
  //         this.dialogUpdateEvent$.set({mode: 'discarded', entity: undefined});
  //         dialogRef.close();
  //       }
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(() => {
  //     dialogActionSubscription.unsubscribe();
  //   });
  // }

  createPublishDialogRef(
    mode: "publish" | "discard",
    entities?: AppQuestionnaire[]
  ): MatDialogRef<ConfigPublishDialogComponent> {
    return this.dialog.open(ConfigPublishDialogComponent, {
      data: {mode, entities},
      width: '50%',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}
