import {Component, inject, input, output} from '@angular/core';
import {DialogMode} from "../../../../enums/dialog";
import {AppProject} from "../../models/project";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {AppOrganization} from '../../../organization/models/organization';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    TranslatePipe
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = DialogMode;

  entity$ = input.required<AppProject>();
  isExpanded$ = input<boolean>(true);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onAction(mode: DialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/project/${this.entity$().id}`
    }).then()
  }
}
