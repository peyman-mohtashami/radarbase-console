import {Component, inject, input, output} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AppSubject } from "../../models/subject";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AppProject} from '../../../project/models/project';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-subject-assign-group',
  templateUrl: './subject-assign-group.component.html',
  imports: [
    MatButton,
    MatIcon,
    TranslatePipe
  ]
})
export class SubjectAssignGroupComponent {
  selection = input<SelectionModel<AppSubject>>(new SelectionModel<AppSubject>(true, []));
  project = input.required<AppProject>();

  private dialogService = inject(SubjectDialogService);

  updateTrigger = output<string>();

  assignGroupToSubjects(e?: Event) {
    e?.stopPropagation();

    if (this.selection().selected.length) {
      const subjects = this.selection().selected.map((s) => {
        return { login: s.login };
      });
      return this.dialogService.openAssignGroupToSubjectsDialog(subjects, this.project())
    }
  }
}
