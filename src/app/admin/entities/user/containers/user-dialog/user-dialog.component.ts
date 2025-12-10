import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {Validator} from '../../../../../shared/utils/validators';
import {AppUser} from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../enums/dialog';
import {UserDialogService} from '../../services/user-dialog.service';
import {UserConfigService} from '../../services/user-config.service';
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
import {BaseDialogComponent} from '../../../../components/dialog/base-dialog.component';

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
export class UserDialogComponent extends BaseDialogComponent<AppUser> implements OnInit, AfterViewInit {
  override configService = inject(UserConfigService);
  override dialogRef = inject(MatDialogRef<UserDialogService>);
  override dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppUser;
    entities: AppUser[];
    projects: AppProject[];
    organizations: AppOrganization[];
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
