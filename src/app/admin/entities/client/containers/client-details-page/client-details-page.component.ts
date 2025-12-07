import {Component, effect, inject, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCard, MatCardContent} from "@angular/material/card";
import {DialogMode} from '../../../../enums/dialog';
import {ClientDetailsComponent} from '../../components/client-details/client-details.component';
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {AppClient} from '../../models/client';

@Component({
  selector: 'app-client-details-page',
  templateUrl: './client-details-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    ClientDetailsComponent,
  ]
})
export class ClientDetailsPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(ClientConfigService);
  private dialogService = inject(ClientDialogService);

  entity = signal(this.activatedRoute.snapshot.parent?.data['entity'] as AppClient);
  tableFields = this.configService.getTableFields();

  constructor() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated?.entity) {
              this.entity.set(updated.entity);
            }
            break;
        }
      }
    });
  }
}
