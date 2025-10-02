import {Component, inject, input} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {AppSubject, SubjectStatus} from '../../models/subject';
import {MatTooltip} from '@angular/material/tooltip';
import {SubjectDialogMode} from '../../enums/dialog';
import {DialogMode} from '../../../../enums/dialog';
import {
  SubjectDialogPairSourceComponent
} from '../../containers/subject-dialog-pair-source/subject-dialog-pair-source.component';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton,
    MatTooltip
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = SubjectDialogMode;

  entity$ = input.required<AppSubject>();
  isExpanded$ = input<boolean>(true);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onAction(mode: SubjectDialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/subject/${this.entity$().id}`
    }).then()
  }

  // pairSource() {
  //   this.openPairSourceDialog();
  // }
  //
  // private openPairSourceDialog() {
  //   const dialogRef = this.getPairSourceDialogRef();
  //   // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });
  //
  //   const dialogActionSubscription =
  //     dialogRef.componentInstance.actionTriggered.subscribe({
  //       next: (value: {
  //         action: DialogMode | string;
  //         entity: AppSubject;
  //       }) => {
  //         if (value.action === DialogMode.EDIT) {
  //           this.update(value.entity).subscribe({
  //             next: () => this.onPairSourceSuccess(dialogRef),
  //             error: (err) => this.onPairSourceError(err, dialogRef),
  //           });
  //           // } else if (value.action === DialogMode.ADD) {
  //           //   console.log(value.entity)
  //           //   this.add(value.entity).subscribe({
  //           //     next: () => this.onSuccess(mode, dialogRef, value.entity),
  //           //     error: (err) => this.onError(err, dialogRef)
  //           //   })
  //           // } else if (value.action === DialogMode.DELETE) {
  //           //   if(value.entity.login) {
  //           //     this.delete(value.entity.login).subscribe({
  //           //       next: () => this.onSuccess(mode, dialogRef, value.entity),
  //           //       error: (err) => this.onError(err, dialogRef)
  //           //     })
  //           //   }
  //         } else if (value.action === 'close') {
  //           // this.applyStateChangesToUrlQueryParams({[mode]: null});
  //         }
  //       },
  //     });
  //   dialogRef.afterClosed().subscribe(() => {
  //     dialogActionSubscription.unsubscribe();
  //   });
  // }
  //
  // getPairSourceDialogRef() {
  //   return this.dialog.open(SubjectDialogPairSourceComponent, {
  //     data: {
  //       entity: this.entity(),
  //     },
  //     panelClass: ['w-full', 'max-w-[700px]!', 'sm:w-1/2'],
  //     hasBackdrop: true,
  //     disableClose: true,
  //     autoFocus: false,
  //     restoreFocus: false
  //   });
  // }
  //
  // private onPairSourceSuccess(
  //   dialogRef: MatDialogRef<SubjectDialogPairSourceComponent>,
  // ): void {
  //   // this.applyStateChangesToUrlQueryParams({[mode]: null});
  //   dialogRef.close();
  // }
  //
  // protected onPairSourceError(
  //   err: HttpErrorResponse,
  //   dialogRef: MatDialogRef<SubjectDialogPairSourceComponent>
  // ) {
  //   dialogRef.componentInstance.errorHappened(err);
  // }
  //
  // update(entity: AppSubject) {
  //   entity.status = SubjectStatus.ACTIVATED;
  //   // entity.project = this.project;
  //   // const ent = {
  //   //   attributes: {},
  //   //   id: 1602,
  //   //   login: 'f35b0e79-d17b-437e-835f-01f96285350b',
  //   //   personName: '123',
  //   //   project: this.project,
  //   //   roles: [
  //   //     {
  //   //       authorityName: 'ROLE_PARTICIPANT',
  //   //       id: 2,
  //   //       projectId: 1,
  //   //       projectName: 'radar',
  //   //     },
  //   //   ],
  //   //   sources: [],
  //   //   status: SubjectStatus.ACTIVATED, //"ACTIVATED",
  //   // };
  //   // console.log(ent);
  //   // const ent2 = {
  //   //   attributes: {}
  //   //   createdBy: "system"
  //   //   createdDate: "2022-01-23T10:07:40.048946+01:00"
  //   //   dateOfBirth: null
  //   //   enrollmentDate: "2022-01-23T10:07:40.048946+01:00"
  //   //   externalId: ""
  //   //   externalLink: ""
  //   //   group: null
  //   //   id: 2
  //   //   lastModifiedBy: "system"
  //   //   lastModifiedDate: "2022-01-23T10:07:40.048946+01:00"
  //   //   login: "sub-2"
  //   //   personName: "hjghjg"
  //   //   project: {id: 1, projectName: "radar", description: "RadarTest",…}
  //   // roles: [{id: 2, projectId: 1, projectName: "radar", authorityName: "ROLE_PARTICIPANT"}]
  //   // sources: []
  //   // status: "ACTIVATED"
  //   // }
  //   return this.entityService.update(entity);
  // }
}
