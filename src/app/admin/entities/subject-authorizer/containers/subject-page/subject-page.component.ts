// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Location } from '@angular/common';
// // import { HttpErrorResponse } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//
// import {
//   RadarClientDef,
//   RadarGroupDef,
//   RadarOrganizationDef,
//   RadarProjectDef,
//   RadarSubjectDef,
// } from '@rb/models';
// import { SubjectService } from '../../services/subject.service';
// import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
// // import { SubjectDiscontinueDialogComponent } from '../subject-discontinue-dialog/subject-discontinue-dialog.component';
// // import { SubjectPairAppDialogComponent } from '../subject-pair-app-dialog/subject-pair-app-dialog.component';
// // import { SubjectPairSourceDialogComponent } from '../subject-pair-source-dialog/subject-pair-source-dialog.component';
// import { DialogMode } from '../../../../enums/dialog';
// import { FormFieldType } from '../../../../models/dialog.model';
// import { GroupService } from '../../../group/services/group.service';
// import { QueryParams } from '@ngrx/data';
// import { BaseDetailsPageComponent } from '../../../../components/base-details-page/base-details-page.component';
//
// @Component({
//   selector: 'rb-subject-details-page',
//   templateUrl: './subject-details-page.component.html',
// })
// export class SubjectDetailsPageComponent
//   extends BaseDetailsPageComponent<RadarSubjectDef, SubjectDialogComponent>
//   implements OnInit, OnDestroy
// {
//   projectName?: string = this.entity.project?.projectName;
//   organizationName?: string = this.entity.project?.organization.name;
//   projects: RadarProjectDef[] = this.activatedRoute.snapshot.data['projects'];
//   project?: RadarProjectDef;
//   clients: RadarClientDef[] = this.activatedRoute.snapshot.data['clients'];
//
//   groups?: RadarGroupDef[];
//
//   constructor(
//     router: Router,
//     dialog: MatDialog,
//     activatedRoute: ActivatedRoute,
//     location: Location,
//     private entityService: SubjectService,
//     private groupService: GroupService
//   ) {
//     super(router, activatedRoute, dialog, location);
//   }
//
//   ngOnInit() {
//     if (this.projectName) {
//       const params: QueryParams = { parentEntityName: this.projectName };
//       this.groupService
//         .getWithQuery(params)
//         .subscribe((groups: RadarGroupDef[]) => {
//           this.groups = groups;
//         });
//       this.project = this.projects.filter(
//         (p) => p.projectName === this.projectName
//       )[0];
//     }
//   }
//
//   override ngOnDestroy() {
//     super.ngOnDestroy();
//   }
//
//   override getDialogRef(
//     mode: DialogMode,
//     entity: RadarSubjectDef
//   ): MatDialogRef<SubjectDialogComponent> {
//     return this.dialog.open(SubjectDialogComponent, {
//       data: {
//         mode,
//         entity,
//         projectName: this.projectName,
//         projects: this.projects,
//         groups: this.groups,
//       },
//       // data: { mode, entity },
//       panelClass: ['scrollable', 'full-width-dialog'],
//       disableClose: true,
//     });
//   }
//
//   override update(
//     entity: RadarSubjectDef,
//     dialogRef: MatDialogRef<SubjectDialogComponent>
//   ) {
//     this.entityService.update(entity).subscribe({
//       next: (_entity) => this.onSuccess(_entity, dialogRef),
//       error: (err) => this.onError(err, dialogRef),
//     });
//   }
//
//   override delete(
//     entity: RadarSubjectDef,
//     dialogRef: MatDialogRef<SubjectDialogComponent>
//   ) {
//     this.entityService.delete(entity.login).subscribe({
//       next: () => this.onDeleteSuccess(dialogRef),
//       error: (err) => this.onError(err, dialogRef),
//     });
//   }
//
//   onDeleteSuccess(dialogRef: MatDialogRef<SubjectDialogComponent>): void {
//     //this.entity = entity;
//     this.router
//       .navigate(['/admin/projects', this.projectName, 'subjects'])
//       .then(() => dialogRef.close());
//   }
//
//   // discontinue(entity: RadarSubjectDef, e?: Event) {
//   //   e?.stopPropagation();
//   //   if (entity) {
//   //     return this.openDiscontinueDialog(entity);
//   //   }
//   // }
//   //
//   // private openDiscontinueDialog(entity?: RadarSubjectDef) {
//   //   const dialogRef = this.getDiscontinueDialogRef(entity)
//   //
//   //   const dialogActionSubscription = dialogRef.componentInstance.actionTriggered.subscribe({
//   //     next: (value: {action: DialogMode | string, entity: RadarSubjectDef}) => {
//   //       if (value.action === DialogMode.DELETE) {
//   //         this.entityService.delete(value.entity.login).subscribe({
//   //           next: () => this.onDiscontinueSuccess(dialogRef, value.entity),
//   //           error: (err) => this.onDiscontinueError(err, dialogRef)
//   //         })
//   //       } else if (value.action === 'close') {
//   //         // this.applyStateChangesToUrlQueryParams({[mode]: null});
//   //       }
//   //     }
//   //   });
//   //   dialogRef.afterClosed().subscribe(() => {
//   //     dialogActionSubscription.unsubscribe();
//   //   });
//   // }
//   //
//   // getDiscontinueDialogRef(entity?: RadarSubjectDef){
//   //   return this.dialog.open(SubjectDiscontinueDialogComponent, {
//   //     data: { mode: DialogMode.DELETE, entity, projectName: this.projectName, projects: this.projects, clients: this.clients },
//   //     panelClass: ['scrollable', 'full-width-dialog'],
//   //     disableClose: true,
//   //   });
//   // }
//   //
//   // private onDiscontinueSuccess(dialogRef: MatDialogRef<SubjectDiscontinueDialogComponent>, entity: RadarSubjectDef): void {
//   //   this.router.navigate(['/admin/projects', this.projectName, 'subjects']).then(() => dialogRef.close())
//   //   // this.updateTrigger$.next(entity.login || '0');
//   //   // this.applyStateChangesToUrlQueryParams({[mode]: null});
//   //
//   // }
//   //
//   // protected onDiscontinueError(err: HttpErrorResponse, dialogRef: MatDialogRef<SubjectDiscontinueDialogComponent>) {
//   //   dialogRef.componentInstance.errorHappened(err);
//   // }
//
//   // pairApp(entity: RadarSubjectDef, e?: Event) {
//   //   e?.stopPropagation();
//   //   console.log(entity);
//   //   // e?.stopPropagation();
//   //
//   //   if (entity) {
//   //     return this.openPairAppDialog(entity);
//   //   }
//   //
//   // }
//   //
//   // private openPairAppDialog(entity?: RadarSubjectDef) {
//   //   const dialogRef = this.getPairAppDialogRef(entity)
//   //   // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });
//   //
//   //   const dialogActionSubscription = dialogRef.componentInstance.actionTriggered.subscribe({
//   //     next: (value: {action: DialogMode | string, entity: RadarSubjectDef}) => {
//   //       if (value.action === DialogMode.EDIT) {
//   //         this.entityService.update(value.entity).subscribe({
//   //           next: () => this.onPairAppSuccess(dialogRef, value.entity),
//   //           error: (err) => this.onPairAppError(err, dialogRef)
//   //         })
//   //         // } else if (value.action === DialogMode.ADD) {
//   //         //   console.log(value.entity)
//   //         //   this.add(value.entity).subscribe({
//   //         //     next: () => this.onSuccess(mode, dialogRef, value.entity),
//   //         //     error: (err) => this.onError(err, dialogRef)
//   //         //   })
//   //         // } else if (value.action === DialogMode.DELETE) {
//   //         //   if(value.entity.login) {
//   //         //     this.delete(value.entity.login).subscribe({
//   //         //       next: () => this.onSuccess(mode, dialogRef, value.entity),
//   //         //       error: (err) => this.onError(err, dialogRef)
//   //         //     })
//   //         //   }
//   //       } else if (value.action === 'close') {
//   //         // this.applyStateChangesToUrlQueryParams({[mode]: null});
//   //       }
//   //     }
//   //   });
//   //   dialogRef.afterClosed().subscribe(() => {
//   //     dialogActionSubscription.unsubscribe();
//   //   });
//   // }
//   //
//   // getPairAppDialogRef(entity?: RadarSubjectDef){
//   //   return this.dialog.open(SubjectPairAppDialogComponent, {
//   //     data: { entity, projectName: this.projectName, projects: this.projects, clients: this.clients },
//   //     panelClass: ['scrollable', 'full-width-dialog'],
//   //     disableClose: true,
//   //   });
//   // }
//   //
//   // private onPairAppSuccess(dialogRef:  MatDialogRef<SubjectPairAppDialogComponent>, entity: RadarSubjectDef): void {
//   //   //this.updateTrigger$.next(entity.login || '0');
//   //   // this.applyStateChangesToUrlQueryParams({[mode]: null});
//   //   dialogRef.close();
//   // }
//   //
//   // protected onPairAppError(err: HttpErrorResponse, dialogRef: MatDialogRef<SubjectPairAppDialogComponent>) {
//   //   dialogRef.componentInstance.errorHappened(err);
//   // }
//   //
//   // pairSource(entity: RadarSubjectDef, e?: Event) {
//   //   e?.stopPropagation();
//   //   console.log(entity);
//   //   // e?.stopPropagation();
//   //
//   //   if (entity) {
//   //     return this.openPairSourceDialog(entity);
//   //   }
//   // }
//   //
//   // private openPairSourceDialog(entity?: RadarSubjectDef) {
//   //   const dialogRef = this.getPairSourceDialogRef(entity)
//   //   // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });
//   //
//   //   const dialogActionSubscription = dialogRef.componentInstance.actionTriggered.subscribe({
//   //     next: (value: {action: DialogMode | string, entity: RadarSubjectDef}) => {
//   //       if (value.action === DialogMode.EDIT) {
//   //         this.entityService.update(value.entity).subscribe({
//   //           next: () => this.onPairSourceSuccess(dialogRef, value.entity),
//   //           error: (err) => this.onPairSourceError(err, dialogRef)
//   //         })
//   //         // } else if (value.action === DialogMode.ADD) {
//   //         //   console.log(value.entity)
//   //         //   this.add(value.entity).subscribe({
//   //         //     next: () => this.onSuccess(mode, dialogRef, value.entity),
//   //         //     error: (err) => this.onError(err, dialogRef)
//   //         //   })
//   //         // } else if (value.action === DialogMode.DELETE) {
//   //         //   if(value.entity.login) {
//   //         //     this.delete(value.entity.login).subscribe({
//   //         //       next: () => this.onSuccess(mode, dialogRef, value.entity),
//   //         //       error: (err) => this.onError(err, dialogRef)
//   //         //     })
//   //         //   }
//   //       } else if (value.action === 'close') {
//   //         // this.applyStateChangesToUrlQueryParams({[mode]: null});
//   //       }
//   //     }
//   //   });
//   //   dialogRef.afterClosed().subscribe(() => {
//   //     dialogActionSubscription.unsubscribe();
//   //   });
//   // }
//   //
//   // getPairSourceDialogRef(entity?: RadarSubjectDef){
//   //   return this.dialog.open(SubjectPairSourceDialogComponent, {
//   //     data: { entity, projectName: this.projectName, projects: this.projects, clients: this.clients },
//   //     panelClass: ['scrollable', 'full-width-dialog'],
//   //     disableClose: true,
//   //   });
//   // }
//   //
//   // private onPairSourceSuccess(dialogRef:  MatDialogRef<SubjectPairSourceDialogComponent>, entity: RadarSubjectDef): void {
//   //   //this.updateTrigger$.next(entity.login || '0');
//   //   // this.applyStateChangesToUrlQueryParams({[mode]: null});
//   //   dialogRef.close();
//   // }
//   //
//   // protected onPairSourceError(err: HttpErrorResponse, dialogRef: MatDialogRef<SubjectPairSourceDialogComponent>) {
//   //   dialogRef.componentInstance.errorHappened(err);
//   // }
//
//   triggerUpdate($event: string) {
//     // this.updateTrigger$.next($event);
//   }
//
//   // override navigate(entity: RadarSubjectDef) {
//   //   this.router.navigate(['/admin','organizations', entity.name, 'projects']).then();
//   // }
// }
