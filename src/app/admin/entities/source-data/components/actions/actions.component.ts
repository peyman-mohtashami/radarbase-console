import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../enums/dialog';
import {AppSourceData} from '../../models/source-data';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SourceDataConfigService} from "../../services/source-data-config.service";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-source-data-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip,
    MatIcon
  ],
})
export class ActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(SourceDataConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entity = input.required<AppSourceData>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: DialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/${this.configService.getEntityMetadata().name}/${this.entity()._name}`
    }).then()
  }
}
