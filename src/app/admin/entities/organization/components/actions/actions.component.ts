import {Component, inject, input} from '@angular/core';
import {AppOrganization} from "../../models/organization";
import {DialogMode} from "../../../../enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {MatTooltip} from "@angular/material/tooltip";
import {OrganizationConfigService} from "../../services/organization-config.service";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-organization-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton,
    MatTooltip,
    MatIcon
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(OrganizationConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entity = input.required<AppOrganization>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: DialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/${this.entityName}/${this.entity().name}`
    }).then()
  }
}
