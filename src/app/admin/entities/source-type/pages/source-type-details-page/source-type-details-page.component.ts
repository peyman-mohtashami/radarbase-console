import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {SourceTypeDetailsComponent} from '../../components/source-type-details/source-type-details.component';
import {SourceTypeStore} from '../../services/source-type.store';

@Component({
  selector: 'app-source-type-details-page',
  templateUrl: './source-type-details-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    SourceTypeDetailsComponent,
  ]
})
export class SourceTypeDetailsPageComponent {
  protected store = inject(SourceTypeStore);
}
