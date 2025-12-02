import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../enums/dialog';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from '../../models/user';
import {MatTooltip} from "@angular/material/tooltip";
import {OrganizationConfigService} from "../../../organization/services/organization-config.service";

@Component({
  selector: 'app-user-actions',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip
  ],
  templateUrl: './actions.component.html',
})
export class ActionsComponent {

  protected readonly DialogMode = DialogMode;

  private configService = inject(OrganizationConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entity = input.required<AppUser>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: DialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/${this.entityName}/${this.entity().id}`
    }).then()
  }
}
