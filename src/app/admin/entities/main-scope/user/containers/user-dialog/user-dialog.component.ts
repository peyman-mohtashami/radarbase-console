import {
  Component,
  inject,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

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
  MatSelectAutocompleteAdapter,
  MatSelectAutocompleteComponent
} from '../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {DialogActionsComponent} from '../../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {BaseEntityDialogComponent} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../../shared/components/message-box/error-message-box.component';
import {UserDetailsComponent} from '../../components/user-details/user-details.component';
import {DetailType} from '../../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  imports: [
    MatDialogContent,
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
    UserDetailsComponent,
    MatDialogTitle,
  ]
})
export class UserDialogComponent extends BaseEntityDialogComponent<AppUser> {
  protected readonly DetailType = DetailType;

  override configService = inject(UserConfigService);
  override dialogRef = inject(MatDialogRef<UserDialogService>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppUser;
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
    email: new FormControl<string>(
      {value: '', disabled: this.dialogData.mode !== DialogMode.ADD},
      {nonNullable: true, validators: [Validator.requiredValidator, Validator.emailValidator]}),
    langKey: new FormControl<string>(''),
    _roles: new FormGroup({
      _sysAdmin: new FormControl<boolean>(false),
      _organizationAdmin: new FormControl<boolean>(false),
      _organizations: new FormControl<AppOrganization[]>([]),
      _projectAdmin: new FormControl<boolean>(false),
      _projects: new FormControl<AppProject[]>([]),
    }),
  });

  protected organizationAdapter: MatSelectAutocompleteAdapter<AppOrganization> = {
    value: o => o.id.toString(),
    label: o => o.name
  }

  protected projectAdapter: MatSelectAutocompleteAdapter<AppProject> = {
    value: o => o.id.toString(),
    label: o => o.projectName
  }

}
