import {Component, effect, inject, signal} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {SubjectDetailsComponent} from "../../components/subject-details/subject-details.component";
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {findRouteData} from '../../../../main-scope/organization/services/organization.service';
import {ActivatedRoute} from '@angular/router';
import {AppSubject} from '../../models/subject';

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
  private configService = inject(SubjectConfigService);
  private dialogService = inject(SubjectDialogService);
  private activatedRoute = inject(ActivatedRoute);

  entity = signal<AppSubject>(findRouteData(this.activatedRoute, 'subject'));

  tableFields = this.configService.getTableFields();

  constructor() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent();
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
