import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DateAdapter, MatOption} from "@angular/material/core";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";

import { Validator } from "../../../../../shared/utils/validators";
import { BaseDialogComponent } from "../../../../components/base-dialog/base-dialog.component";
import { AppProject } from "../../models/project";
import { AppOrganization } from "../../../organization/models/organization";
import { AppSourceType } from "../../../source-type/models/source-type";
import { Store } from "@ngrx/store";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {ProjectDetailsComponent} from "../../components/project-details/project-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {
  MatSelectAutocompleteComponent
} from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {MatDynamicInputComponent} from "../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatFormField, MatHint, MatInput} from "@angular/material/input";
import {MatLabel, MatSelect} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {DetailsComponent} from "../../../../components/details/details.component";
import {FIELDS, PROPERTIES} from "../../config";
import {DetailType} from "../../../../enums/detail-type";
import {
  OrganizationDetailsComponent
} from "../../../organization/components/organization-details/organization-details.component";
import {ProjectStatus} from '../../../../../shared/models/radar-project.model';

@Component({
  selector: 'rb-project-dialog',
  templateUrl: './project-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    AsyncPipe,
    DialogBodyDescriptionComponent,
    ProjectDetailsComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslatePipe,
    MatError,
    NgIf,
    MatSelectAutocompleteComponent,
    MatSelect,
    MatOption,
    MatDynamicInputComponent,
    ErrorMessageComponent,
    DialogActionsComponent,
    MatInput,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput, MatHint, DetailsComponent, JsonPipe, OrganizationDetailsComponent
  ]
})
export class ProjectDialogComponent
  extends BaseDialogComponent<AppProject, ProjectDialogComponent>
  implements OnInit
{
  override name = ENTITY_NAME.project;
  // FormGroup<[key: string]: FormControl>

  override form = new FormGroup({});
  // override form = new FormGroup({
  //   id: new FormControl({ value: undefined, disabled: true }),
  //   projectName: new FormControl<string | null>(null, [Validator.requiredValidator, Validator.stringIdValidator]),
  //   humanReadableProjectName: new FormControl<string | null>(null, [Validator.normalTextValidator]),
  //   // description: new FormControl<string | null>(null, [Validator.requiredValidator, Validator.longTextValidator]),
  //   description: new FormControl<string | null>(null, []),
  //   // location: new FormControl<string | null>(null, [Validator.requiredValidator, Validator.normalTextValidator]),
  //   location: new FormControl<string | null>(null, []),
  //   organizationName: new FormControl<string | null>({value: null, disabled: true}),
  //   organization: new FormControl<AppOrganization | null>(null, [Validator.requiredValidator]),
  //   // , disabled: this.mode === DialogMode.ADD
  //   projectStatus: new FormControl<string | null>(null),
  //   startDate: new FormControl<string | null>(null),
  //   endDate: new FormControl<string | null>(null),
  //   sourceTypes: new FormControl<string | null>(null),
  //   attributes: new FormGroup({
  //     "Work-package": new FormControl<string | null>(null, [Validator.normalTextValidator]),
  //     "Phase": new FormControl<string | null>(null, [Validator.normalTextValidator]),
  //     "External-project-url": new FormControl<string | null>(null, [Validator.urlValidator]),
  //     "External-project-id": new FormControl<string | null>(null, [Validator.stringIdValidator]),
  //     "Privacy-policy-url": new FormControl<string | null>(null, [Validator.urlValidator],),
  //   }),
  //   // extraFields: new FormGroup({}),
  // });

  ProjectStatus = ProjectStatus;

  entities;//= this.data.entities;
  organizations;// = this.data.organizations;

  // organizationsOptions = this.data.organizations.sort((a, b) =>
  //   a.name.localeCompare(b.name)
  // );
  // organizationName = this.data.organizationName;

  sourceTypes;// = this.data.sourceTypes;

  // sourceTypesOptions = this.data.sourceTypes
  //   .map((sourceType) => ({
  //     ...sourceType,
  //     name: `${sourceType.producer}_${sourceType.model}_${sourceType.catalogVersion}`,
  //   }))
  //   .sort((a, b) => a.name.localeCompare(b.name));

  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date(2050, 0, 1);

  _fields?: any[];

  constructor(
    router: Router,
    dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    // public override data: {
    //   mode: string;
    //   entity: AppProject;
    //   entities: AppProject[];
    //   organizations: AppOrganization[];
    //   organizationName: string;
    //   sourceTypes: AppSourceType[];
    // },
    public override data: any,
    store: Store,
    dateAdapter: DateAdapter<any>,
  ) {
    super(router, dialogRef, data, store, dateAdapter);
    // this.subjectConfig$ = this.store?.select(config).pipe(
    //   map(config => config.entities[ENTITY_NAME.project].fields)
    // );
    this.entities = this.data.entities;
    this.organizations = this.data.organizations;
    this.sourceTypes = this.data.sourceTypes;
  }

  override ngOnInit() {
    this.config$?.subscribe(config => {
      console.log('Class: ProjectDialogComponent, Function: , Line 146 config' , config);
      const generatedFields = FIELDS.map((field: any) => {
        if (!field.nonEditable) {
          const c = config['fields']?.find((f: any) => f.name === field.name);
          if (c) {
            if (c.enabled) {
              return { ...field, ...c};
            } else {
              // not added
            }
          } else {
            return field;
          }
        } else {
          return field;
        }
      }).filter((field: any) => field !== undefined);
      const extraFields: any[] = config['extraFields']?.map((field: any) => {
        const clonedField = { ...field }; // Clone the object
        clonedField['extra'] = true; // Safely add the property
        return clonedField;
      }) ?? [];
      this._fields = [...generatedFields, ...extraFields];
      console.log('Class: ProjectDialogComponent, Function: , Line 134 ' , this._fields);

      this._fields.forEach((field: any) => {
        console.log('Class: SubjectDialogComponent, Function: 111, Line 147 field' , field);
        if (field.extra) {
          console.log('Class: SubjectDialogComponent, Function: 111, Line 149 ' , );
          this.form.addControl(field.name, new FormControl<string | null>({value: this.entity?.attributes?.[field.name]?.toString() ?? null, disabled: field.auto}));
        } else {
          if (field.name.startsWith('attributes.')) {
            console.log('Class: SubjectDialogComponent, Function: , Line 153 ' , );
            const _key = field.name.split('.')[1];
            console.log('Class: SubjectDialogComponent, Function: , Line 155 _key' , _key);
            this.form.addControl(field.name, new FormControl<string | null>({value: this.entity?.attributes?.[_key]?.toString() ?? null, disabled: field.auto}));
          } else {
            this.form.addControl(field.name, new FormControl<string | null>({value: this.entity?.[field.name]?.toString() ?? null, disabled: field.auto}));
          }
        }

      })
    })

    // this.form.controls.projectName?.addValidators(this.duplicateValidator);
    //   console.log('Class: ProjectDialogComponent, Function: ngOnInit, Line 92 this.entity' , this.entity);
    // if (this.entity) {
    //   this.form.controls.projectName?.disable();
    // }
    // const organization = this.organizations.find(o => o.name === this.data.organizationName);
    // if (organization) {
    //   this.form.controls.organization.patchValue(organization);
    // }
    //
    // this.config$?.subscribe(config => {
    //   config['extraFields']?.forEach((field: any) => {
    //     this.form.controls.attributes.addControl(field.name, new FormControl<string | null>(null)); // as AbstractControl);
    //   })
    // })
    super.ngOnInit();


    // this.form.addControl("midDate", new FormControl<string | null>(null, []));
  }

  // private duplicateValidator = (control: AbstractControl) => {
  //   return this.entities?.find(
  //     (entity) =>
  //       control.value === entity.projectName &&
  //       this.entity?.projectName !== entity.projectName
  //   )
  //     ? { duplicate: true }
  //     : null;
  // };
  // subjectConfig$?: Observable<Record<string, any>>;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DetailType = DetailType;

  override save(): void {
    this.error = false;
    this.isLoading = true;
    console.log('Class: SubjectDialogComponent, Function: save, Line 200 this.form.value' , this.form.value);
    const modifiedFormValue: any = {}; //{ ...this.form.value };

    Object.entries(this.form.value).forEach(([key, value]) => {
      const _f = this._fields?.find((f: any) => f.name === key);

      if (key.startsWith('attributes.')) {
        const _key = key.split('.')[1];
        modifiedFormValue['attributes'] = {...modifiedFormValue['attributes'], [_key]: value};
      } else if (_f.extra) {
        modifiedFormValue['attributes'] = {...modifiedFormValue['attributes'], [key]: value};
      } else {
        modifiedFormValue[key] = value;
      }
    })

    // const t: any = this.form.value;
    // this._fields?.forEach((field: any) => {
    //   if (field.name.startsWith('attributes.')) {
    //     const key = field.name.split('.')[1];
    //     modifiedFormValue['attributes'] = {...modifiedFormValue['attributes'], [key]: t[field.name]};
    //   } else if (field.extra) {
    //     modifiedFormValue['attributes'] = {...modifiedFormValue['attributes'], [field.name]: t[field.name]};
    //   } else {
    //     modifiedFormValue[field.name] = t[field.name];
    //   }
    // })
    // console.log('Class: SubjectDialogComponent, Function: save, Line 213 modifiedFormValue' , modifiedFormValue);
    this.actionTriggered.emit({
      action: this.mode,
      entity: { ...this.entity, ...modifiedFormValue },
    });
  }
}
