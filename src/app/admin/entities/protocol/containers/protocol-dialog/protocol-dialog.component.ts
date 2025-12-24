import {
  AfterViewInit,
  Component, effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal, viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogMode} from "../../../../enums/dialog";
import {AppProtocol, FormProtocol} from "../../models/protocol";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {DialogActionsComponent} from "../../../../components/dialog/dialog-actions/dialog-actions.component";
import {
  ValidatorError,
  ValidatorHint
} from "../../../../../shared/utils/validators";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {MatTooltip} from "@angular/material/tooltip";
import {toSignal} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs/operators";

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
import {RadarOption} from "../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {ProtocolService} from "../../services/protocol.service";
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {MatIcon} from '@angular/material/icon';

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
    MatDialogTitle,
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
    MatIcon,
    ErrorMessageBoxComponent,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class ProtocolDialogComponent implements OnInit, AfterViewInit {
  private entityService = inject(ProtocolService);
  protected configService = inject(ProtocolConfigService);
  private dialogRef = inject(MatDialogRef<ProtocolDialogComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: FormProtocol;
    entities: AppProtocol[];
  };

  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  onDemand = signal(false);
  languages = signal<RadarOption[]>(this.dialogData.entity?.general?.languages ?? []);

  editorOptions = {
    language: 'json',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: 'on'
  };
  protected showCode = false;

  updatedValue?: any;
  updatedCode = '';

  tableFields = this.configService.getTableFields();
  formFields = this.configService.getFormFields();

  form = new FormGroup({
    general: new FormControl<any>({}, {nonNullable: true}),
    questionsGroup: new FormControl<any>({}, {nonNullable: true}),
    scheduling: new FormControl<any>({}),
    content: new FormControl<any>({}, {nonNullable: true}),
  });

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppProtocol }>();

  private readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  constructor() {
    effect(() => {
      if (this.formValueChanges()) {
        this.error.set(null);
      }
    });
  }

  ngOnInit() {
    const updatedEntity = {
      ...this.dialogData.entity,
    };
    this.form.patchValue(updatedEntity);
    // Initialize onDemand state and enable/disable scheduling accordingly
    const onDemand = !!updatedEntity?.general?.onDemand;
    this.onDemand.set(onDemand);
    this.adjustSchedulingDisabled(onDemand);
  }

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  onAction($event: string) { //TODO DIALOG_ACTION
    this.error.set(null);
    this.loading.set(true);
    switch ($event) {
      case 'close':
        this.close();
        break;
      case 'delete':
        this.handleDeleteAction();
        break;
      case 'save':
      case 'edit':
        this.handleSaveAction();
        break;
    }
  }

  private handleSaveAction(): void {
    const value = this.form.getRawValue();
    const updatedEntity: FormProtocol = {
      //...this.dialogData.entity,
      ...value
    };
    // console.log('Class: ProtocolDialogComponent, Function: handleSaveAction, Line 172 updatedEntity' , updatedEntity);
    // console.log('Class: ProtocolDialogComponent, Function: handleSaveAction, Line 173 this.entityService' , this.entityService.toRadarModel(updatedEntity));
    const appProtocol = this.entityService.formToAppModel(updatedEntity);
    console.log('Class: ProtocolDialogComponent, Function: handleSaveAction, Line 177 appProtocol' , appProtocol);
    const radarProtocol = this.entityService.appToRadarModel(appProtocol);
    console.log('Class: ProtocolDialogComponent, Function: handleSaveAction, Line 179 radarProtocol' , radarProtocol);
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: appProtocol,
    });
  }

  private handleDeleteAction(): void {
    const appProtocol = this.entityService.formToAppModel(this.dialogData.entity);
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: appProtocol});
  }

  close() {
    this.loading.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  protected toggleCodeView() {
    const updatedEntity = this.form.getRawValue();
    const appProtocol = this.entityService.formToAppModel(updatedEntity);
    const radarProtocol = this.entityService.appToRadarModel(appProtocol);
    const json = {...radarProtocol, languages: undefined};
    // this.updatedValue = {...entityLike, _name: value.general.name , _search: value.general.name};
    this.updatedValue = {...radarProtocol, _name: updatedEntity.general.name , _search: updatedEntity.general.name};
    this.updatedCode = JSON.stringify(json, null, 2);
    this.showCode = !this.showCode
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
