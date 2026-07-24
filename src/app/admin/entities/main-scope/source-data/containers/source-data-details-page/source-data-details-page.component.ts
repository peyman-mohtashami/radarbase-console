import {Component, effect, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {SourceDataDetailsComponent} from '../../components/source-data-details/source-data-details.component';
import {ActivatedRoute} from '@angular/router';
import {AppSourceData} from '../../models/source-data';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';

@Component({
  selector: 'app-source-data-details-page',
  templateUrl: './source-data-details-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatCard,
    MatCardContent,
    SourceDataDetailsComponent,
  ]
})
export class SourceDataDetailsPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(SourceDataConfigService);
  private dialogService = inject(SourceDataDialogService);

  entity = signal<AppSourceData>(this.activatedRoute.snapshot.parent!.data['sourceData']!);

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
