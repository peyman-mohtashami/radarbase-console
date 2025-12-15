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
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import { AppSubject } from "../../models/subject";
import { AppGroup } from "../../../group/models/group";
import {TranslatePipe} from "@ngx-translate/core";
import {
  MatSelectAutocompleteComponent
} from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {DetailType} from '../../../../enums/detail-type';
import {ValidatorError, ValidatorHint} from '../../../../../shared/utils/validators';

@Component({
  selector: 'app-subject-dialog-assign-group-dialog',
  templateUrl: './subject-dialog-assign-group.component.html',
  imports: [
    TranslatePipe,
    MatIconButton,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatSelectAutocompleteComponent,
    MatButton,
    MatDialogClose,
    MatIcon,
    MatProgressSpinner
  ]
})
export class SubjectDialogAssignGroupComponent implements OnInit, AfterViewInit {
  private configService = inject(SubjectConfigService);
  private dialogRef = inject(MatDialogRef<SubjectDialogAssignGroupComponent>);
  public dialogData = inject(MAT_DIALOG_DATA) as {
    mode: string;
    entity: AppSubject;
    groups: AppGroup[];
  };

  protected readonly DialogMode = SubjectDialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  tableFields = this.configService.getTableFields();
  formFields = this.configService.getFormFields();

  form = new FormGroup({
    group: new FormControl<AppGroup | undefined>(undefined, {nonNullable: true})
  });

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  @Output()
  dialogActionEvent = new EventEmitter<{ group?: AppGroup }>();

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

  ngOnInit() {}

  ngAfterViewInit() {
    const dialogContainer = document.querySelector('.tailwind-slide-panel');
    setTimeout(() => {
      dialogContainer?.classList.add('dialog-enter-active');
    });
  }

  onAction() { //TODO DIALOG_ACTION
    this.error.set(null);
    this.loading.set(true);
    this.handleAssignAction();
  }

  private handleAssignAction(): void {
    this.dialogActionEvent.emit({
      group: this.form?.value.group,
    });
  }

  close() {
    this.loading.set(false);
    const container = document.querySelector('.tailwind-slide-panel');
    container?.classList.remove('dialog-enter-active');
    container?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({});
      this.dialogRef.close();
    }, 300);
  }

  errorHappened(error: HttpErrorResponse): void {
    this.loading.set(false);
    this.error.set(error);
  }
}
