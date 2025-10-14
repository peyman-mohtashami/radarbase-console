import {Component, effect, inject, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatCard, MatCardContent} from "@angular/material/card";
import {DialogMode} from '../../../../enums/dialog';
import {ClientDetailsComponent} from '../../components/client-details/client-details.component';
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {AppClient} from '../../models/client';

@Component({
  selector: 'rb-client-details-page',
  templateUrl: './client-details-page.component.html',
  imports: [
    LoaderComponent,
    TranslatePipe,
    MatCard,
    MatCardContent,
    ClientDetailsComponent,
    // ClientDetailsComponent
  ]
})
export class ClientDetailsPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private configService = inject(ClientConfigService);
  private dialogService = inject(ClientDialogService);

  loading = false;
  entity$ = signal(this.activatedRoute.snapshot.parent?.data['entity'] as AppClient);
  tableFields = this.configService.getTableFields();

  constructor() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated?.entity) {
              this.entity$.set(updated.entity);
            }
            break;
        }
      }
    });
  }
}
