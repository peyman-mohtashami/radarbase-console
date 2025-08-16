// import { Component, Inject, OnInit } from "@angular/core";
// import { Router } from "@angular/router";
// import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
// import {DateAdapter, MatOption} from "@angular/material/core";
// import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
//
// import { ProjectStatus } from "@rb/models";
// import { Validator } from "../../../../../shared/utils/validators";
// import { BaseDialogComponent } from "../../../../components/base-dialog/base-dialog.component";
// import { AppProject } from "../../models/project";
// import { AppOrganization } from "../../../organization/models/organization";
// import { AppSourceType } from "../../../source-type/models/source-type";
// import { Store } from "@ngrx/store";
// import {ENTITY_NAME} from "../../../../enums/entities";
// import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
// import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
// import {
//   DialogBodyDescriptionComponent
// } from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
// import {ProjectDetailsComponent} from "../../components/project-details/project-details.component";
// import {TranslatePipe} from "@ngx-translate/core";
// import {
//   MatSelectAutocompleteComponent
// } from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
// import {MatDynamicInputComponent} from "../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
// import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
// import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
// import {MatFormField, MatHint, MatInput} from "@angular/material/input";
// import {MatLabel, MatSelect} from "@angular/material/select";
// import {MatError} from "@angular/material/form-field";
// import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
// import {DetailsComponent} from "../../../../components/details/details.component";
// import {PROPERTIES} from "../../config";
// import {DetailType} from "../../../../enums/detail-type";
// import {
//   OrganizationDetailsComponent
// } from "../../../organization/components/organization-details/organization-details.component";
//
// @Component({
//   selector: 'rb-project-dialog',
//   templateUrl: './project-dialog.component.html',
//   imports: [
//     DialogTitleComponent,
//     MatDialogContent,
//     AsyncPipe,
//     DialogBodyDescriptionComponent,
//     ProjectDetailsComponent,
//     ReactiveFormsModule,
//     MatFormField,
//     MatLabel,
//     TranslatePipe,
//     MatError,
//     NgIf,
//     MatSelectAutocompleteComponent,
//     MatSelect,
//     MatOption,
//     MatDynamicInputComponent,
//     ErrorMessageComponent,
//     DialogActionsComponent,
//     MatInput,
//     MatDatepicker,
//     MatDatepickerToggle,
//     MatDatepickerInput, MatHint, DetailsComponent, JsonPipe, OrganizationDetailsComponent
//   ]
// })
// export class ProjectDialogComponent
//   extends BaseDialogComponent<AppProject, ProjectDialogComponent>
//   implements OnInit
// {
//   override name = ENTITY_NAME.project;
//   // FormGroup<[key: string]: FormControl>
//
//   override form = new FormGroup({
//     id: new FormControl({ value: undefined, disabled: true }),
//     projectName: new FormControl<string | null>(null, [Validator.requiredValidator, Validator.stringIdValidator]),
//     humanReadableProjectName: new FormControl<string | null>(null, [Validator.normalTextValidator]),
//     // description: new FormControl<string | null>(null, [Validator.requiredValidator, Validator.longTextValidator]),
//     description: new FormControl<string | null>(null, []),
//     // location: new FormControl<string | null>(null, [Validator.requiredValidator, Validator.normalTextValidator]),
//     location: new FormControl<string | null>(null, []),
//     organizationName: new FormControl<string | null>({value: null, disabled: true}),
//     organization: new FormControl<AppOrganization | null>(null, [Validator.requiredValidator]),
//     // , disabled: this.mode === DialogMode.ADD
//     projectStatus: new FormControl<string | null>(null),
//     startDate: new FormControl<string | null>(null),
//     endDate: new FormControl<string | null>(null),
//     sourceTypes: new FormControl<string | null>(null),
//     attributes: new FormGroup({
//       "Work-package": new FormControl<string | null>(null, [Validator.normalTextValidator]),
//       "Phase": new FormControl<string | null>(null, [Validator.normalTextValidator]),
//       "External-project-url": new FormControl<string | null>(null, [Validator.urlValidator]),
//       "External-project-id": new FormControl<string | null>(null, [Validator.stringIdValidator]),
//       "Privacy-policy-url": new FormControl<string | null>(null, [Validator.urlValidator],),
//     }),
//     // extraFields: new FormGroup({}),
//   });
//
//   ProjectStatus = ProjectStatus;
//
//   entities = this.data.entities;
//   organizations = this.data.organizations;
//
//   organizationsOptions = this.data.organizations.sort((a, b) =>
//     a.name.localeCompare(b.name)
//   );
//   // organizationName = this.data.organizationName;
//
//   sourceTypes = this.data.sourceTypes;
//
//   sourceTypesOptions = this.data.sourceTypes
//     .map((sourceType) => ({
//       ...sourceType,
//       name: `${sourceType.producer}_${sourceType.model}_${sourceType.catalogVersion}`,
//     }))
//     .sort((a, b) => a.name.localeCompare(b.name));
//
//   minDate: Date = new Date(2000, 0, 1);
//   maxDate: Date = new Date(2050, 0, 1);
//
//   constructor(
//     router: Router,
//     dialogRef: MatDialogRef<ProjectDialogComponent>,
//     @Inject(MAT_DIALOG_DATA)
//     public override data: {
//       mode: string;
//       entity: AppProject;
//       entities: AppProject[];
//       organizations: AppOrganization[];
//       organizationName: string;
//       sourceTypes: AppSourceType[];
//     },
//     store: Store,
//     dateAdapter: DateAdapter<any>,
//   ) {
//     super(router, dialogRef, data, store, dateAdapter);
//     // this.subjectConfig$ = this.store?.select(config).pipe(
//     //   map(config => config.entities[ENTITY_NAME.project].fields)
//     // );
//   }
//
//   override ngOnInit() {
//     this.form.controls.projectName?.addValidators(this.duplicateValidator);
//       console.log('Class: ProjectDialogComponent, Function: ngOnInit, Line 92 this.entity' , this.entity);
//     if (this.entity) {
//       this.form.controls.projectName?.disable();
//     }
//     const organization = this.organizations.find(o => o.name === this.data.organizationName);
//     if (organization) {
//       this.form.controls.organization.patchValue(organization);
//     }
//
//     this.config$?.subscribe(config => {
//       config['extraFields']?.forEach((field: any) => {
//         this.form.controls.attributes.addControl(field.name, new FormControl<string | null>(null)); // as AbstractControl);
//       })
//     })
//     super.ngOnInit();
//
//
//     // this.form.addControl("midDate", new FormControl<string | null>(null, []));
//   }
//
//   private duplicateValidator = (control: AbstractControl) => {
//     return this.entities?.find(
//       (entity) =>
//         control.value === entity.projectName &&
//         this.entity?.projectName !== entity.projectName
//     )
//       ? { duplicate: true }
//       : null;
//   };
//   // subjectConfig$?: Observable<Record<string, any>>;
//   protected readonly ENTITY_NAME = ENTITY_NAME;
//   protected readonly PROPERTIES = PROPERTIES;
//   protected readonly DetailType = DetailType;
// }
