import {
  Component,
  inject,
  ChangeDetectionStrategy, AfterViewInit, signal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {Validator} from '../../../../../shared/utils/validators';
import {AppUser, CreateUserDto, UpdateUserDto} from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {UserDialogService} from '../../services/user-dialog.service';
import {UserConfigService} from '../../services/user-config.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  MatSelectAutocompleteAdapter,
  MatSelectAutocompleteComponent
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {
  DialogAction,
  DialogActionsComponent
} from '../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component';
import {BaseEntityDialogComponent} from '../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {Observable} from 'rxjs';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {UserDetailsComponent} from '../../components/user-details/user-details.component';
import {DetailType} from '../../../../base-entities/enums/detail-type';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ActivatedRoute, Router} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {UserStore} from '../../services/user.store';
import {email, form, FormField} from '@angular/forms/signals';
import {normalTextField, requiredField} from '../../../../../shared/utils/signal-form-validators';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';


export interface UserForm {
  id: string;
  login: string,
  firstName: string;
  lastName: string;
  email: string,
  langKey: string,
  // _roles:
  // attributes: Record<string, string>,


  // _roles: new FormGroup({
  // _sysAdmin: new FormControl<boolean>(false),
  // _organizationAdmin: new FormControl<boolean>(false),
  // _organizations: new FormControl<AppOrganization[]>([]),
  // _projectAdmin: new FormControl<boolean>(false),
  // _projects: new FormControl<AppProject[]>([]),
}


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
    MatDialogActions,
    JsonPipe,
    MatIcon,
    MatProgressSpinner,
    MatButton,
    FormField,
  ]
})
export class UserDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly DialogAction = DialogAction;

  protected localeService = inject(LocaleService);
  protected store = inject(UserStore);
  protected configService = inject(UserConfigService);
  private dialogRef = inject(MatDialogRef<UserDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppUser;
    userFullList: AppUser[];
    projectFullList: AppProject[];
    organizationFullList: AppOrganization[];
  };

  formFields = this.configService.getFormFields();

  private model = signal<UserForm>({
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    login: this.dialogData.entity?.login ?? '',
    firstName: this.dialogData.entity?.firstName ?? '',
    lastName: this.dialogData.entity?.lastName ?? '',
    email: this.dialogData.entity?.email ?? '',
    langKey: this.dialogData.entity?.langKey ?? '',
    // _roles:
  });

  // override form = new FormGroup({
  //   id: new FormControl<string| number>({ value: '', disabled: true }, {nonNullable: true}),
  //   login: new FormControl<string>('', {nonNullable: true, validators: [Validator.requiredValidator, Validator.normalTextValidator]}),
  //   firstName: new FormControl<string>('', {validators: [Validator.normalTextValidator]}),
  //   lastName: new FormControl<string>('', {validators: [Validator.normalTextValidator]}),
  //   email: new FormControl<string>(
  //     {value: '', disabled: this.dialogData.mode !== DialogMode.ADD},
  //     {nonNullable: true, validators: [Validator.requiredValidator, Validator.emailValidator]}),
  //   langKey: new FormControl<string>(''),
  //   _roles: new FormGroup({
  //     _sysAdmin: new FormControl<boolean>(false),
  //     _organizationAdmin: new FormControl<boolean>(false),
  //     _organizations: new FormControl<AppOrganization[]>([]),
  //     _projectAdmin: new FormControl<boolean>(false),
  //     _projects: new FormControl<AppProject[]>([]),
  //   }),
  // });

  protected form = form(this.model, (schema) => {
    requiredField(schema.login);
    normalTextField(schema.login);
    normalTextField(schema.firstName);
    normalTextField(schema.lastName);
    requiredField(schema.email);
    email(schema.email);

  });

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  async onAction($event: DialogAction) {
    switch ($event) {
      case DialogAction.CLOSE:
        this.close();
        break;
      case DialogAction.DELETE:
        await this.handleDeleteAction();
        break;
      case DialogAction.SAVE:
        await this.handleSaveAction();
        break;
    }
  }

  protected async handleSaveAction(): Promise<void> {
    this.configService.setLatestFormEntry(this.model());

    if (this.dialogData.mode === DialogMode.ADD) {
      await this.store.add(this.toCreateDtoModel(this.model()));
    } else if (this.dialogData.mode === DialogMode.EDIT) {
      await this.store.update(this.toUpdateDtoModel(this.model()));
    }

    if (this.store.error()) return;

    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model().login);
  }

  protected async handleDeleteAction(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.setLatestFormEntry(null);
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }



  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(entityName: string) {
    const selectedOrganization = this.store.selected();
    if (!selectedOrganization) return;



    const urlTree = this.router.parseUrl(this.router.url);
    const primaryRoute = urlTree.root.children['primary'];

    if (!primaryRoute) {
      return;
    }

    const segments = primaryRoute.segments.map(segment => segment.path);
    const organizationsIndex = segments.indexOf('organizations');
    const organizationNameIndex = organizationsIndex + 1;

    const hasOrganizationNameInUrl =
      organizationsIndex !== -1 &&
      organizationNameIndex < segments.length;

    if (!hasOrganizationNameInUrl) {
      return;
    }

    segments[organizationNameIndex] = entityName;

    this.router.navigate(segments, {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin/organizations'], { queryParamsHandling: 'preserve' }).then();
  }

  toCreateDtoModel(model: UserForm): CreateUserDto {
    return {
      ...model,
    };
  }

  toUpdateDtoModel(model: UserForm): UpdateUserDto {
    return {
      ...model,
      id: Number(model.id),
    };
  }




  // protected organizationAdapter: MatSelectAutocompleteAdapter<AppOrganization> = {
  //   value: o => o.id.toString(),
  //   label: o => o.name
  // }
  //
  // protected projectAdapter: MatSelectAutocompleteAdapter<AppProject> = {
  //   value: o => o.id.toString(),
  //   label: o => o.projectName
  // }

  protected readonly DetailType = DetailType;
}
