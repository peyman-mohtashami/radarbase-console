import {AfterViewInit, Component, effect, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import {ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';
import {AppUser} from "../../models/user";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {TranslatePipe} from "@ngx-translate/core";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {DialogMode} from '../../../../enums/dialog';
import {PermissionDialogService} from '../../services/permission-dialog.service';
import {PermissionConfigService} from '../../services/permission-config.service';
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';

@Component({
  selector: 'rb-permission-dialog',
  templateUrl: './permission-dialog.component.html',
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

  ]
})
export class PermissionDialogComponent implements OnInit, AfterViewInit {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly DialogMode = DialogMode;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  private configService = inject(PermissionConfigService);
  private dialogRef = inject(MatDialogRef<PermissionDialogService>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: DialogMode;
    entity: AppUser;
    entities: AppUser[];
    project?: AppProject;
    organization?: AppOrganization;
  };

  formFields = this.configService.getFormFields();

  form = new FormGroup({
    email: new FormControl<string | undefined>( undefined, {nonNullable: true}),
  })

  loading$ = signal(false);
  error$ = signal<HttpErrorResponse | null>(null);

  selectedUser$ = signal<AppUser | undefined>(undefined);

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
        console.log('Class: UserDialogComponent, Function: , Line 108 this.form.value' , this.form.value);
        const email = this.form.value.email;
        this.selectedUser$.set(this.dialogData.entities.find(e => e.email === email || e.login === email));

      }
    });
  }

  ngOnInit() {
    this.form?.patchValue({...this.dialogData.entity});
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
    const selectedUser = this.selectedUser$();
    if (!selectedUser) return;

    const updatedEntity: AppUser = {...selectedUser};
    updatedEntity._roles = updatedEntity._roles ?? {};

    if (this.dialogData.project) {
      updatedEntity._roles._projectAdmin = true;
      updatedEntity._roles._projects = updatedEntity._roles._projects ?? [];
      const selectedProject = {id: this.dialogData.project.id, name: this.dialogData.project.projectName};
      updatedEntity._roles._projects.push(selectedProject);
    }
    if (this.dialogData.organization) {
      updatedEntity._roles._organizationAdmin = true;
      updatedEntity._roles._organizations = updatedEntity._roles._organizations ?? [];
      const selectedOrganization = {id: this.dialogData.organization.id, name: this.dialogData.organization.name};
      updatedEntity._roles._organizations.push(selectedOrganization);
    }

    this.dialogActionEvent.emit({action: DialogMode.EDIT, entity: updatedEntity});
  }

  private handleDeleteAction(): void {
    const updatedEntity: AppUser = {...this.dialogData.entity};
    updatedEntity._roles = updatedEntity._roles ?? {};

    if (this.dialogData.project) {
      updatedEntity._roles._projects = updatedEntity._roles._projects?.filter(p => p.name !== this.dialogData.project?.projectName) ?? [];
      updatedEntity._roles._projectAdmin = updatedEntity._roles._projects.length > 0;
    }
    if (this.dialogData.organization) {
      updatedEntity._roles._organizations = updatedEntity._roles._organizations?.filter(o => o.name !== this.dialogData.organization?.name) ?? [];
      updatedEntity._roles._organizationAdmin = updatedEntity._roles._organizations?.length > 0;
    }
    this.dialogActionEvent.emit({action: DialogMode.EDIT, entity: updatedEntity});
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
