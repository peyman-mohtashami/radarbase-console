import {AfterViewInit, Component, effect, EventEmitter, Inject, OnInit, Output, signal} from '@angular/core';
// import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

// import { Validator } from '../../../../../shared/utils/validators';
// import { BaseDialogComponent } from '../../../../base/base-dialog.component';
import { AppSourceType } from "../../models/source-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {Store} from "@ngrx/store";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatError, MatFormField, MatHint, MatInput} from "@angular/material/input";
import {AsyncPipe, JsonPipe} from "@angular/common";
// import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
// import {MatLabel, MatSelect} from "@angular/material/select";
// import {MatOption} from "@angular/material/core";
// import {FIELDS} from '../../../source-data/config';
import {MatDynamicInputComponent} from '../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
// import {FIELDS} from '../../config';
import {Validator, ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
// import {AppSourceData} from '../../../source-data/models/source-data';
import {Observable} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, map} from 'rxjs/operators';
import {DialogMode} from '../../../../enums/dialog';
import {instanceConfig} from '../../../../../core/config/store/config.selectors';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'rb-source-type-dialog',
  templateUrl: './source-type-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    // MatFormField,
    // MatLabel,
    // TranslatePipe,
    // MatInput,
    // MatError,
    // NgIf,
    // MatSelect,
    // MatOption,
    // MatSlideToggle,
    ErrorMessageComponent,
    DialogActionsComponent,
    AsyncPipe,
    // MatHint,
    MatDynamicInputComponent,
    JsonPipe,
    TranslatePipe,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatHint
  ]
})
export class SourceTypeDialogComponent implements OnInit, AfterViewInit {
//   extends BaseDialogComponent<AppSourceType, SourceTypeDialogComponent>
//   implements OnInit
// {
//   protected readonly ProcessingState = ProcessingState;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  // override name = ENTITY_NAME.sourceType;

  // override form = new FormGroup({});

  form = new FormGroup({
    id: new FormControl<string | number | undefined>({ value: undefined, disabled: true }, {nonNullable: true}),
    producer: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    model: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    catalogVersion: new FormControl<string>("", {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    sourceTypeScope: new FormControl<any>("", {nonNullable: true, validators: [Validator.requiredValidator]}),
    canRegisterDynamically: new FormControl<boolean>(false, {nonNullable: true}),
    name: new FormControl<string>("", {nonNullable: true}),
    description: new FormControl<string>("", {nonNullable: true, validators: [Validator.longTextValidator]}),
    assessmentType: new FormControl<string>("", {nonNullable: true}),
    appProvider: new FormControl<string>("", {nonNullable: true}),
  });
  // _fields?: any[];

  // entities; // = this.data.entities;
  loading = signal(false);
  error = signal(false);

  @Output()
  actionTriggered = new EventEmitter<{ action: DialogMode, entity?: AppSourceType }>();

  floatLabel = false;

  config$?: Observable<Record<string, any>>;

  readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)), // Optional debounce for optimization
    {initialValue: this.form.getRawValue()} // Provide the initial value from the form
  );

  constructor(
    // router: Router,
    private dialogRef: MatDialogRef<SourceTypeDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: DialogMode;
      entity: AppSourceType;
      // extra: any;
      // entities: AppSourceType[];
    }
  ) {
    this.config$ = this.store?.select(instanceConfig).pipe(
      map(config => {
        return config.entities[ENTITY_NAME.sourceType]
      })
    );

    effect(() => {
      const formValue = this.formValueChanges();
      if (formValue) {
        this.error.set(false);
      }
    });
    // super(router, dialogRef, data, store);
    // this.entities = this.data.entities;
  }

  ngOnInit() {
    this.form?.patchValue(this.data.entity);
  }

  onAction($event: string) {
    switch ($event) {
      case 'close':
        this.close();
        break;
      case 'delete':
        this.delete();
        break;
      case 'save':
        this.save();
        break;
    }
  }

  save(): void {
    this.error.set(false);
    this.loading.set(true);
    this.actionTriggered.emit({
      action: this.data.mode,
      entity: {...this.data.entity, ...this.form?.value},
    });
  }

  delete(): void {
    this.error.set(false);
    this.loading.set(true);
    if (this.data.entity) {
      this.actionTriggered.emit({action: this.data.mode, entity: this.data.entity});
    }
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(true);
  }

  ngAfterViewInit() {
    const container = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      container?.classList.add('dialog-enter-active');
    });
  }

  close() {
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.actionTriggered.emit({action: DialogMode.CLOSE});
      //   this.actionTriggered.emit({ action: 'close' });
      this.dialogRef.close();
    }, 300);
  }
  //
  // override ngOnInit() {
  //   this.config$?.subscribe(config => {
  //     const generatedFields = FIELDS.map((field: any) => {
  //       if (!field.nonEditable) {
  //         const c = config?.['fields']?.find((f: any) => f.name === field.name);
  //         if (c) {
  //           if (c.enabled) {
  //             return {...field, ...c};
  //           } else {
  //             // not added
  //           }
  //         } else {
  //           return field;
  //         }
  //       } else {
  //         return field;
  //       }
  //     }).filter((field: any) => field !== undefined);
  //     const extraFields: any[] = config?.['extraFields']?.map((field: any) => {
  //       const clonedField = {...field}; // Clone the object
  //       clonedField['extra'] = true; // Safely add the property
  //       return clonedField;
  //     }) ?? [];
  //     this._fields = [...generatedFields, ...extraFields];
  //
  //     this._fields.forEach((field: any) => {
  //       if (field.extra) {
  //         const attr = this.entity['attribute'] as any;
  //         if (attr) {
  //           // this.form.addControl(field.name, new FormControl<string | null>({value: this.entity?.['attributes']?.[field.name]?.toString() ?? null, disabled: field.auto}));
  //           this.form.addControl(field.name, new FormControl<string | null>({
  //             value: attr?.[field.name]?.toString() ?? null,
  //             disabled: field.auto
  //           }));
  //         }
  //       } else {
  //         if (field.name.startsWith('attributes.')) {
  //           const _key = field.name.split('.')[1];
  //           const attr = this.entity['attributes'] as any;
  //           if (attr) {
  //             // this.form.addControl(field.name, new FormControl<string | null>({
  //             //   value: this.entity?.attributes?.[_key]?.toString() ?? null,
  //             //   disabled: field.auto
  //             // }));
  //             this.form.addControl(field.name, new FormControl<string | null>({
  //               value: attr?.[_key]?.toString() ?? null,
  //               disabled: field.auto
  //             }));
  //           }
  //         } else {
  //           this.form.addControl(field.name, new FormControl<string | null>(
  //             {
  //               value: this.entity?.[field.name]?.toString() ?? null,
  //               disabled: field.auto,
  //             },
  //             // [Validators.required]
  //           ));
  //         }
  //       }
  //
  //     })
  //   })
  //   super.ngOnInit();
  // }
  //
  // //
  // // //! sourcetype with exact duplicate producer & model & version
  // // private duplicateProducerValidator = (control: AbstractControl) => {
  // //   if (
  // //     this.entities.find(
  // //       (entity) =>
  // //         entity.producer === control.value &&
  // //         entity.model === this.form?.value.model &&
  // //         entity.catalogVersion === this.form?.value.catalogVersion &&
  // //         this.entity?.producer !== entity.producer &&
  // //         this.entity?.model !== entity.model &&
  // //         this.entity?.catalogVersion !== entity.catalogVersion
  // //     )
  // //   ) {
  // //     return { duplicate: true };
  // //   }
  // //   return null;
  // // };
  // //
  // // private duplicateModelValidator = (control: AbstractControl) => {
  // //   if (
  // //     this.entities.find(
  // //       (entity) =>
  // //         entity.producer === this.form?.value.producer &&
  // //         entity.model === control.value &&
  // //         entity.catalogVersion === this.form?.value.catalogVersion &&
  // //         this.entity?.producer !== entity.producer &&
  // //         this.entity?.model !== entity.model &&
  // //         this.entity?.catalogVersion !== entity.catalogVersion
  // //     )
  // //   ) {
  // //     return { duplicate: true };
  // //   }
  // //   return null;
  // // };
  // //
  // // private duplicateCatalogVersionValidator = (control: AbstractControl) => {
  // //   if (
  // //     this.entities.find(
  // //       (entity) =>
  // //         entity.producer === this.form?.value.producer &&
  // //         entity.model === this.form?.value.model &&
  // //         entity.catalogVersion === control.value &&
  // //         this.entity?.producer !== entity.producer &&
  // //         this.entity?.model !== entity.model &&
  // //         this.entity?.catalogVersion !== entity.catalogVersion
  // //     )
  // //   ) {
  // //     return { duplicate: true };
  // //   }
  // //   return null;
  // // };
}
