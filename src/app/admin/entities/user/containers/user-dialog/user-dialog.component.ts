import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { Validator } from '../../../../../shared/utils/validators';
import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
// import { LocaleService } from "../../../../../core/locale/services/locale.service";
import { AppUser } from "../../models/user";
import { AppProject } from "../../../project/models/project";
import { AppOrganization } from "../../../organization/models/organization";
import {Store} from "@ngrx/store";
import {locale} from "../../../../../core/locale/store/locale.selectors";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
  MatSelectAutocompleteComponent
} from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {Language} from '../../../../../shared/models/locale.model';

@Component({
  selector: 'rb-users-dialog',
  templateUrl: './user-dialog.component.html',
  imports: [
    DialogTitleComponent,
    MatDialogContent,
    AsyncPipe,
    DialogBodyDescriptionComponent,
    UserDetailsComponent,
    TranslatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSlideToggle,
    MatSelectAutocompleteComponent,
    ErrorMessageComponent,
    DialogActionsComponent,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf,
    MatInput
  ]
})
export class UserDialogComponent
  extends BaseDialogComponent<AppUser, UserDialogComponent>
  implements OnInit, OnDestroy
{
  override name = ENTITY_NAME.user;

  override form = new FormGroup({
    id: new FormControl({ value: undefined, disabled: true }),
    login: new FormControl<string | null>(null,[Validator.requiredValidator, Validator.normalTextValidator]),
    firstName: new FormControl<string | null>(null, [Validator.normalTextValidator]),
    lastName: new FormControl<string | null>(null, [Validator.normalTextValidator]),
    email: new FormControl<string | null>(null,[Validator.requiredValidator, Validator.emailValidator]),
    langKey: new FormControl<string | null>(null),
    _roles: new FormGroup({
      _sysAdmin: new FormControl<string | null>(null),
      _organizationAdmin: new FormControl<string | null>(null),
      _organizations: new FormControl<string | null>(null),
      _projectAdmin: new FormControl<string | null>(null),
      _projects: new FormControl<string | null>(null),
    }),
  });

  entities;// = this.data.entities;
  projects;// = this.data.projects;
  projectOptions;// = this.data.projects.map((project) => ({
    // ...project,
    // name: project.projectName,
  // }));
  organizations;// = this.data.organizations;
  organizationOptions;// = this.data.organizations;
  // languages = this.data.languages;
  locale$ = this.store?.select(locale);
  // locale$ = this.localeService?.locale$;
  // filteredServerSideProjects: ReplaySubject<RadarProjectDef[]> = new ReplaySubject<
  //   RadarProjectDef[]
  // >(1);

  constructor(
    router: Router,
    dialogRef: MatDialogRef<UserDialogComponent>,
    store: Store,
    // localeService: LocaleService,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: AppUser;
      entities: AppUser[];
      projects: AppProject[];
      organizations: AppOrganization[];
      languages: Language[];
    }
  ) {
    super(router, dialogRef, data, store);
    this.entities = this.data.entities;
    this.projects = this.data.projects;
    this.projectOptions = this.data.projects.map((project) => ({
      ...project,
      name: project.projectName,
    }));
    this.organizations = this.data.organizations;
    this.organizationOptions = this.data.organizations;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.form.controls.login?.addValidators(this.duplicateLoginValidator);
    this.form.controls.email?.addValidators(this.duplicateEmailValidator);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  private duplicateLoginValidator = (control: AbstractControl) => {
    return this.entities?.find(
      (entity) =>
        control.value === entity.login && this.entity?.login !== entity.login
    )
      ? { duplicate: true }
      : null;
  };

  private duplicateEmailValidator = (control: AbstractControl) => {
    return this.entities?.find(
      (entity) =>
        control.value === entity.email && this.entity?.email !== entity.email
    )
      ? { duplicate: true }
      : null;
  };
}
