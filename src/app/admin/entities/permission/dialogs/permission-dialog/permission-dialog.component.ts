import {AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {PermissionConfigService} from '../../services/permission-config.service';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AppUser, CreateUserDto, UpdateUserDto} from "../../../user/models/user";
import {
  DialogAction
} from "../../../../base-entities/containers/entity-dialog/dialog-actions/dialog-actions.component";
import {ErrorMessageBoxComponent} from '../../../../../shared/components/message-box/error-message-box.component';
import {LocaleService} from '../../../../../core/locale/services/locale.service';
import {ActivatedRoute, Router} from '@angular/router';
import {requiredField} from '../../../../../shared/utils/signal-form-validators';
// import {email} from '@angular/forms/signals';
import {animateDialogIn, animateDialogOut} from '../../../../shared/utils/dialog.util';
import {
  MatSelectAutocompleteAdapter
} from '../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {UserForm} from '../../../user/dialogs/user-dialog/user-dialog.component';
import {PermissionStore} from '../../services/permission.store';
import {form, FormField} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';

export interface PermissionForm {
  email: string,
}

@Component({
  selector: 'app-permission-dialog',
  templateUrl: './permission-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatDialogContent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatInput,
    MatDialogTitle,
    MatButton,
    MatIcon,
    MatProgressSpinner,
    ErrorMessageBoxComponent,
    FormField,
    JsonPipe,
  ]
})
export class PermissionDialogComponent implements AfterViewInit {
  protected readonly DialogMode = DialogMode;
  protected readonly DialogAction = DialogAction;

  protected localeService = inject(LocaleService);
  protected store = inject(PermissionStore);
  protected configService = inject(PermissionConfigService);
  private dialogRef = inject(MatDialogRef<PermissionDialogComponent>);
  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  tableFields = this.configService.getTableFields();
  extraFields = this.configService.getExtraFields();

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity: AppUser;
    project?: AppProject;
    organization?: AppOrganization;
    userFullList: AppUser[];
  };

  formFields = this.configService.getFormFields();

  private model = signal<PermissionForm>({
    ...this.dialogData.entity,
    email: this.dialogData.entity?.email ?? '',
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
    requiredField(schema.email);
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
    // this.configService.setLatestFormEntry(this.model());
    //
    // if (this.dialogData.mode === DialogMode.ADD) {
    //   await this.store.add(this.toCreateDtoModel(this.model()));
    // } else if (this.dialogData.mode === DialogMode.EDIT) {
    //   await this.store.update(this.toUpdateDtoModel(this.model()));
    // }
    //
    // if (this.store.error()) return;
    //
    // this.configService.setLatestFormEntry(null);
    // this.dialogRef.close();
    // this.navigateOnUpdateSuccess(this.model().login);
  }

  protected async handleDeleteAction(): Promise<void> {
    // await this.store.delete(this.dialogData.entity!);
    // this.configService.setLatestFormEntry(null);
    // this.dialogRef.close();
    // this.navigateOnDeleteSuccess();
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




  protected organizationAdapter: MatSelectAutocompleteAdapter<AppOrganization> = {
    value: o => o.id.toString(),
    label: o => o.name
  }

  protected projectAdapter: MatSelectAutocompleteAdapter<AppProject> = {
    value: o => o.id.toString(),
    label: o => o.projectName
  }
  // extends BaseEntityDialogComponent<AppUser> {
  // protected readonly DetailType = DetailType;
  // protected readonly DialogAction = DialogAction;
  //
  // override configService = inject(PermissionConfigService);
  // override dialogRef = inject(MatDialogRef<PermissionDialogService>);
  // override dialogData = inject(MAT_DIALOG_DATA) as {
  //   id: string;
  //   mode: DialogMode;
  //   entity: AppUser;
  //   project?: AppProject;
  //   organization?: AppOrganization;
  //   userFullList: Observable<AppUser[]>;
  // };
  //
  // override formFields = this.configService.getFormFields();
  //
  // override form = new FormGroup({
  //   email: new FormControl<string>( '', {nonNullable: true}),
  // })
  //
  // selectedUser = signal<AppUser | undefined>(undefined);

  selectedUser = computed(() => {
    const email = this.model().email;
    return this.dialogData.userFullList.find(e => e.email === email || e.login === email);//this.selectedUser.set(user);
  });
  //
  // usersFullList: AppUser[] = [];
  //
  // override ngOnInit() {
  //   this.dialogData.userFullList.subscribe(users => {
  //     this.usersFullList = users;
  //   })
  //   this.formFields = this.configService.getFormFields();
  //   this.form.patchValue(this.dialogData.entity);
  //   this.form.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
  //     if (value) {
  //       this.error.set(null);
  //       const email = this.form.value.email;
  //       const user = this.usersFullList.find(e => e.email === email || e.login === email);
  //       this.selectedUser.set(user);
  //     }
  //   })
  // }
  //
  // override handleSaveAction(): void {
  //   const selectedUser = this.selectedUser();
  //   if (!selectedUser) return;
  //
  //   const updatedEntity: AppUser = {...selectedUser};
  //   updatedEntity._roles = updatedEntity._roles ?? {};
  //
  //   if (this.dialogData.project) {
  //     updatedEntity._roles._projectAdmin = true;
  //     updatedEntity._roles._projects = updatedEntity._roles._projects ?? [];
  //     const selectedProject = this.dialogData.project; //{id: this.dialogData.project.id, _name: this.dialogData.project.projectName};
  //     updatedEntity._roles._projects.push(selectedProject);
  //   }
  //   if (this.dialogData.organization) {
  //     updatedEntity._roles._organizationAdmin = true;
  //     updatedEntity._roles._organizations = updatedEntity._roles._organizations ?? [];
  //     const selectedOrganization = this.dialogData.organization; //{id: this.dialogData.organization.id, _name: this.dialogData.organization.name};
  //     updatedEntity._roles._organizations.push(selectedOrganization);
  //   }
  //
  //   this.dialogActionEvent.emit({action: DialogMode.EDIT, entity: updatedEntity});
  // }
  //
  // override handleDeleteAction(): void {
  //   const updatedEntity: AppUser = {...this.dialogData.entity};
  //   updatedEntity._roles = updatedEntity._roles ?? {};
  //
  //   if (this.dialogData.project) {
  //     updatedEntity._roles._projects = updatedEntity._roles._projects?.filter(p => p.name !== this.dialogData.project?.projectName) ?? [];
  //     updatedEntity._roles._projectAdmin = updatedEntity._roles._projects.length > 0;
  //   }
  //   if (this.dialogData.organization) {
  //     updatedEntity._roles._organizations = updatedEntity._roles._organizations?.filter(o => o.name !== this.dialogData.organization?.name) ?? [];
  //     updatedEntity._roles._organizationAdmin = updatedEntity._roles._organizations?.length > 0;
  //   }
  //   this.dialogActionEvent.emit({action: DialogMode.EDIT, entity: updatedEntity});
  // }
}
