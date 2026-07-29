import {Component, effect, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {SourceDataDetailsComponent} from '../../components/source-data-details/source-data-details.component';
import {ActivatedRoute} from '@angular/router';
import {AppSourceData} from '../../models/source-data';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {SourceDataStore} from '../../services/source-data.store';

@Component({
  selector: 'app-source-data-details-page',
  templateUrl: './source-data-details-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    SourceDataDetailsComponent,
  ]
})
export class SourceDataDetailsPageComponent {
  protected store = inject(SourceDataStore);
}
