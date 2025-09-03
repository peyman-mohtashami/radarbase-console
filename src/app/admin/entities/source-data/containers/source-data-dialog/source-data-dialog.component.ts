import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule,
  // Validators
} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

// import {Validator} from '../../../../../shared/utils/validators';
import {BaseDialogComponent} from '../../../../base/base-dialog.component';
// import {
//   MatSelectAutocompleteComponent,
//   RadarOption
// } from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppSourceData} from "../../models/source-data";
// import {AppSourceType} from "../../../source-type/models/source-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatFormField, MatInput} from "@angular/material/input";
import {
  AsyncPipe, JsonPipe,
  // JsonPipe
} from "@angular/common";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
// import {MatLabel, MatSelect} from "@angular/material/select";
import {DateAdapter,
  // MatOption
} from "@angular/material/core";
// import {MatError} from "@angular/material/form-field";
// import {ProcessingState} from '../../../../../shared/models/radar-source-data.model';
import {MatDynamicInputComponent} from '../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {FIELDS} from '../../config';
import {Store} from '@ngrx/store';

@Component({
  selector: 'rb-source-data-dialog',
  templateUrl: './source-data-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    // MatFormField,
    // TranslatePipe,
    // MatLabel,
    // MatInput,
    // MatSelectAutocompleteComponent,
    // MatSelect,
    // MatOption,
    ErrorMessageComponent,
    DialogActionsComponent,
    // MatError,
    AsyncPipe, MatDynamicInputComponent, JsonPipe,
    // JsonPipe
  ]
})
export class SourceDataDialogComponent extends BaseDialogComponent<
  AppSourceData,
  SourceDataDialogComponent
> {
  override name = ENTITY_NAME.sourceData;

  override form = new FormGroup({});

  // override form = new FormGroup({
  //   id: new FormControl({ value: undefined, disabled: true }),
  //   sourceDataType: new FormControl("",[Validator.requiredValidator, Validator.normalTextValidator]),
  //   sourceType: new FormControl("", [Validator.requiredValidator]),
  //   sourceDataName: new FormControl("",[Validator.requiredValidator]),
  //   processingState: new FormControl(""),
  //   topic: new FormControl(""),
  //   keySchema: new FormControl(""),
  //   valueSchema: new FormControl(""),
  //   frequency: new FormControl(""),
  //   unit: new FormControl(""),
  // });

  // ProcessingState = ProcessingState;

  // sourceTypesOptions: RadarOption[];

  _fields?: any[];

  constructor(
    router: Router,
    dialogRef: MatDialogRef<SourceDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    // public override data: any,
    public override data: {
      mode: string;
      entity: AppSourceData;
      extra: any;
      // sourceTypes: AppSourceType[];
    },
    store: Store,
    dateAdapter: DateAdapter<any>
  ) {
    super(router, dialogRef, data, store, dateAdapter);
    // this.sourceTypesOptions = (this.data.sourceTypes as AppSourceType[]).sort((a, b) =>
    //   a.name.localeCompare(b.name)
    // );
  }

  override ngOnInit() {
    console.log('Class: SourceDataDialogComponent, Function: ngOnInit, Line 99 this.data' , this.data);
    this.config$?.subscribe(config => {
      console.log('Class: ProjectDialogComponent, Function: , Line 146 config', config);
      const generatedFields = FIELDS.map((field: any) => {
        if (!field.nonEditable) {
          const c = config?.['fields']?.find((f: any) => f.name === field.name);
          if (c) {
            if (c.enabled) {
              return {...field, ...c};
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
      const extraFields: any[] = config?.['extraFields']?.map((field: any) => {
        const clonedField = {...field}; // Clone the object
        clonedField['extra'] = true; // Safely add the property
        return clonedField;
      }) ?? [];
      this._fields = [...generatedFields, ...extraFields];
      console.log('Class: ProjectDialogComponent, Function: , Line 134 ', this._fields);

      this._fields.forEach((field: any) => {
        console.log('Class: SubjectDialogComponent, Function: 111, Line 147 field', field);
        if (field.extra) {
          console.log('Class: SubjectDialogComponent, Function: 111, Line 149 ',);
          const attr = this.entity['attribute'] as any;
          if (attr) {
            // this.form.addControl(field.name, new FormControl<string | null>({value: this.entity?.['attributes']?.[field.name]?.toString() ?? null, disabled: field.auto}));
            this.form.addControl(field.name, new FormControl<string | null>({
              value: attr?.[field.name]?.toString() ?? null,
              disabled: field.auto
            }));
          }
        } else {
          if (field.name.startsWith('attributes.')) {
            console.log('Class: SubjectDialogComponent, Function: , Line 153 ',);
            const _key = field.name.split('.')[1];
            console.log('Class: SubjectDialogComponent, Function: , Line 155 _key', _key);
            const attr = this.entity['attributes'] as any;
            if (attr) {
              // this.form.addControl(field.name, new FormControl<string | null>({
              //   value: this.entity?.attributes?.[_key]?.toString() ?? null,
              //   disabled: field.auto
              // }));
              this.form.addControl(field.name, new FormControl<string | null>({
                value: attr?.[_key]?.toString() ?? null,
                disabled: field.auto
              }));
            }
          } else {
            this.form.addControl(field.name, new FormControl<string | null>(
              {
                value: this.entity?.[field.name]?.toString() ?? null,
                disabled: field.auto,
              },
              // [Validators.required]
            ));
          }
        }

      })
    })
    super.ngOnInit();
  }

}
