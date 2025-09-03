import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {DateAdapter, MatOption} from '@angular/material/core';

// import { LocaleService } from '../../../../../core/locale/services/locale.service';
import { BaseDialogComponent } from '../../../../base/base-dialog.component';
import { AppSubject } from "../../models/subject";
import { AppGroup } from "../../../group/models/group";
import {Store} from "@ngrx/store";
import {ENTITY_NAME} from "../../../../enums/entities";
import {instanceConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {FIELDS, REMOTE_FIELDS} from "../../config";
import {TranslatePipe} from "@ngx-translate/core";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatLabel, MatSelect} from "@angular/material/select";
import {MatDynamicInputComponent} from "../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {MatError} from "@angular/material/form-field";
import {DynamicInputComponent} from "../../../../../shared/components/dynamic-input/dynamic-input.component";
import {SubjectStatus} from '../../../../../shared/models/radar-subject.model';

@Component({
  selector: 'rb-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  imports: [
    MatFormField,
    TranslatePipe,
    DialogActionsComponent,
    ErrorMessageComponent,
    NgIf,
    AsyncPipe,
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    SubjectDetailsComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    NgForOf,
    MatDynamicInputComponent,
    MatLabel,
    MatError,
    DynamicInputComponent
  ]
})
export class SubjectDialogComponent
  extends BaseDialogComponent<AppSubject, SubjectDialogComponent>
  implements OnInit, OnDestroy
{
  override name = ENTITY_NAME.subject;

  override form = new FormGroup({});
  // override form = new FormGroup({
  //   id: new FormControl({ value: undefined, disabled: true }),
  //   login: new FormControl({ value: undefined, disabled: true }),
  //   personName: new FormControl(""),
  //   dateOfBirth: new FormControl(""),
  //   externalId: new FormControl(""),
  //   externalLink: new FormControl(""),
  //   group: new FormControl(""),
  //   // [this.FORM_PARAMS.project]: [{ value: undefined, disabled: true }],
  //   attributes: new FormGroup({
  //     humanReadableIdentifier: new FormControl(""),
  //     participant_group: new FormControl(""),
  //   }),
  // });

  SubjectStatus = SubjectStatus;

  // projectName = this.data.projectName;
  // groups = this.data.groups.map(g => ({id: g.name, name: g.name}));

  _fields?: any[];


  constructor(
    router: Router,
    dialogRef: MatDialogRef<SubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    // public override data: {
    //   mode: string;
    //   entity: AppSubject;
    //   // projectName: string;
    //   groups: AppGroup[];
    // },
    public override data: any,
    store: Store,
    // currentLocaleService: LocaleService,
    dateAdapter: DateAdapter<any>
  ) {
    super(router, dialogRef, data, store, dateAdapter);
  }

  // override initForm(): void {
  //   this.form.patchValue({ ...this.entity }); //, project: this.projectName });
  // }

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

      // Object.entries(FIELDS).forEach(([key, value]) => {
      //   // console.log('Class: SubjectDialogComponent, Function: , Line 116 key, value' , key, value);
      //   if (!value.nonEditable) {
      //     if (config['fields'][key]) {
      //       if (config['fields'][key].enabled) {
      //         console.log('Class: SubjectDialogComponent, Function: , Line 121 config' , config['fields'][key]);
      //         generatedFields[key] = { ...value, ...config['fields'][key]};
      //       } else {
      //         // not added
      //       }
      //     } else {
      //       generatedFields[key] = value;
      //     }
      //   } else {
      //     generatedFields[key] = value;
      //   }
      // })

      // add extra fields
      // Object.entries(config['extraFields']).forEach(([key, value]) => {
      //   generatedFields[key] = value
      // })
    // })
    // console.log('Class: SubjectDialogComponent, Function: ngOnInit, Line 130 ge' , generatedFields);
    // create form

    // this.config$?.subscribe(config => {
    //   config['extraFields']?.forEach((field: any) => {
    //     this.form.controls.attributes.addControl(field.name, new FormControl<string | null>(null)); // as AbstractControl);
    //   })
    // })
    //
    // const mergedFields = Object.keys(REMOTE_FIELDS).reduce((acc, key) => {
    //   const field = FIELDS[key];
    //   const remote = REMOTE_FIELDS[key];
    //
    //   if (field !== undefined && field.editable === false) {
    //     acc[key] = true;
    //   } else {
    //     acc[key] = remote !== false;
    //   }
    //   return acc;
    // }, {} as Record<string, boolean>);
    //
    // console.log('Class: SubjectDialogComponent, Function: ngOnInit, Line 92 mergedFields' , mergedFields);

    super.ngOnInit();


    // this.form.addControl("midDate", new FormControl<string | null>(null, []));
  }

  // override initForm() {
  //   const entity = this.entity;
  //   this.form?.patchValue(entity);
  //   // throw new Error('BaseDialogComponent "initForm" method not implemented');
  // }

  override save(): void {
    this.error.set(false);// = false;
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
