import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../enums/dialog";
import {AppProject} from "../../models/project";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {MatTooltip} from "@angular/material/tooltip";
import {ProjectConfigService} from "../../services/project-config.service";

@Component({
  selector: 'app-project-actions',
  templateUrl: './actions.component.html',
  imports: [
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    TranslatePipe,
    MatTooltip
  ]
})
export class ActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(ProjectConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entity = input.required<AppProject>();
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
