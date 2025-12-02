import {Component, effect, inject, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCard, MatCardContent} from "@angular/material/card";
import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
import {AppSubject} from '../../models/subject';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {SubjectDialogMode} from '../../enums/dialog';

@Component({
  selector: 'app-subject-details-page',
  templateUrl: './subject-details-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    SubjectDetailsComponent,
  ]
})
export class SubjectDetailsPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(SubjectConfigService);
  private dialogService = inject(SubjectDialogService);

  entity = signal(this.activatedRoute.snapshot.parent?.data['entity'] as AppSubject);
  tableFields = this.configService.getTableFields();

  constructor() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) {
        switch (updated.mode) {
          case SubjectDialogMode.EDIT:
            if (updated?.entity) {
              this.entity.set(updated.entity);
            }
            break;
        }
      }
    });
  }
}
