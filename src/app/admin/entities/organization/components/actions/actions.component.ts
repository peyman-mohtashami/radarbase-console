import {Component, inject, input} from '@angular/core';
import {AppOrganization} from "../../models/organization";
import {DialogMode} from "../../../../enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-organization-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = DialogMode;

  entity$ = input.required<AppOrganization>();
  isExpanded$ = input<boolean>(true);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onAction(mode: DialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/organization/${this.entity$().id}`
    }).then()
  }
}
