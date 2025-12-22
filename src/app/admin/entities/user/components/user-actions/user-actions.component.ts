import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../enums/dialog';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from '../../models/user';
import {MatTooltip} from "@angular/material/tooltip";
import {UserConfigService} from '../../services/user-config.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-user-actions',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip,
    MatIcon,
  ],
  templateUrl: './user-actions.component.html',
})
export class UserActionsComponent {

  protected readonly DialogMode = DialogMode;

  private configService = inject(UserConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entity = input.required<AppUser>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: DialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/${this.entityName}/${this.entity()._name}`
    }).then()
  }
}
