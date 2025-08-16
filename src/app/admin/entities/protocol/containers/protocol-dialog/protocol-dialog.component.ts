import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {DateAdapter, MatOption} from '@angular/material/core';
import { LANGUAGES } from './languages';
// import { LocaleService } from '../../../../../core/locale/services/locale.service';
import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import { Validator } from '../../../../../shared/utils/validators';
import { AppProtocol, toAppProtocol, toRadarProtocol } from "../../models/protocol";
import { AppQuestionnaire } from "../../../questionnaire/models/questionnaire";
// import { RadarProtocol } from "@rb/models";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {NgForOf, NgIf} from "@angular/common";
import {ProtocolDetailsComponent} from "../../components/protocol-details/protocol-details.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormField, MatHint, MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatLabel, MatSelect} from "@angular/material/select";
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton} from "@angular/material/button";
import {RadarProtocol} from '../../../../../shared/models/radar-protocol.model';
// import {DialogMode} from "../../../../enums/dialog";

@Component({
  selector: 'rb-protocol-dialog',
  templateUrl: './protocol-dialog.component.html',
  imports: [
    DialogTitleComponent,
    NgIf,
    ProtocolDetailsComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslatePipe,
    MatLabel,
    MatHint,
    MatInput,
    MatError,
    MatDivider,
    MatSlideToggle,
    ErrorMessageComponent,
    DialogActionsComponent,
    MatAnchor,
    MatButton,
    MatSelect,
    MatOption,
    NgForOf
  ]
})
export class ProtocolDialogComponent
  extends BaseDialogComponent<AppProtocol, ProtocolDialogComponent>
  implements OnInit, OnDestroy
{
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

  override form = new FormGroup({
    id: new FormControl<number | string>({value: "", disabled: true}),
    name: new FormControl(this.entity?.name || "", {
      validators: [Validator.requiredValidator, Validator.stringIdValidator],
      nonNullable: true
    }),
    // defaultLanguage: new FormControl({value: this.entity?.languages[0].code || "", disabled: true}, {
    //   nonNullable: true
    // }),
    defaultLanguage: new FormControl({value: "en", disabled: true}, {
      nonNullable: true
    }),
    customStartText: new FormGroup({
      enabled: new FormControl(this.entity?.customStartText.enabled || false, {
        nonNullable: true
      }),
      startText: new FormControl(this.entity?.customStartText.startText || "", {
        nonNullable: true
      }),
    }),
    showInCalendar: new FormControl(this.entity?.showInCalendar || false, {
      nonNullable: true
    }),
    isDemo: new FormControl(this.entity?.isDemo || false, {
      nonNullable: true
    }),
    order: new FormControl(this.entity?.order || "", {
      nonNullable: true
    }),
    questionnaire: new FormGroup({
      name: new FormControl(this.entity?.questionnaire.name || "", {
        nonNullable: true
      }),
      avsc: new FormControl(this.entity?.questionnaire.avsc || "", {
        nonNullable: true
      }),
    }),
    customEndText: new FormGroup({
      enabled: new FormControl(this.entity?.customEndText.enabled || false, {
        nonNullable: true
      }),
      endText: new FormControl(this.entity?.customEndText.endText || "", {
        nonNullable: true
      }),
    }),
    customWarnText: new FormGroup({
      enabled: new FormControl(this.entity?.customWarnText.enabled || false, {
        nonNullable: true
      }),
      warn: new FormControl(this.entity?.customWarnText.warn || "", {
        nonNullable: true
      }),
    }),
    estimatedCompletionTime: new FormControl(this.entity?.estimatedCompletionTime || "", {
      nonNullable: true
    }),
    customProtocol: new FormGroup({
      repeatProtocol: new FormGroup({
        enabled: new FormControl(this.entity?.customProtocol.repeatProtocol.enabled || false, {
          nonNullable: true,
        }),
        unit: new FormControl(this.entity?.customProtocol.repeatProtocol.unit || "", {
          nonNullable: true,
        }),
        amount: new FormControl(this.entity?.customProtocol.repeatProtocol.amount || "", {
          nonNullable: true,
        }),
      }),
      repeatQuestionnaire: new FormGroup({
        times: new FormControl(this.entity?.customProtocol.repeatQuestionnaire.times || "", {
          nonNullable: true
        }),
        unit: new FormControl(this.entity?.customProtocol.repeatQuestionnaire.unit || "", {
          nonNullable: true
        }),
        // unitsFromZero: new FormControl(this.entity.customProtocol.repeatQuestionnaire || undefined, {
        //   nonNullable: true
        // }),
      }),
      reminders: new FormGroup({
        enabled: new FormControl(this.entity?.customProtocol.reminders.enabled || false, {
          nonNullable: true
        }),
        unit: new FormControl(this.entity?.customProtocol.reminders.unit || "", {
          nonNullable: true
        }),
        amount: new FormControl(this.entity?.customProtocol.reminders.amount || "", {
          nonNullable: true
        }),
        repeat: new FormControl(this.entity?.customProtocol.reminders.repeat || "", {
          nonNullable: true
        }),
      }),
      clinicalProtocol: new FormGroup({
        enabled: new FormControl(this.entity?.customProtocol.clinicalProtocol.enabled || false, {
          nonNullable: true
        }),
        requiresInClinicCompletion: new FormControl(this.entity?.customProtocol.clinicalProtocol.requiresInClinicCompletion || false, {
          nonNullable: true
        }),
        repeatAfterClinicVisit: new FormGroup({
          enabled: new FormControl(this.entity?.customProtocol.clinicalProtocol.repeatAfterClinicVisit?.enabled || false, {
            nonNullable: true
          }),
          unit: new FormControl(this.entity?.customProtocol.clinicalProtocol.repeatAfterClinicVisit?.unit || "", {
            nonNullable: true
          }),
          unitsFromZero: new FormControl(this.entity?.customProtocol.clinicalProtocol.repeatAfterClinicVisit?.unitsFromZero || "", {
            nonNullable: true
          }),
        }),
      }),
      notification: new FormGroup({
        enabled: new FormControl(this.entity?.customProtocol.notification.enabled || false, {
          nonNullable: true
        }),
        title: new FormControl(this.entity?.customProtocol.notification.title || "", {
          nonNullable: true
        }),
        text: new FormControl(this.entity?.customProtocol.notification.text || "", {
          nonNullable: true
        }),
      }),
      completionWindow: new FormGroup({
        enabled: new FormControl(this.entity?.customProtocol.completionWindow.enabled || false, {
          nonNullable: true
        }),
        unit: new FormControl(this.entity?.customProtocol.completionWindow.unit || "", {
          nonNullable: true
        }),
        amount: new FormControl(this.entity?.customProtocol.completionWindow.amount || "", {
          nonNullable: true
        }),
      }),
    }),
  })

  entities;// = this.data.entities;

  file?: Blob;

  downloadJsonHref?: SafeUrl;

  constructor(
    router: Router,
    dialogRef: MatDialogRef<ProtocolDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppProtocol;
      entities: AppProtocol[];
      questionnaires: AppQuestionnaire[];
    },
    // currentLocaleService: LocaleService,
    store: Store,
    dateAdapter: DateAdapter<any>,
    private sanitizer: DomSanitizer,
  ) {
    super(router, dialogRef, data, store, dateAdapter);
    this.entities = this.data.entities;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.createExport();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  reset() {
    this.form.reset();
  }

  onFileSelected(e: any) {
    console.log("file changed")
    this.file = e.target.files[0];
    this.updateEntities(this.file);
  }

  updateEntities(file?: Blob) {
    console.log("upload file")
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      if (fileReader.result) {
        try {
          const entity: RadarProtocol = JSON.parse(fileReader.result as string);
          // this.entities = entities.map(entity => ({...entity, changed: true}))
          this.form.patchValue(toAppProtocol(entity));
          // this.checkIfChangeHappened(true);
          // this.dataSource.data = this.entities;
        } catch (error: unknown) {
          console.log(error)
        }
      }

    }
    if (file) {
      fileReader.readAsText(file);
    }
  }

  private createExport() {
    const configJson = JSON.stringify(toRadarProtocol(this.entity), null, 2);
    const blob = new Blob([configJson], { type: 'text/json' });
    const uri = URL.createObjectURL(blob);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl(uri);
  }
}
