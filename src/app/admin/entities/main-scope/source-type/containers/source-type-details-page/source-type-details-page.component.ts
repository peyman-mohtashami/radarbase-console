import {Component, effect, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {SourceTypeDetailsComponent} from '../../components/source-type-details/source-type-details.component';
import {ActivatedRoute} from '@angular/router';
import {AppSourceType} from '../../models/source-type';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';

@Component({
  selector: 'app-source-type-details-page',
  templateUrl: './source-type-details-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatCard,
    MatCardContent,
    SourceTypeDetailsComponent,
  ]
})
export class SourceTypeDetailsPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(SourceTypeConfigService);
  private dialogService = inject(SourceTypeDialogService);


  entity = signal<AppSourceType>(this.activatedRoute.snapshot.parent!.data['sourceType']!);
  tableFields = this.configService.getTableFields();

  constructor() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated.entity) {
              this.entity.set(updated.entity);
            }
            break;
        }
      }
    });
  }
}
