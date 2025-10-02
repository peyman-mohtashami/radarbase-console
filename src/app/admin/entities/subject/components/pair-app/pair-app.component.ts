// import {Component, input} from '@angular/core';
// import { DialogMode } from '../../../../enums/dialog';
// import { SubjectDialogPairAppComponent } from '../../containers/subject-dialog-pair-app/subject-dialog-pair-app.component';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { HttpErrorResponse } from '@angular/common/http';
// import { SubjectService } from '../../services/subject.service';
// import {AppSubject, SubjectStatus} from "../../models/subject";
// import { AppClient } from "../../../client/models/client";
// import {MatMenuItem} from "@angular/material/menu";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatIconButton} from "@angular/material/button";
//
// @Component({
//   selector: 'rb-pair-app',
//   templateUrl: './pair-app.component.html',
//   imports: [
//     MatMenuItem,
//     TranslatePipe,
//     MatIconButton
//   ]
// })
// export class PairAppComponent {
//   entity = input.required<AppSubject>();
//   clients = input<AppClient[]>();
//   mode = input<string>("BUTTON");
//
//   constructor(
//     private dialog: MatDialog,
//     private entityService: SubjectService
//   ) {}
//
//   pairApp() {
//     this.openPairAppDialog();
//   }
//
//   private openPairAppDialog() {
//     const dialogRef = this.getPairAppDialogRef();
//     // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });
//
//     const dialogActionSubscription =
//       dialogRef.componentInstance.actionTriggered.subscribe({
//         next: (value: {
//           action: DialogMode | string;
//           entity: AppSubject;
//         }) => {
//           if (value.action === DialogMode.EDIT) {
//             this.update(value.entity).subscribe({
//               next: () => this.onPairAppSuccess(dialogRef),
//               error: (err) => this.onPairAppError(err, dialogRef),
//             });
//           } else if (value.action === 'close') {
//             // this.applyStateChangesToUrlQueryParams({[mode]: null});
//           }
//         },
//       });
//     dialogRef.afterClosed().subscribe(() => {
//       dialogActionSubscription.unsubscribe();
//     });
//   }
//
//   getPairAppDialogRef() {
//     return this.dialog.open(SubjectDialogPairAppComponent, {
//       data: {
//         entity: this.entity(),
//         clients: this.clients(),
//       },
//       panelClass: ['w-full', 'max-w-[700px]!', 'sm:w-1/2'],
//       hasBackdrop: true,
//       disableClose: true,
//       autoFocus: false,
//       restoreFocus: false
//     });
//   }
//
//   private onPairAppSuccess(
//     dialogRef: MatDialogRef<SubjectDialogPairAppComponent>,
//   ): void {
//     // this.applyStateChangesToUrlQueryParams({[mode]: null});
//     dialogRef.close();
//   }
//
//   protected onPairAppError(
//     err: HttpErrorResponse,
//     dialogRef: MatDialogRef<SubjectDialogPairAppComponent>
//   ) {
//     dialogRef.componentInstance.errorHappened(err);
//   }
//
//   update(entity: AppSubject) {
//     entity.status = SubjectStatus.ACTIVATED;
//     // entity.project = this.project;
//     // const ent = {
//     //   attributes: {},
//     //   id: 1602,
//     //   login: 'f35b0e79-d17b-437e-835f-01f96285350b',
//     //   personName: '123',
//     //   project: this.project,
//     //   roles: [
//     //     {
//     //       authorityName: 'ROLE_PARTICIPANT',
//     //       id: 2,
//     //       projectId: 1,
//     //       projectName: 'radar',
//     //     },
//     //   ],
//     //   sources: [],
//     //   status: SubjectStatus.ACTIVATED, //"ACTIVATED",
//     // };
//     // console.log(ent);
//     // const ent2 = {
//     //   attributes: {}
//     //   createdBy: "system"
//     //   createdDate: "2022-01-23T10:07:40.048946+01:00"
//     //   dateOfBirth: null
//     //   enrollmentDate: "2022-01-23T10:07:40.048946+01:00"
//     //   externalId: ""
//     //   externalLink: ""
//     //   group: null
//     //   id: 2
//     //   lastModifiedBy: "system"
//     //   lastModifiedDate: "2022-01-23T10:07:40.048946+01:00"
//     //   login: "sub-2"
//     //   personName: "hjghjg"
//     //   project: {id: 1, projectName: "radar", description: "RadarTest",…}
//     // roles: [{id: 2, projectId: 1, projectName: "radar", authorityName: "ROLE_PARTICIPANT"}]
//     // sources: []
//     // status: "ACTIVATED"
//     // }
//     return this.entityService.update(entity);
//   }
// }
