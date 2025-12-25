import {Component, effect, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {ClientDetailsComponent} from '../../components/client-details/client-details.component';
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

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
  private configService = inject(ClientConfigService);
  private dialogService = inject(ClientDialogService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  entity = this.selectedEntitiesService.selectedClient;
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
