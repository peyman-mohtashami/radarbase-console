import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {MatTooltip} from "@angular/material/tooltip";
import {AppProtocol} from "../../models/protocol";
import {ProtocolConfigService} from "../../services/protocol-config.service";

@Component({
  selector: 'app-protocol-actions',
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

  private configService = inject(ProtocolConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entity = input.required<AppProtocol>();
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
