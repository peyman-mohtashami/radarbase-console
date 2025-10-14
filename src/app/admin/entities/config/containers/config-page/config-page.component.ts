// import { Component, OnDestroy, OnInit } from '@angular/core';
// import {Location, NgIf} from '@angular/common';
// import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
//
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//
//
// import { DialogMode } from '../../../../enums/dialog';
// // import { QueryParams } from "@ngrx/data";
// import { HttpErrorResponse } from '@angular/common/http';
// import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';
// import { ConfigService } from '../../services/config.service';
// import { BaseEntityPageComponent } from '../../../../components/base-entity-page/base-entity-page.component';
// import { AppProject } from "../../../project/models/project";
// import { AppClient } from "../../../client/models/client";
// import { AppGroup } from "../../../group/models/group";
// import {AppConfig} from "../../models/config";
// import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatChipOption} from "@angular/material/chips";
// import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
// import {ConfigDetailsComponent} from "../../components/config-details/config-details.component";
// import {MatIcon} from "@angular/material/icon";
// import {MatIconButton} from "@angular/material/button";
//
// @Component({
//   selector: 'rb-config-page',
//   templateUrl: './config-page.component.html',
//   imports: [
//     LoaderComponent,
//     NgIf,
//     TranslatePipe,
//     MatChipOption,
//     MatIcon,
//     MatIconButton,
//     MatMenu,
//     RouterOutlet,
//     ConfigDetailsComponent,
//     RouterLink,
//     MatMenuItem,
//     MatMenuTrigger
//   ]
// })
// export class ConfigPageComponent
//   extends BaseEntityPageComponent<AppConfig, ConfigDialogComponent>
//   implements OnInit, OnDestroy
// {
//   // projectName?: string = this.entity.project?.projectName;
//   // organizationName?: string = this.entity.project?.organization.name;
//   projects: AppProject[] = this.activatedRoute.snapshot.data['projects'];
//   project?: AppProject;
//   clients: AppClient[] = this.activatedRoute.snapshot.data['clients'];
//
//   groups?: AppGroup[];
//
//   constructor(
//     router: Router,
//     dialog: MatDialog,
//     activatedRoute: ActivatedRoute,
//     location: Location,
//     private entityService: ConfigService // private groupService: GroupService
//   ) {
//     super(router, activatedRoute, dialog, location);
//   }
//
//   ngOnInit() {
//     //
//   }
//
//   override ngOnDestroy() {
//     super.ngOnDestroy();
//   }
//
//   override getDialogRef(
//     mode: DialogMode,
//     entity: AppConfig
//   ): MatDialogRef<ConfigDialogComponent> {
//     return this.dialog.open(ConfigDialogComponent, {
//       data: { mode, entity, projects: this.projects, groups: this.groups },
//       // data: { mode, entity },
//       panelClass: ['scrollable', 'full-width-dialog'],
//       disableClose: true,
//     });
//   }
//
//   override update(
//     entity: AppConfig,
//     dialogRef: MatDialogRef<ConfigDialogComponent>
//   ) {
//     this.entityService.update(entity).subscribe({
//       next: (_entity) => this.onSuccess(_entity, dialogRef),
//       error: (err: HttpErrorResponse) => this.onError(err, dialogRef),
//     });
//   }
//
//   override delete(
//     entity: AppConfig,
//     dialogRef: MatDialogRef<ConfigDialogComponent>
//   ) {
//     this.entityService.delete(entity.name).subscribe({
//       next: () => this.onDeleteSuccess(dialogRef),
//       error: (err: HttpErrorResponse) => this.onError(err, dialogRef),
//     });
//   }
//
//   onDeleteSuccess(dialogRef: MatDialogRef<ConfigDialogComponent>): void {
//     //this.entity = entity;
//     // this.router.navigate(
//     //   ['/admin/projects', this.projectName, 'subjects']
//     // ).then(() => dialogRef.close());
//   }
//
//   // discontinue(entity: RadarSubject, e?: Event) {
//   //   e?.stopPropagation();
//   //   if (entity) {
//   //     return this.openDiscontinueDialog(entity);
//   //   }
//   // }
//   //
//   // private openDiscontinueDialog(entity?: RadarSubject) {
//   //   const dialogRef = this.getDiscontinueDialogRef(entity)
//   //
//   //   const dialogActionSubscription = dialogRef.componentInstance.actionTriggered.subscribe({
//   //     next: (value: {action: DialogMode | string, entity: RadarSubject}) => {
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
//   // getDiscontinueDialogRef(entity?: RadarSubject){
//   //   return this.dialog.open(SubjectDiscontinueDialogComponent, {
//   //     data: { mode: DialogMode.DELETE, entity, projectName: this.projectName, projects: this.projects, clients: this.clients },
//   //     panelClass: ['scrollable', 'full-width-dialog'],
//   //     disableClose: true,
//   //   });
//   // }
//   //
//   // private onDiscontinueSuccess(dialogRef: MatDialogRef<SubjectDiscontinueDialogComponent>, entity: RadarSubject): void {
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
//   // pairApp(entity: RadarSubject, e?: Event) {
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
//   // private openPairAppDialog(entity?: RadarSubject) {
//   //   const dialogRef = this.getPairAppDialogRef(entity)
//   //   // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });
//   //
//   //   const dialogActionSubscription = dialogRef.componentInstance.actionTriggered.subscribe({
//   //     next: (value: {action: DialogMode | string, entity: RadarSubject}) => {
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
//   // getPairAppDialogRef(entity?: RadarSubject){
//   //   return this.dialog.open(SubjectPairAppDialogComponent, {
//   //     data: { entity, projectName: this.projectName, projects: this.projects, clients: this.clients },
//   //     panelClass: ['scrollable', 'full-width-dialog'],
//   //     disableClose: true,
//   //   });
//   // }
//   //
//   // private onPairAppSuccess(dialogRef:  MatDialogRef<SubjectPairAppDialogComponent>, entity: RadarSubject): void {
//   //   //this.updateTrigger$.next(entity.login || '0');
//   //   // this.applyStateChangesToUrlQueryParams({[mode]: null});
//   //   dialogRef.close();
//   // }
//   //
//   // protected onPairAppError(err: HttpErrorResponse, dialogRef: MatDialogRef<SubjectPairAppDialogComponent>) {
//   //   dialogRef.componentInstance.errorHappened(err);
//   // }
//   //
//   // pairSource(entity: RadarSubject, e?: Event) {
//   //   e?.stopPropagation();
//   //   console.log(entity);
//   //   // e?.stopPropagation();
//   //
//   //   if (entity) {
//   //     return this.openPairSourceDialog(entity);
//   //   }
//   // }
//   //
//   // private openPairSourceDialog(entity?: RadarSubject) {
//   //   const dialogRef = this.getPairSourceDialogRef(entity)
//   //   // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });
//   //
//   //   const dialogActionSubscription = dialogRef.componentInstance.actionTriggered.subscribe({
//   //     next: (value: {action: DialogMode | string, entity: RadarSubject}) => {
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
//   // getPairSourceDialogRef(entity?: RadarSubject){
//   //   return this.dialog.open(SubjectPairSourceDialogComponent, {
//   //     data: { entity, projectName: this.projectName, projects: this.projects, clients: this.clients },
//   //     panelClass: ['scrollable', 'full-width-dialog'],
//   //     disableClose: true,
//   //   });
//   // }
//   //
//   // private onPairSourceSuccess(dialogRef:  MatDialogRef<SubjectPairSourceDialogComponent>, entity: RadarSubject): void {
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
//   // override navigate(entity: RadarSubject) {
//   //   this.router.navigate(['/admin','organizations', entity.name, 'projects']).then();
//   // }
// }
