import {Component, inject, input, output} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AppSubject } from "../../models/subject";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {TranslatePipe} from '@ngx-translate/core';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-subject-assign-group',
  templateUrl: './subject-assign-group.component.html',
  imports: [
    MatButton,
    MatIcon,
    TranslatePipe,
    // AsyncPipe
  ]
})
export class SubjectAssignGroupComponent {
  selection = input<SelectionModel<AppSubject>>(new SelectionModel<AppSubject>(true, []));

  private dialogService = inject(SubjectDialogService);

  updateTrigger = output<string>();

  assignGroupToSubjects(e?: Event) {
    e?.stopPropagation();
    if (this.selection().selected.length === 0) return;

    const subjects = this.selection().selected.map((s) => {
      return { login: s.login };
    });
    return this.dialogService.openAssignGroupToSubjectsDialog(subjects)
  }
}
