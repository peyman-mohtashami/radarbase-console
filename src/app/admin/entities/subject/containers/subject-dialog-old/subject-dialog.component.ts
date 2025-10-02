// import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
// import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
// import {DateAdapter, MatOption} from '@angular/material/core';
//
// import { SubjectStatus } from '@rb/models';
// // import { LocaleService } from '../../../../../core/locale/services/locale.service';
// import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
// import { AppSubject } from "../../models/subject";
// import { AppGroup } from "../../../group/models/group";
// import {Store} from "@ngrx/store";
// import {ENTITY_NAME} from "../../../../enums/entities";
// import {instanceConfig} from "../../../../../core/config/store/config.selectors";
// import {map} from "rxjs/operators";
// import {Observable} from "rxjs";
// import {FIELDS, REMOTE_FIELDS} from "../../config";
// import {TranslatePipe} from "@ngx-translate/core";
// import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
// import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
// import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
// import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
// import {
//   DialogBodyDescriptionComponent
// } from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
// import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
// import {MatFormField, MatInput} from "@angular/material/input";
// import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
// import {MatLabel, MatSelect} from "@angular/material/select";
// import {MatDynamicInputComponent} from "../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
// import {MatError} from "@angular/material/form-field";
//
// @Component({
//   selector: 'rb-subject-dialog',
//   templateUrl: './subject-dialog.component.html',
//   imports: [
//     MatFormField,
//     TranslatePipe,
//     DialogActionsComponent,
//     ErrorMessageComponent,
//     NgIf,
//     AsyncPipe,
//     DialogTitleComponent,
//     MatDialogContent,
//     DialogBodyDescriptionComponent,
//     SubjectDetailsComponent,
//     ReactiveFormsModule,
//     MatFormField,
//     MatInput,
//     MatDatepickerInput,
//     MatDatepickerToggle,
//     MatDatepicker,
//     MatSelect,
//     MatOption,
//     NgForOf,
//     MatDynamicInputComponent,
//     MatLabel,
//     MatError
//   ]
// })
// export class SubjectDialogComponent
//   extends BaseDialogComponent<AppSubject, SubjectDialogComponent>
//   implements OnInit, OnDestroy
// {
//   override name = ENTITY_NAME.subject;
//
//   override form = new FormGroup({
//     id: new FormControl({ value: undefined, disabled: true }),
//     login: new FormControl({ value: undefined, disabled: true }),
//     personName: new FormControl(""),
//     dateOfBirth: new FormControl(""),
//     externalId: new FormControl(""),
//     externalLink: new FormControl(""),
//     group: new FormControl(""),
//     // [this.FORM_PARAMS.project]: [{ value: undefined, disabled: true }],
//     attributes: new FormGroup({
//       humanReadableIdentifier: new FormControl(""),
//       participant_group: new FormControl(""),
//     }),
//   });
//
//   SubjectStatus = SubjectStatus;
//
//   // projectName = this.data.projectName;
//   groups = this.data.groups;
//
//
//   constructor(
//     router: Router,
//     dialogRef: MatDialogRef<SubjectDialogComponent>,
//     @Inject(MAT_DIALOG_DATA)
//     public override data: {
//       mode: string;
//       entity: AppSubject;
//       // projectName: string;
//       groups: AppGroup[];
//     },
//     store: Store,
//     // currentLocaleService: LocaleService,
//     dateAdapter: DateAdapter<any>
//   ) {
//     super(router, dialogRef, data, store, dateAdapter);
//   }
//
//   // override initForm(): void {
//   //   this.form.patchValue({ ...this.entity }); //, project: this.projectName });
//   // }
//
//   override ngOnInit() {
//     this.config$?.subscribe(config => {
//       config['extraFields']?.forEach((field: any) => {
//         this.form.controls.attributes.addControl(field.name, new FormControl<string | null>(null)); // as AbstractControl);
//       })
//     })
//
//     const mergedFields = Object.keys(REMOTE_FIELDS).reduce((acc, key) => {
//       const field = FIELDS[key];
//       const remote = REMOTE_FIELDS[key];
//
//       if (field !== undefined && field.editable === false) {
//         acc[key] = true;
//       } else {
//         acc[key] = remote !== false;
//       }
//       return acc;
//     }, {} as Record<string, boolean>);
//
//     console.log('Class: SubjectDialogComponent, Function: ngOnInit, Line 92 mergedFields' , mergedFields);
//
//     super.ngOnInit();
//
//
//     // this.form.addControl("midDate", new FormControl<string | null>(null, []));
//   }
// }
