// import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// import {MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
//
// import { SubjectStatus } from '@rb/models';
// import { DateAdapter } from '@angular/material/core';
// import { DialogMode } from '../../../../enums/dialog';
// import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
// import { AppSubject } from "../../models/subject";
// import { AppProject } from "../../../project/models/project";
// import { AppGroup } from "../../../group/models/group";
// import {Store} from "@ngrx/store";
// import {AuthorizationService} from "../../services/authorization.service";
// import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
// import {NgIf} from "@angular/common";
// import {
//   DialogBodyDescriptionComponent
// } from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
// import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
// import {TranslatePipe} from "@ngx-translate/core";
// import {
//   MatDatepickerToggle,
//   MatDateRangeInput,
//   MatDateRangePicker,
//   MatEndDate,
//   MatStartDate
// } from "@angular/material/datepicker";
// import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
// import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
// import {MatFormField} from "@angular/material/input";
// import {MatLabel} from "@angular/material/select";
// import {MatError} from "@angular/material/form-field";
// import {MatButton, MatIconButton} from "@angular/material/button";
// import {MatIcon} from "@angular/material/icon";
// import {MatProgressSpinner} from "@angular/material/progress-spinner";
//
// @Component({
//   selector: 'rb-subject-authorization-dialog',
//   templateUrl: './subject-authorization-dialog.component.html',
//   imports: [
//     DialogTitleComponent,
//     NgIf,
//     MatDialogContent,
//     DialogBodyDescriptionComponent,
//     SubjectDetailsComponent,
//     TranslatePipe,
//     MatFormField,
//     ReactiveFormsModule,
//     MatStartDate,
//     MatEndDate,
//     MatDateRangeInput,
//     MatLabel,
//     MatDatepickerToggle,
//     MatDateRangePicker,
//     MatError,
//     CdkCopyToClipboard,
//     MatIconButton,
//     MatIcon,
//     ErrorMessageComponent,
//     MatDialogClose,
//     MatProgressSpinner,
//     MatButton
//   ]
// })
// export class SubjectAuthorizationDialogComponent
//   extends BaseDialogComponent<AppSubject, SubjectAuthorizationDialogComponent>
//   implements OnInit, OnDestroy
// {
//   override form = new FormGroup({
//     startDate: new FormControl({value: "", disabled: this.mode == DialogMode.VIEW}, {validators: [Validators.required], nonNullable: true}),
//     endDate: new FormControl({ value: "", disabled: this.mode == DialogMode.VIEW }, {nonNullable: true}),
//   });
//
//   SubjectStatus = SubjectStatus;
//
//   projects = this.data.projects;
//   projectName = this.data.projectName;
//   project?: AppProject;
//   groups = this.data.groups;
//
//   isGenerateUrlLoading = false;
//   isAuthorizeLoading = false;
//   isUpdateLoading = false;
//   isDeleteLoading = false;
//
//   messageForUserLink?: string;
//   messageForUserExpirationDate?: Date;
//
//   constructor(
//     router: Router,
//     dialogRef: MatDialogRef<SubjectAuthorizationDialogComponent>,
//     @Inject(MAT_DIALOG_DATA)
//     public override data: {
//       mode: string;
//       entity: AppSubject;
//       projects: AppProject[];
//       projectName: string;
//       groups: AppGroup[];
//     },
//     store: Store,
//     dateAdapter: DateAdapter<any>,
//     private userService: AuthorizationService
//   ) {
//     super(router, dialogRef, data, store, dateAdapter);
//   }
//
//   override ngOnInit() {
//     this.project = this.projects.find(
//       (p) => p.projectName === this.projectName
//     );
//     super.ngOnInit();
//   }
//
//   override ngOnDestroy() {
//     super.ngOnDestroy();
//   }
//
//   override save(): void {
//     console.log(this.entity);
//     console.log(this.form?.value);
//
//     this.error = false;
//     this.isLoading = true;
//     this.actionTriggered.emit({
//       action: this.mode,
//       entity: { ...this.entity, ...this.form?.value, project: this.project },
//     });
//   }
//
//   authorize(): void {
//     this.error = false;
//     const persistent = false;
//     this.isGenerateUrlLoading = persistent;
//     this.isAuthorizeLoading = !persistent;
//     if (this.entity.id) {
//       this.updateAndRegisterUser(persistent);
//     } else {
//       this.createAndRegisterUser(persistent);
//     }
//   }
//
//   generateLink(): void {
//     this.error = false;
//     const persistent = true;
//     this.isGenerateUrlLoading = persistent;
//     this.isAuthorizeLoading = !persistent;
//     if (this.entity.id) {
//       this.updateAndRegisterUser(persistent);
//     } else {
//       this.createAndRegisterUser(persistent);
//     }
//   }
//
//   update(): void {
//     this.isUpdateLoading = true;
//     const updatedUser = {
//       ...this.entity,
//       startDate: this.form.controls.startDate.value,
//       endDate: this.form.controls.endDate.value,
//     };
//     this.userService.updateUser(updatedUser).subscribe({
//       next: () => {
//         this.dialogRef.close();
//         this.isUpdateLoading = false;
//       },
//       error: (error) => {
//         this.error = true; //this.handleError(error);
//         this.isUpdateLoading = false;
//       },
//     });
//   }
//
//   override delete(): void {
//     this.error = false;
//     this.isDeleteLoading = true;
//     if (this.entity.id) {
//       this.userService.deleteUser(+this.entity.id).subscribe({
//         next: () => {
//           this.dialogRef.close();
//           this.isDeleteLoading = false;
//         },
//         error: (error) => {
//           this.isDeleteLoading = false;
//           //this.handleError(error);
//         },
//       });
//     }
//   }
//
//   // close(mode: UserDialogMode): void {
//   //   if (mode !== UserDialogMode.ADD) {
//   //     this.dialogRef.close();
//   //   } else {
//   //     if (this.messageForUserLink) {
//   //       this.dialogRef.close(UserDialogCommand.UPDATED);
//   //     } else {
//   //       this.dialogRef.close();
//   //     }
//   //   }
//   // }
//
//   private createAndRegisterUser(persistent: boolean): void {
//     const user = {
//       projectId: this.entity.project?.projectName,
//       userId: this.entity.userId,
//       startDate: this.form.controls.startDate.value,
//       endDate: this.form.controls.endDate.value,
//       sourceType: this.entity.sourceType,
//     };
//     this.userService.createUser(user).subscribe({
//       next: (resp) => {
//         this.registerUser(resp.id, persistent);
//       },
//       error: (error) => {
//         this.error = true; //this.handleError(error);
//         this.isGenerateUrlLoading = false;
//         this.isAuthorizeLoading = false;
//       },
//     });
//   }
//
//   private updateAndRegisterUser(persistent: boolean) {
//     const updatedUser = {
//       ...this.entity,
//       startDate: this.form.controls.startDate.value,
//       endDate: this.form.controls.endDate.value,
//     };
//     this.userService.updateUser(updatedUser).subscribe({
//       next: () => {
//         this.registerUser(+this.entity.id, persistent);
//       },
//       error: (error) => {
//         this.error = true; //this.handleError(error);
//         this.isGenerateUrlLoading = false;
//         this.isAuthorizeLoading = false;
//       },
//     });
//   }
//
//   private registerUser(userId: number, persistent: boolean): void {
//     this.userService.registerUser({ userId, persistent }).subscribe({
//       next: (resp) => {
//         if (resp.authEndpointUrl) {
//           this.userService.storeUserAuthParams(resp.authEndpointUrl);
//           window.location.href = resp.authEndpointUrl;
//         } else if (resp.secret) {
//           const baseUrl = this.getBaseUrl();
//           this.messageForUserLink = `${baseUrl}/users:auth?token=${resp.token}&secret=${resp.secret}`;
//           this.messageForUserExpirationDate = new Date(resp.expiresAt);
//           this.isGenerateUrlLoading = false;
//         }
//       },
//       error: (error) => {
//         this.error = true; //this.handleError(error);
//         this.isGenerateUrlLoading = false;
//         this.isAuthorizeLoading = false;
//       },
//     });
//   }
//
//   // private handleError(error: any): string {
//   //   if(error.error.error === 'invalid_token' && error.status === 401) {
//   //     this.dialogRef.close(UserDialogCommand.ERROR);
//   //   }
//   //   return error.error.error_description || error.message || error;
//   // }
//   //#endregion
//
//   //#region Locale
//   // private initLocale() {
//   //   const locale = this.session.locale;
//   //   this._adapter.setLocale(locale);
//   //   this.dateFormat = LANGUAGES.filter(lang => lang.locale === locale)[0].dateFormat; // getLocaleDateFormat( locale, FormatWidth.Short );
//   // }
//   //#endregion
//
//   private getBaseUrl(): string {
//     const currentAbsoluteUrl = window.location.href;
//     const currentRelativeUrl = this.router.url;
//     const index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
//     return currentAbsoluteUrl.substring(0, index);
//   }
// }
