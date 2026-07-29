import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ClientDetailsComponent} from '../../components/client-details/client-details.component';
import {ClientStore} from '../../services/client.store';

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
  protected store = inject(ClientStore);
}
