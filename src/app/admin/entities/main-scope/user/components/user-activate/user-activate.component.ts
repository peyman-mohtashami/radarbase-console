import {Component, inject, input} from '@angular/core';
import { AppUser } from "../../models/user";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  imports: [
    MatIconButton,
    MatIcon,
  ]
})
export class UserActivateComponent {
  entity = input.required<AppUser>();

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onAction() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/activate/user/${this.entity()._name}`
    }).then()
  }
}
