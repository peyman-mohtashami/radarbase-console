import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../enums/dialog';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSourceType} from '../../models/source-type';
import {MatTooltip} from "@angular/material/tooltip";
import {SourceTypeConfigService} from "../../services/source-type-config.service";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-source-type-actions',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip,
    MatIcon
  ],
  templateUrl: './source-type-actions.component.html',
})
export class SourceTypeActionsComponent {

  protected readonly DialogMode = DialogMode;

  private configService = inject(SourceTypeConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entity = input.required<AppSourceType>();
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
