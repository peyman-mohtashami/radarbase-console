import {
  Component,
  inject,
  signal, viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DialogMode} from "../../../../../base-entities/enums/dialog";
import {AppProtocol, FormProtocol} from "../../models/protocol";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {DialogActionsComponent} from "../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {MatTooltip} from "@angular/material/tooltip";

import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {ProtocolStepGeneral} from "./protocol-steps/protocol-step-general/protocol-step-general";
import {ProtocolStepContent} from "./protocol-steps/protocol-step-content/protocol-step-content";
import {
  ProtocolStepQuestionSet
} from "./protocol-steps/protocol-step-question-set/protocol-step-question-set";
import {
  ProtocolStepScheduling
} from "./protocol-steps/protocol-step-scheduling/protocol-step-scheduling";
import {RadarOption} from "../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {ProtocolService} from "../../services/protocol.service";
import {
  DialogBodyDescriptionComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {
  DialogTitleComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';

@Component({
  selector: 'app-protocol-dialog',
  templateUrl: './protocol-dialog.component.html',
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    TranslatePipe,
    DialogActionsComponent,
    DialogActionsComponent,
    MatIconButton,
    FormsModule,
    EditorComponent,
    MatTooltip,
    MatStepper,
    ProtocolStepGeneral,
    ProtocolStepContent,
    ProtocolStepQuestionSet,
    ProtocolStepScheduling,
    MatStep,
    MatStepLabel,
    MatButton,
    DialogBodyDescriptionComponent,
    ErrorMessageBoxComponent,
    AsyncPipe,
    DialogTitleComponent,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class ProtocolDialogComponent extends BaseEntityDialogComponent<AppProtocol> {
  private entityService = inject(ProtocolService);
  override configService = inject(ProtocolConfigService);
  override dialogRef = inject(MatDialogRef<ProtocolDialogComponent>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity?: AppProtocol;
    protocolFullList: Observable<AppProtocol[]>;
  };

  onDemand = signal(false);
  languages = signal<RadarOption[]>(this.dialogData.entity?._languages ?? []);

  editorOptions = {
    language: 'json',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: 'on'
  };
  protected showCode = false;

  // updatedValue?: any;
  updatedCode = '';

  tableFields = this.configService.getTableFields();
  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
    general: new FormControl<FormProtocol['general']>(null!, {nonNullable: true}),
    questionsGroup: new FormControl<FormProtocol['questionsGroup']>(null!, {nonNullable: true}),
    scheduling: new FormControl<FormProtocol['scheduling'] | null>(null),
    content: new FormControl<FormProtocol['content']>(null!, {nonNullable: true}),
  });

  override ngOnInit() {
    const formEntity = this.dialogData.entity ? this.entityService.appToFormModel(this.dialogData.entity) : undefined;
    // const updatedEntity = {
    //   ...this.dialogData.entity,
    // };
    if (formEntity) this.form.patchValue(formEntity);
    // Initialize onDemand state and enable/disable scheduling accordingly
    const onDemand = !!formEntity?.general?.onDemand;
    this.onDemand.set(onDemand);
    this.adjustSchedulingDisabled(onDemand);
  }

  // private handleSaveAction(): void {
  //   const value = this.form.getRawValue();
  //   const updatedEntity: FormProtocol = {
  //     //...this.dialogData.entity,
  //     ...value
  //   };
  //   // console.log('Class: ProtocolDialogComponent, Function: handleSaveAction, Line 172 updatedEntity' , updatedEntity);
  //   // console.log('Class: ProtocolDialogComponent, Function: handleSaveAction, Line 173 this.entityService' , this.entityService.toRadarModel(updatedEntity));
  //   const appProtocol = this.entityService.formToAppModel(updatedEntity);
  //   console.log('Class: ProtocolDialogComponent, Function: handleSaveAction, Line 177 appProtocol' , appProtocol);
  //   const radarProtocol = this.entityService.appToRadarModel(appProtocol);
  //   console.log('Class: ProtocolDialogComponent, Function: handleSaveAction, Line 179 radarProtocol' , radarProtocol);
  //   this.dialogActionEvent.emit({
  //     action: this.dialogData.mode,
  //     entity: appProtocol,
  //   });
  // }
  //
  // private handleDeleteAction(): void {
  //   const appProtocol = this.entityService.formToAppModel(this.dialogData.entity);
  //   this.dialogActionEvent.emit({action: this.dialogData.mode, entity: appProtocol});
  // }

  protected toggleCodeView() {
    // const updatedEntity = this.form.getRawValue();
    // const appProtocol = this.entityService.formToAppModel(updatedEntity);
    // const radarProtocol = this.entityService.appToRadarModel(appProtocol);
    // const json = {...radarProtocol, languages: undefined};
    // // this.updatedValue = {...entityLike, _name: value.general.name , _search: value.general.name};
    // this.updatedValue = {...radarProtocol, _name: updatedEntity.general.name , _search: updatedEntity.general.name};
    // this.updatedCode = JSON.stringify(json, null, 2);
    // this.showCode = !this.showCode
  }

  protected updateOnDemand($event: boolean) {
    this.onDemand.set($event);
    this.adjustSchedulingDisabled($event);
  }

  protected updateLanguages($event: RadarOption[]) {
    this.languages.set($event);
  }

  stepper = viewChild<MatStepper>('matStepper');

  protected nextStep() {
    this.stepper()?.next();
  }

  protected previousStep() {
    this.stepper()?.previous();
  }

  private adjustSchedulingDisabled(disable: boolean) {
    const schedulingCtrl = this.form.controls.scheduling;
    if (!schedulingCtrl) { return; }

    if (disable) {
      schedulingCtrl.disable({emitEvent: false});
    } else {
      schedulingCtrl.enable({emitEvent: false});
    }
    schedulingCtrl.updateValueAndValidity({emitEvent: false});
  }
}
