import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {UserDetailsComponent} from '../../components/user-details/user-details.component';
import {UserStore} from '../../services/user.store';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  imports: [
    MatCard,
    MatCardContent,
    UserDetailsComponent,
  ]
})
export class UserDetailsPageComponent {
  protected store = inject(UserStore);
}
