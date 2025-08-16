import {
  Component,
  EventEmitter, inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  Validator,
  ValidatorError,
  ValidatorHint,
} from '../../../../../shared/utils/validators';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray, FormBuilder, ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
// import { LocaleService } from '../../../../../core/locale/services/locale.service';
import {DateAdapter, MatOption} from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LANGUAGES } from './languages';
import { DialogMode } from '../../../../enums/dialog';
import { ProtocolService } from '../../services/protocol.service';
import { AppProtocol } from "../../models/protocol";
import {Store} from "@ngrx/store";
import {locale} from "../../../../../core/locale/store/locale.selectors";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatSelect} from "@angular/material/select";
import {MatDivider} from "@angular/material/divider";
import {MatCard} from "@angular/material/card";
import {MatDialogContent} from "@angular/material/dialog";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {ProtocolDetailsComponent} from "../../components/protocol-details/protocol-details.component";

@Component({
  selector: 'rb-protocol-edit-page',
  templateUrl: './protocol-edit-page.component.html',
  imports: [
    DialogTitleComponent,
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslatePipe,
    MatInput,
    MatLabel,
    MatHint,
    MatError,
    MatSelect,
    MatOption,
    NgForOf,
    MatSlideToggle,
    ErrorMessageComponent,
    DialogActionsComponent,
    MatDivider,
    MatCard,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ProtocolDetailsComponent
  ]
})
export class ProtocolEditPageComponent implements OnInit, OnDestroy {
  LANGUAGES = LANGUAGES;

  questionTypes = [
    { name: 'radio', label: 'Radio' },
    { name: 'checkbox', label: 'Checkbox' },
    { name: 'text', label: 'Text Input' },
    { name: 'range', label: 'Range' },
    { name: 'slider', label: 'Slider' },
    { name: 'info', label: 'Info' },
    { name: 'audio', label: 'Audio' },
    { name: 'timed', label: 'Timed' },
    { name: 'range-info', label: 'Range Info' },
    { name: 'radio-matrix', label: 'Radio-Matrix' },
    { name: 'datepicker', label: 'Date Input' },
  ];

  units = [
    { name: 'min', label: 'Minute' },
    { name: 'hour', label: 'Hour' },
    { name: 'day', label: 'Day' },
    { name: 'week', label: 'Week' },
    { name: 'month', label: 'Month' },
    { name: 'year', label: 'Year' },
  ];

  private fb = inject(FormBuilder);

  form: UntypedFormGroup = this.fb.group({
    id: [{ value: undefined, disabled: true }],
    name: [
      undefined,
      [Validator.requiredValidator, Validator.stringIdValidator],
    ],
    defaultLanguage: [undefined], // first language in array || english
    showIntroduction: [undefined],
    showInCalendar: [undefined],
    isDemo: [undefined],
    order: [undefined],
    questionnaire: this.fb.group({
      name: [undefined],
      avsc: [undefined],
    }),
    startText: [undefined],
    endText: [undefined],
    warn: [undefined],
    estimatedCompletionTime: [undefined],
    protocol: this.fb.group({
      repeatProtocol: this.fb.group({
        unit: [undefined],
        amount: [undefined],
      }),
      repeatQuestionnaire: this.fb.group({
        times: [undefined],
        unit: [undefined],
        unitsFromZero: [undefined],
      }),
      reminders: this.fb.group({
        enabled: [undefined],
        unit: [undefined],
        amount: [undefined],
        repeat: [undefined],
      }),
      clinicalProtocol: this.fb.group({
        enabled: [undefined],
        requiresInClinicCompletion: [undefined],
        repeatAfterClinicVisit: this.fb.group({
          enabled: [undefined],
          unit: [undefined],
          unitsFromZero: [undefined],
        }),
      }),
      notification: this.fb.group({
        enabled: [undefined],
        title: [undefined],
        text: [undefined],
      }),
      completionWindow: this.fb.group({
        enabled: [undefined],
        unit: [undefined],
        amount: [undefined],
      }),
    }),
  });

  controls = {
    id: this.form.get('id'),
    name: this.form.get('name'),
    defaultLanguage: this.form.get('defaultLanguage'), //[undefined], // first language in array || english
    showIntroduction: this.form.get('showIntroduction'), //[undefined],
    showInCalendar: this.form.get('showInCalendar'), //[undefined],
    isDemo: this.form.get('isDemo'), //[undefined],
    order: this.form.get('order'), //[undefined],
    questionnaire: {
      name: this.form.get('questionnaire')?.get('name'),
      avsc: this.form.get('questionnaire')?.get('avsc'),
    },
    startText: this.form.get('startText'), //[undefined],
    endText: this.form.get('endText'), //[undefined],
    warn: this.form.get('warn'), //[undefined],
    estimatedCompletionTime: this.form.get('estimatedCompletionTime'), //[undefined],
    protocol: {
      repeatProtocol: {
        unit: this.form.get('protocol')?.get('repeatProtocol')?.get('name'),
        amount: this.form.get('protocol')?.get('repeatProtocol')?.get('amount'),
      },
      repeatQuestionnaire: {
        times: this.form
          .get('protocol')
          ?.get('repeatQuestionnaire')
          ?.get('times'),
        unit: this.form
          .get('protocol')
          ?.get('repeatQuestionnaire')
          ?.get('unit'),
        unitsFromZero: this.form
          .get('protocol')
          ?.get('repeatQuestionnaire')
          ?.get('unitsFromZero'),
      },
      reminders: {
        enabled: this.form.get('protocol')?.get('reminders')?.get('enabled'),
        unit: this.form.get('protocol')?.get('reminders')?.get('unit'),
        amount: this.form.get('protocol')?.get('reminders')?.get('amount'),
        repeat: this.form.get('protocol')?.get('reminders')?.get('repeat'),
      },
      clinicalProtocol: {
        enabled: this.form
          .get('protocol')
          ?.get('clinicalProtocol')
          ?.get('enabled'),
        requiresInClinicCompletion: this.form
          .get('protocol')
          ?.get('clinicalProtocol')
          ?.get('requiresInClinicCompletion'),
        repeatAfterClinicVisit: {
          enabled: this.form
            .get('protocol')
            ?.get('clinicalProtocol')
            ?.get('repeatAfterClinicVisit')
            ?.get('enabled'),
          unit: this.form
            .get('protocol')
            ?.get('clinicalProtocol')
            ?.get('repeatAfterClinicVisit')
            ?.get('unit'),
          unitsFromZero: this.form
            .get('protocol')
            ?.get('clinicalProtocol')
            ?.get('repeatAfterClinicVisit')
            ?.get('unitsFromZero'),
        },
      },
      notification: {
        enabled: this.form.get('protocol')?.get('notification')?.get('enabled'),
        title: this.form.get('protocol')?.get('notification')?.get('title'),
        text: this.form.get('protocol')?.get('notification')?.get('text'),
      },
      completionWindow: {
        enabled: this.form
          .get('protocol')
          ?.get('completionWindow')
          ?.get('enabled'),
        unit: this.form.get('protocol')?.get('completionWindow')?.get('unit'),
        amount: this.form
          .get('protocol')
          ?.get('completionWindow')
          ?.get('amount'),
      },
    },
  };

  // ProjectStatus = ProjectStatus;

  // entities = this.data.entities;
  // organizations = this.data.organizations;
  // organizationOptions = this.data.organizations
  //   .map((o) => o.name)
  //   .sort((a, b) => a.localeCompare(b));
  // organizationName = this.data.organizationName;
  //
  // sourceTypes = this.data.sourceTypes;
  DialogMode = DialogMode;

  isLoading = false;
  error = false;

  mode?: DialogMode; // = this.data.mode as DialogMode;
  entity?: AppProtocol; // = this.data.entity;

  @Output() actionTriggered = new EventEmitter();

  subscription$: Subject<void> = new Subject<void>();

  ValidatorHint = ValidatorHint;
  ValidatorError = ValidatorError;

  dateFormat = 'mm/dd/yyy';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private fb: UntypedFormBuilder,
    // private localeService: LocaleService,
    private dateAdapter: DateAdapter<any>,
    private service: ProtocolService,
    private store: Store,
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.mode = DialogMode.EDIT;
      this.service.getById(id).subscribe((res) => {
        this.entity = res;
        // this.initForm();
      });
    } else {
      this.mode = DialogMode.ADD;
    }

    this.form?.valueChanges
      .pipe(takeUntil(this.subscription$))
      .subscribe(() => {
        this.error = false;
      });

    this.store.select(locale)
    // this.localeService.locale$
      // ?.getLocale()
      .pipe(takeUntil(this.subscription$))
      .subscribe((locale) => {
        this.dateAdapter?.setLocale(locale.currentLanguage?.locale);
        this.dateFormat = locale.currentLanguage?.dateFormat || 'mm/dd/yyy';
      });
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }

  onAction($event: string) {
    switch ($event) {
      // case 'close':
      //   this.close();
      //   break;
      case 'delete':
        this.delete();
        break;
      case 'save':
        this.save();
        break;
    }
  }

  save(): void {
    //   this.error = false;
    //   this.isLoading = true;
    //   this.actionTriggered.emit({
    //     action: this.mode,
    //     entity: { ...this.entity, ...this.form?.value },
    //   });
    //
    //   console.log('onSubmit');
    //   console.log('raw');
    //   console.log(this.form?.value);
    //   console.log('DTO');
    //   console.log(new ProtocolDTO(this.form.value));
    //   const res = {
    //     defaultLanguage: 'ab',
    //     endText: 'sdfs',
    //     estimatedCompletionTime: 'sdfsdfs',
    //     isDemo: null,
    //     name: 'dfsdf',
    //     order: '4',
    //     protocol: {
    //       clinicalProtocol: {
    //         enabled: true,
    //         repeatAfterClinicVisit: {
    //           enabled: null,
    //           unit: null,
    //           unitsFromZero: 4,
    //         },
    //         requiresInClinicCompletion: true,
    //       },
    //       completionWindow: {
    //         amount: 44,
    //         enabled: true,
    //         unit: 'year',
    //       },
    //       notification: {
    //         enabled: true,
    //         text: 'sdfsdfs',
    //         title: 'sdfsdf',
    //       },
    //       reminders: {
    //         amount: 23,
    //         enabled: true,
    //         repeat: 'sdfsdfs',
    //         unit: 'min',
    //       },
    //       repeatProtocol: {
    //         amount: 342,
    //         unit: 'month',
    //       },
    //       repeatQuestionnaire: {
    //         times: 'sdfsdf',
    //         unit: null,
    //         unitsFromZero: 1000,
    //       },
    //     },
    //     questionnaire: {
    //       avsc: 'task',
    //       name: 'esm',
    //     },
    //     showInCalendar: null,
    //     showIntroduction: null,
    //     startText: 'sdfsd',
    //     warn: 'sdfsd',
    //   };
  }

  delete(): void {
    this.error = false;
    this.isLoading = true;
    if (this.entity) {
      this.actionTriggered.emit({ action: this.mode, entity: this.entity });
    }
  }

  // close(): void {
  //   this.actionTriggered.emit({ action: 'close' });
  //   this.dialogRef.close();
  // }

  errorHappened(error: HttpErrorResponse): void {
    this.isLoading = false;
    this.error = true;
  }

  // initForm(): void {
  //   if (this.entity) {
  //     // this.form.patchValue(this.toRawFormValue(this.entity));
  //     this.form.patchValue(this.toRawFormValue(this.entity));
  //   }
  // }

  onSubmit() {
    console.log('onSubmit');
    console.log(this.form?.value);
  }

  minutesToWDHM(minutes: number): string {
    const w = Math.floor(minutes / (60 * 24 * 7));
    const d = Math.floor((minutes % (60 * 24 * 7)) / (60 * 24));
    const h = Math.floor((minutes % (60 * 24)) / 60);
    const m = Math.floor(minutes % 60);

    const wDisplay = w > 0 ? 'W' + (w + 1) + '/' : ''; //+ (w == 1 ? " week, " : " weeks, ") : "";
    const dDisplay = d > 0 ? 'D' + (d + 1) + '/' : ''; //+ (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h < 10 ? '0' + h : h; // h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m < 10 ? '0' + m : m; //m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";

    return wDisplay + dDisplay + hDisplay + ':' + mDisplay; //.replace(/,\s*$/, "");
  }
}

// export class ProtocolDTO {
//   id: number;
//   name: string;
//   showIntroduction: boolean;
//   showInCalendar: boolean;
//   isDemo: boolean;
//   order: number;
//   questionnaire: {
//     repository: string;
//     name: string;
//     avsc: string;
//   };
//   startText?: Record<string, string>;
//   endText?: Record<string, string>;
//   warn?: Record<string, string>;
//   estimatedCompletionTime?: number;
//   protocol?: RadarSubProtocol;
//   description?: string;
//   createdAt?: string;
//   modifiedAt?: string;
//   createdBy?: string;
//   modifiedBy?: string;
//   attributes?: Record<string, string>;
//
//   constructor(formValue: RawProtocolFormValue) {
//     this.id = formValue.id;
//     this.name = formValue.name;
//     this.showIntroduction = !!formValue.showIntroduction;
//     this.showInCalendar = !!formValue.showInCalendar;
//     this.isDemo = !!formValue.isDemo;
//     this.order = formValue.order || 0;
//     this.questionnaire = {
//       repository: '',
//       name: formValue.questionnaire.name,
//       avsc: formValue.questionnaire.avsc,
//     };
//     this.startText = { [formValue.defaultLanguage]: formValue.startText || '' };
//     this.endText = { [formValue.defaultLanguage]: formValue.endText || '' };
//     this.warn = { [formValue.defaultLanguage]: formValue.warn || '' };
//     this.estimatedCompletionTime = formValue.estimatedCompletionTime;
//     this.protocol = new SubProtocolDTO(
//       formValue.protocol,
//       formValue.defaultLanguage
//     );
//     // if (formValue.referenceIds && formValue.referenceIds.length > 0) {
//     //   this.referenceIds = formValue.referenceIds;
//     // }
//   }
// }
//
// export class SubProtocolDTO {
//   repeatProtocol?: {
//     unit?: string;
//     amount?: number;
//   };
//   repeatQuestionnaire?: {
//     unit?: string;
//     unitsFromZero?: number[];
//   };
//   reminders?: {
//     unit?: string;
//     amount?: number;
//     repeat?: number;
//   };
//   clinicalProtocol?: {
//     requiresInClinicCompletion?: boolean;
//     repeatAfterClinicVisit?: {
//       unit?: string;
//       unitsFromZero?: number[];
//     };
//   };
//   notification?: {
//     title?: Record<string, string>;
//     text?: Record<string, string>;
//   };
//   completionWindow?: {
//     unit: string;
//     amount: number;
//   };
//
//   constructor(formValue: RawSubProtocolFormValue, defaultLanguage: string) {
//     this.repeatProtocol = {
//       unit: formValue.repeatProtocol?.unit,
//       amount: formValue.repeatProtocol?.amount,
//     };
//     this.repeatQuestionnaire = {
//       unit: formValue.repeatQuestionnaire?.unit,
//       unitsFromZero: [100], //formValue.repeatQuestionnaire?.times?.map((t) => 1),
//     };
//     if (formValue.reminders?.enabled) {
//       this.reminders = {
//         unit: formValue.reminders.unit,
//         amount: formValue.reminders.amount,
//         repeat: formValue.reminders.repeat,
//       };
//     }
//     if (formValue.clinicalProtocol?.enabled) {
//       this.clinicalProtocol = {
//         requiresInClinicCompletion:
//           formValue.clinicalProtocol.requiresInClinicCompletion,
//         repeatAfterClinicVisit: {
//           unit: formValue.clinicalProtocol.repeatAfterClinicVisit?.unit,
//           unitsFromZero: [1],
//           // formValue.clinicalProtocol.repeatAfterClinicVisit?.unitsFromZero,
//         },
//       };
//     }
//     if (formValue.notification?.enabled) {
//       this.notification = {
//         title: { [defaultLanguage]: formValue.notification.title || '' },
//         text: { [defaultLanguage]: formValue.notification.text || '' },
//       };
//     }
//     if (formValue.completionWindow?.enabled) {
//       this.completionWindow = {
//         unit: formValue.completionWindow.unit,
//         amount: formValue.completionWindow.amount,
//       };
//     }
//   }
// }
//
// export interface RawProtocolFormValue {
//   id: number;
//   name: string;
//   defaultLanguage: string;
//   showIntroduction?: boolean;
//   showInCalendar?: boolean;
//   isDemo?: boolean;
//   order?: number;
//   questionnaire: {
//     name: string;
//     avsc: string;
//   };
//   startText?: string;
//   endText?: string;
//   warn?: string;
//   estimatedCompletionTime?: number;
//   protocol: RawSubProtocolFormValue;
//   // attributes?: Record<string, string>;
// }
//
// export interface RawSubProtocolFormValue {
//   repeatProtocol?: {
//     unit?: string;
//     amount?: number;
//   };
//   repeatQuestionnaire?: {
//     times?: string[]; //number;
//     unit?: string;
//     // unitsFromZero?: string;
//   };
//   reminders?: {
//     enabled?: boolean;
//     unit?: string;
//     amount?: number;
//     repeat?: number;
//   };
//   clinicalProtocol?: {
//     enabled?: boolean;
//     requiresInClinicCompletion?: boolean;
//     repeatAfterClinicVisit?: {
//       enabled?: boolean;
//       unit?: string;
//       unitsFromZero?: string;
//     };
//   };
//   notification?: {
//     enabled?: boolean;
//     title?: string;
//     text?: string;
//   };
//   completionWindow?: {
//     enabled: boolean;
//     unit: string;
//     amount: number;
//   };
// }

export function moveItemInFormArray(
  formArray: FormArray,
  fromIndex: number,
  toIndex: number
): void {
  const dir = toIndex > fromIndex ? 1 : -1;

  const item = formArray.at(fromIndex);
  for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
    const current = formArray.at(i + dir);
    formArray.setControl(i, current);
  }
  formArray.setControl(toIndex, item);
}
