import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {AppSource} from '../../models/source';
import {MatTooltip} from "@angular/material/tooltip";
import {SourceConfigService} from '../../services/source-config.service';

@Component({
  selector: 'app-source-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatIconButton,
    MatTooltip
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(SourceConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entity = input.required<AppSource>();
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
