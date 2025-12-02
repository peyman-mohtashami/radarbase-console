import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator, ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {AppUser} from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../enums/dialog';
import {UserDialogService} from '../../services/user-dialog.service';
import {UserConfigService} from '../../services/user-config.service';
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  MatSelectAutocompleteComponent, RadarOption
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {DialogTitleComponent} from '../../../../components/dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../components/dialog/dialog-body-description/dialog-body-description.component';
import {DialogActionsComponent} from '../../../../components/dialog/dialog-actions/dialog-actions.component';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    DialogActionsComponent,
    MatInput,
    MatSlideToggle,
    MatSelectAutocompleteComponent,
  ]
})
export class UserDialogComponent implements OnInit, AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  protected configService = inject(UserConfigService);
  private dialogRef = inject(MatDialogRef<UserDialogService>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppUser;
    entities: AppUser[];
    projects: AppProject[];
    organizations: AppOrganization[];
  };

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    id: new FormControl<string| number>({ value: '', disabled: true }, {nonNullable: true}),
    login: new FormControl<string>('', {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
    firstName: new FormControl<string>('', {validators: [Validator.normalTextValidator]}),
    lastName: new FormControl<string>('', {validators: [Validator.normalTextValidator]}),
    email: new FormControl<string>('', {nonNullable: true, validators: [Validator.requiredValidator, Validator.emailValidator]}),
    langKey: new FormControl<string>(''),
    _roles: new FormGroup({
      _sysAdmin: new FormControl<boolean>(false),
      _organizationAdmin: new FormControl<boolean>(false),
      _organizations: new FormControl<RadarOption[]>([]),
      _projectAdmin: new FormControl<boolean>(false),
      _projects: new FormControl<RadarOption[]>([]),
    }),
  });

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ action: DialogMode, entity?: AppUser }>();

  readonly formValueChanges = toSignal(
    this.form.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.getRawValue()}
  );

  constructor() {
    effect(() => {
      if (this.formValueChanges()) {
        this.error$.set(null);
      }
    });
  }

  ngOnInit() {
    this.form.patchValue(this.dialogData.entity);
  }

  ngAfterViewInit() {
    const container = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      container?.classList.add('dialog-enter-active');
    });
  }

  onAction($event: string) { //TODO DIALOG_ACTION
    this.error$.set(null);
    this.loading$.set(true);
    switch ($event) {
      case 'close':
        this.close();
        break;
      case 'delete':
        this.handleDeleteAction();
        break;
      case 'save':
        this.handleSaveAction();
        break;
    }
  }

  private handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form.getRawValue()}});
  }

  private handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }

  close() {
    this.loading$.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading$.set(false);
    this.error$.set(error);
  }
}
