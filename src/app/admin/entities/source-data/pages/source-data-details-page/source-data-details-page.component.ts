import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {SourceDataDetailsComponent} from '../../components/source-data-details/source-data-details.component';
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
