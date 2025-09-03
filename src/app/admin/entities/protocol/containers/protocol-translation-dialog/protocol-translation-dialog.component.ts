import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {DateAdapter, MatOption} from '@angular/material/core';

import { LANGUAGES } from './languages';
// import { LocaleService } from '../../../../../core/locale/services/locale.service';
import { BaseDialogComponent } from '../../../../base/base-dialog.component';
import { AppProtocol } from "../../models/protocol";
import {Store} from "@ngrx/store";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {NgForOf, NgIf} from "@angular/common";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {ProtocolDetailsComponent} from "../../components/protocol-details/protocol-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatLabel, MatSelect} from "@angular/material/select";
import {ProtocolLanguage} from '../../../../../shared/models/radar-protocol.model';

@Component({
  selector: 'rb-protocol-translation-dialog',
  templateUrl: './protocol-translation-dialog.component.html',
  imports: [
    DialogTitleComponent,
    NgIf,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ProtocolDetailsComponent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    NgForOf,
    ErrorMessageComponent,
    DialogActionsComponent
  ]
})
export class ProtocolTranslationDialogComponent
  extends BaseDialogComponent<
    AppProtocol,
    ProtocolTranslationDialogComponent
  >
  implements OnInit, OnDestroy
{
  LANGUAGES = LANGUAGES;

  // questionTypes = [
  //   { name: 'radio', label: 'Radio' },
  //   { name: 'checkbox', label: 'Checkbox' },
  //   { name: 'text', label: 'Text Input' },
  //   { name: 'range', label: 'Range' },
  //   { name: 'slider', label: 'Slider' },
  //   { name: 'info', label: 'Info' },
  //   { name: 'audio', label: 'Audio' },
  //   { name: 'timed', label: 'Timed' },
  //   { name: 'range-info', label: 'Range Info' },
  //   { name: 'radio-matrix', label: 'Radio-Matrix' },
  //   { name: 'datepicker', label: 'Date Input' },
  // ];
  //
  // units = [
  //   { name: 'min', label: 'Minute' },
  //   { name: 'hour', label: 'Hour' },
  //   { name: 'day', label: 'Day' },
  //   { name: 'week', label: 'Week' },
  //   { name: 'month', label: 'Month' },
  //   { name: 'year', label: 'Year' },
  // ];
  // ProjectStatus = ProjectStatus;

  entities;// = this.data.entities;

  override form = new FormGroup({
    id: new FormControl({ value: undefined, disabled: true }),
    name: new FormControl({ value: undefined, disabled: true }),
    language: new FormControl(""),
    customStartText: new FormGroup({
      startText: new FormControl(""),
    }),
    // startText: [undefined],
    customEndText: new FormGroup({
      endText: new FormControl(""),
    }),
    // endText: [undefined],
    customWarnText: new FormGroup({
      warn: new FormControl(""),
    }),
    // warn: [undefined],
    customProtocol: new FormGroup({
      notification: new FormGroup({
        title: new FormControl(""),
        text: new FormControl(""),
      }),
    }),
  });

  // loaded = false;

  language: ProtocolLanguage; // = this.data.language;

  // organizations = this.data.organizations;
  // organizationOptions = this.data.organizations
  //   .map((o) => o.name)
  //   .sort((a, b) => a.localeCompare(b));
  // organizationName = this.data.organizationName;
  //
  // sourceTypes = this.data.sourceTypes;
  constructor(
    router: Router,
    dialogRef: MatDialogRef<ProtocolTranslationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      language: ProtocolLanguage;
      entity: AppProtocol;
      entities: AppProtocol[];
    },
    store: Store,
    // currentLocaleService: LocaleService,
    dateAdapter: DateAdapter<any>
  ) {
    super(router, dialogRef, data, store, dateAdapter);
    this.entities = this.data.entities;
    this.language = this.data.language;
  }

  override ngOnInit() {
    if (this.language) {
      this.entity.customStartText.startText = this.entity.startText?.[this.language.code]
      this.entity.customEndText.endText = this.entity.endText?.[this.language.code]
      this.entity.customWarnText.warn = this.entity.warn?.[this.language.code]
      this.entity.customProtocol.notification.title = this.entity.protocol.notification?.title?.[this.language.code]
      this.entity.customProtocol.notification.text = this.entity.protocol.notification?.text?.[this.language.code]
      this.form.controls.language?.setValue(this.language.code)
      this.form.controls.language?.disable(); // = true;
    } else {
      this.entity.customStartText.startText = "";
      this.entity.customEndText.endText = "";
      this.entity.customWarnText.warn = "";
      this.entity.customProtocol.notification.title = undefined;
      this.entity.customProtocol.notification.text = undefined;
    }
    console.log(this.entity)
    // console.log((this.controls.customStartText.startText as FormGroup));
    // (this.controls.customStartText.startText as FormGroup).addControl(this.language.code, this.fb.control(''));
    // (this.controls.customEndText.endText as FormGroup).addControl(this.language.code, this.fb.control(''));
    // (this.controls.customWarnText.warn as FormGroup).addControl(this.language.code, this.fb.control(''))
    // this.loaded = true;
    super.ngOnInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  // override initForm(): void {
  //   const language = this.data.language.code;
  //   if (this.entity) {
  //     // this.form.patchValue(this.entity);
  //     // this.form.patchValue({ language });
  //     this.form.patchValue({
  //       id: this.entity.id,
  //       name: this.entity.name,
  //       language,
  //       customStartText: {
  //         startText: this.entity.customStartText?.startText?.[language],
  //       },
  //       customEndText: {
  //         endText: this.entity.customEndText?.endText?.[language],
  //       },
  //       customWarnText: { warn: this.entity.customWarnText?.warn?.[language] },
  //       customProtocol: {
  //         notification: {
  //           title: this.entity.customProtocol.notification?.title?.[language],
  //           text: this.entity.customProtocol.notification?.text?.[language],
  //         },
  //       },
  //     });
  //   }
  //   // if (!this.entity.customStartText?.enabled) {
  //   //   this.controls.startText?.disable();
  //   //   this.form.patchValue({
  //   //     startText: undefined,
  //   //   });
  //   // } else {
  //   //   this.form.patchValue({
  //   //     startText:
  //   //       this.entity.customStartText?.startText?.[this.data.language.name],
  //   //   });
  //   // }
  //   // if (!this.entity.customEndText?.enabled) {
  //   //   this.controls.endText?.disable();
  //   //   this.form.patchValue({
  //   //     endText: undefined,
  //   //   });
  //   // } else {
  //   //   this.form.patchValue({
  //   //     endText: this.entity.customEndText?.endText?.[this.data.language.name],
  //   //   });
  //   // }
  //   // if (!this.entity.customWarnText?.enabled) {
  //   //   this.controls.warn?.disable();
  //   //   this.form.patchValue({
  //   //     warn: undefined,
  //   //   });
  //   // } else {
  //   //   this.form.patchValue({
  //   //     warn: this.entity.customWarnText?.warn?.[this.data.language.name],
  //   //   });
  //   // }
  //   // if (!this.entity.customProtocol.notification?.enabled) {
  //   //   this.controls.customProtocol.notification.title?.disable();
  //   //   this.controls.customProtocol.notification.text?.disable();
  //   // } else {
  //   //   this.form.patchValue({
  //   //     warn: this.entity.customWarnText?.warn?.[this.data.language.name],
  //   //   });
  //   // }
  // }

  // onSubmit() {
  //   console.log(this.form?.value);
  // }
}
