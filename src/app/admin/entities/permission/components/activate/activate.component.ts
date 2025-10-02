// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { DialogMode } from '../../../../enums/dialog';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { HttpErrorResponse } from '@angular/common/http';
// import { UserActivateDialogComponent } from '../../containers/user-activate-dialog/user-activate-dialog.component';
// import { AppUser } from "../../models/user";
// import {MatIconButton} from "@angular/material/button";
// import {PermissionService} from "../../services/permission.service";
//
// @Component({
//   selector: 'rb-activate',
//   templateUrl: './activate.component.html',
//   imports: [
//     MatIconButton,
//   ]
// })
// export class ActivateComponent {
//   @Input() entity!: AppUser;
//   @Output() updateTrigger: EventEmitter<string> = new EventEmitter<string>();
//
//   constructor(
//     private dialog: MatDialog,
//     private userService: PermissionService,
//   ) {}
//
//   activate(entity: AppUser, e?: Event) {
//     e?.stopPropagation();
//     if (entity) {
//       return this.openActivateDialog(entity);
//     }
//   }
//
//   sendActivationEmail(entity: AppUser) {
//     console.log(entity);
//     return this.userService.sendActivationEmail(entity);
//   }
//
//   private openActivateDialog(entity: AppUser) {
//     const dialogRef = this.getActivateDialogRef(entity);
//     // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });
//
//     const dialogActionSubscription =
//       dialogRef.componentInstance.actionTriggered.subscribe({
//         next: (value: {
//           action: DialogMode | string;
//           entity: AppUser;
//         }) => {
//           this.sendActivationEmail(entity).subscribe({
//             next: () => this.onActivateSuccess(dialogRef, entity),
//             error: (err) => this.onActivateError(err, dialogRef),
//           });
//           // if (value.action === DialogMode.EDIT) {
//           //   this.update(value.entity).subscribe({
//           //     next: () => this.onDiscontinueSuccess(dialogRef, value.entity),
//           //     error: (err) => this.onDiscontinueError(err, dialogRef)
//           //   })
//           // } else if (value.action === DialogMode.ADD) {
//           //   console.log(value.entity)
//           //   this.add(value.entity).subscribe({
//           //     next: () => this.onSuccess(mode, dialogRef, value.entity),
//           //     error: (err) => this.onError(err, dialogRef)
//           //   })
//           // } else if (value.action === DialogMode.DELETE) {
//           // if (value.action === DialogMode.DELETE) {
//           //   this.delete(value.entity).subscribe({
//           //     next: () => this.onDiscontinueSuccess(dialogRef, value.entity),
//           //     error: (err) => this.onDiscontinueError(err, dialogRef)
//           //   })
//           // } else if (value.action === 'close') {
//           //   // this.applyStateChangesToUrlQueryParams({[mode]: null});
//           // }
//         },
//       });
//     dialogRef.afterClosed().subscribe(() => {
//       dialogActionSubscription.unsubscribe();
//     });
//   }
//
//   getActivateDialogRef(entity?: AppUser) {
//     return this.dialog.open(UserActivateDialogComponent, {
//       data: { mode: DialogMode.DELETE, entity },
//       panelClass: ['scrollable', 'full-width-dialog'],
//       disableClose: true,
//     });
//   }
//
//   private onActivateSuccess(
//     dialogRef: MatDialogRef<UserActivateDialogComponent>,
//     entity: AppUser
//   ): void {
//     this.updateTrigger.emit(entity.login || '0');
//     // this.updateTrigger$.next(entity.login || '0');
//     // this.applyStateChangesToUrlQueryParams({[mode]: null});
//     dialogRef.close();
//   }
//
//   protected onActivateError(
//     err: HttpErrorResponse,
//     dialogRef: MatDialogRef<UserActivateDialogComponent>
//   ) {
//     dialogRef.componentInstance.errorHappened(err);
//   }
// }
