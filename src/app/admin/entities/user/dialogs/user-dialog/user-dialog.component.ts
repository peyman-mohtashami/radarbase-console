import {
  Component,
  inject,
  AfterViewInit, signal, effect
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {AppUser, CreateUserDto, RoleDto, UpdateUserDto, UserDialogMode} from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../shared/enums/dialog';
import {UserConfigService} from '../../services/user-config.service';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {JsonPipe} from '@angular/common';
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {UserDetailsComponent} from '../../components/user-details/user-details.component';
import {DetailType} from '../../../../shared/enums/detail-type';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ActivatedRoute, Router} from '@angular/router';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {UserStore} from '../../services/user.store';
import {disabled, email, form, FormField} from '@angular/forms/signals';
import {normalTextField, requiredField} from '../../../../../shared/utils/signal-form-validators';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {getLastSegment} from '../../../../shared/utils/route.util';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  SearchableMultiSelectComponent
} from '../../../../../shared/components/searchable-multi-select/searchable-multi-select';
import {ROLES} from '../../../../../shared/enums/roles';


export interface UserForm {
  id: string;
  login: string,
  firstName: string;
  lastName: string;
  email: string,
  langKey: string,
  _roles: {
    _sysAdmin: boolean;
    _organizationAdmin: boolean;
    _organizations: string[];
    _projectAdmin: boolean;
    _projects: string[];
  }
}

export interface StoredUserDialog {
  mode: UserDialogMode;
  entity?: AppUser;
  model: UserForm;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  imports: [
    MatDialogContent,
    TranslatePipe,
    MatFormField,
    MatError,
    MatInput,
    ErrorMessageBoxComponent,
    UserDetailsComponent,
    MatDialogTitle,
    MatDialogActions,
    JsonPipe,
    MatIcon,
    MatProgressSpinner,
    MatButton,
    FormField,
    MatSlideToggle,
    SearchableMultiSelectComponent,
  ]
})
export class UserDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

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
    restoredModel?: UserForm;
  };

  formFields = this.configService.getFormFields();

  protected model = signal<UserForm>(this.dialogData.restoredModel ?? {
    ...this.dialogData.entity,
    id: `${this.dialogData.entity?.id ?? ''}`,
    login: this.dialogData.entity?.login ?? '',
    firstName: this.dialogData.entity?.firstName ?? '',
    lastName: this.dialogData.entity?.lastName ?? '',
    email: this.dialogData.entity?.email ?? '',
    langKey: this.dialogData.entity?.langKey ?? '',
    _roles: {
      _sysAdmin: this.dialogData.entity?._roles?._sysAdmin ?? false,
      _organizationAdmin: this.dialogData.entity?._roles?._organizationAdmin ?? false,
      _projectAdmin: this.dialogData.entity?._roles?._projectAdmin ?? false,
      _organizations: this.dialogData.entity?._roles?._organizations?.map((org) => org.name) ?? [],
      _projects: this.dialogData.entity?._roles?._projects?.map((project) => project.projectName) ?? []
    }
  });

  protected form = form(this.model, (schema) => {
    disabled(schema.id);
    requiredField(schema.login);
    normalTextField(schema.login);
    normalTextField(schema.firstName);
    normalTextField(schema.lastName);
    requiredField(schema.email);
    email(schema.email);
    disabled(schema.email, {when: () => !!this.dialogData.entity});
    requiredField(schema._roles._organizations);
    requiredField(schema._roles._projects);
  });

  constructor() {
    effect(() => {
      const model = this.model();
      if (this.dialogData.mode === DialogMode.ADD || this.dialogData.mode === DialogMode.EDIT) {
        this.configService.setDialogState({
          mode: this.dialogData.mode,
          entity: this.dialogData.entity,
          model,
        });
      }
    });
  }

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected async save(): Promise<void> {
    switch(this.dialogData.mode) {
      case DialogMode.ADD:
        await this.store.add(this.toCreateDtoModel(this.model()));
        break;
      case DialogMode.EDIT:
        await this.store.update(this.toUpdateDtoModel(this.model()));
        break;
    }

    if (this.store.error()) return;

    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnUpdateSuccess(this.model());
  }

  protected async delete(): Promise<void> {
    await this.store.delete(this.dialogData.entity!);
    this.configService.clearDialogState();
    this.dialogRef.close();
    this.navigateOnDeleteSuccess();
  }

  close() {
    this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  navigateOnUpdateSuccess(model: UserForm) {
    const selectedUser = this.store.selected();
    if (!selectedUser) return;

    const urlTree = this.router.parseUrl(this.router.url);
    this.router.navigate(['./admin/users', model.login, getLastSegment(urlTree)], {queryParams: urlTree.queryParams}).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin/users'], { queryParamsHandling: 'preserve' }).then();
  }

  toCreateDtoModel(model: UserForm): CreateUserDto {
    return {
      login: model.login,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      // langKey?: string
      // authorities?: string[] | {
      //   name: string
      // }[]
      roles: this.toRoleDto(model._roles)
    };
  }

  toUpdateDtoModel(model: UserForm): UpdateUserDto {
    return {
      id: Number(model.id),
      login: model.login,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      // langKey?: string
      // authorities?: string[] | {
      //   name: string
      // }[]
      roles: this.toRoleDto(model._roles)
    };
  }

  private toRoleDto(roles: UserForm['_roles'] | undefined): RoleDto[] {
    if (!roles) return [];

    if (roles._sysAdmin) {
      return [{ authorityName: ROLES.SYS_ADMIN }];
    }

    let result: RoleDto[] = [];

    if (roles._organizationAdmin) {
      result = roles._organizations?.map((organization) => {
        const matchedOrganization = this.dialogData.organizationFullList.find(o => o.name === organization)
        return {
          authorityName: ROLES.ORGANIZATION_ADMIN,
          organizationId: matchedOrganization?.id,
          organizationName: matchedOrganization?.name,
        }
      }) ?? [];
    }

    if (roles._projectAdmin) {
      result = [...result, ...(roles._projects?.map((project) => {
        const matchedProject = this.dialogData.projectFullList.find(p => p.projectName === project)
        return {
          authorityName: ROLES.PROJECT_ADMIN,
          projectId: matchedProject?.id,
          projectName: matchedProject?.projectName,
        }
      }) ?? [])];
    }
    return result;
  }
}
