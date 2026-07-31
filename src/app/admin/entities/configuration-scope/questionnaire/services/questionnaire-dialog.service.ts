import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppQuestionnaire} from "../models/questionnaire";
import {QuestionnaireService} from "./questionnaire.service";
import {
  QuestionnaireDialogComponent
} from "../containers/questionnaire-dialog/questionnaire-dialog.component";
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {QuestionnaireConfigService} from './questionnaire-config.service';
// import {HttpErrorResponse} from '@angular/common/http';
// import {
//   ConfigPublishDialogComponent
// } from '../../config/containers/config-publish-dialog/config-publish-dialog.component';

@Injectable({providedIn: 'root'})
export class QuestionnaireDialogService extends BaseDialogService<AppQuestionnaire, AppQuestionnaire, QuestionnaireDialogComponent> {
  override entityService = inject(QuestionnaireService);
  override configService = inject(QuestionnaireConfigService);

  override createDialogRef(
    mode: DialogMode,
    entity?: AppQuestionnaire,
  ): MatDialogRef<QuestionnaireDialogComponent> {
    const questionnaireFullList = this.entityService.getWithQuery();

    const _data = {id: 'questionnaire-dialog', mode, entity, questionnaireFullList};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(QuestionnaireDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(QuestionnaireDialogComponent, {
          id: 'questionnaire-dialog',
          data: _data,
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

  // openPublishDialog(mode: "publish" | "discard", entities: AppQuestionnaire[], projectId?: string, subjectId?: string) {
  //   const dialogRef = this.createPublishDialogRef(mode);
  //
  //   const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe(
  //     (value) => {
  //       if (value.action === 'publish') {
  //         if (entities) {
  //           this.entityService.publish(entities, projectId, subjectId).subscribe({
  //             next: () => {
  //               this.dialogUpdateEvent.set({mode: 'published', entity: undefined});
  //               dialogRef.close();
  //             },
  //             error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
  //           })
  //         }
  //       } else if (value.action === 'discard') {
  //         this.dialogUpdateEvent.set({mode: 'discarded', entity: undefined});
  //         dialogRef.close();
  //       }
  //     }
  //   );
  //
  //   dialogRef.afterClosed().subscribe(() => {
  //     dialogActionSubscription.unsubscribe();
  //   });
  // }

  // createPublishDialogRef(mode: "publish" | "discard"): MatDialogRef<ConfigPublishDialogComponent> {
  //   const originalList = this.entityService.cache;
  //   const updatedList = this.entityService.updatedList;
  //   return this.dialog.open(ConfigPublishDialogComponent, {
  //     data: {mode, originalList, updatedList},
  //     panelClass: 'tailwind-slide-panel',
  //     width: '50%',
  //     height: '100vh',
  //     position: {right: '0'},
  //     hasBackdrop: true,
  //     disableClose: true,
  //     autoFocus: false,
  //     restoreFocus: false
  //   });
  // }
}
