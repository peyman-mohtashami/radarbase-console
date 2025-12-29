import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator} from '../../../../../../shared/utils/validators';
import {AppUser} from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {UserDialogService} from '../../services/user-dialog.service';
import {UserConfigService} from '../../services/user-config.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  MatSelectAutocompleteComponent, RadarOption
} from '../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {DialogTitleComponent} from '../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
import {
  DialogBodyDescriptionComponent
} from '../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {DialogActionsComponent} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';

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
    AsyncPipe,
    ErrorMessageBoxComponent,
  ]
})
export class UserDialogComponent extends BaseEntityDialogComponent<AppUser> implements OnInit, AfterViewInit {
  override configService = inject(UserConfigService);
  override dialogRef = inject(MatDialogRef<UserDialogService>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppUser;
    userFullList: Observable<AppUser[]>;
    projectFullList: Observable<AppProject[]>;
    organizationFullList: Observable<AppOrganization[]>;
  };

  override formFields = this.configService.getFormFields();

  override form = new FormGroup({
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

  ngOnInit() {
    super.init();
  }

  ngAfterViewInit() {
    super.afterViewInit();
  }

  override handleSaveAction(): void {
    this.dialogActionEvent.emit({
      action: this.dialogData.mode,
      entity: {...this.dialogData.entity, ...this.form.getRawValue()}});
  }

  override handleDeleteAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.dialogData.entity});
  }
}
