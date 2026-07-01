import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../../base-entities/enums/dialog";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {MatTooltip} from "@angular/material/tooltip";
import {ConfigConfigService} from "../../services/config-config.service";
import {AppConfig} from "../../models/config";
import {MatIcon} from '@angular/material/icon';
import {ConfigDialogService} from '../../services/config-dialog.service';

@Component({
  selector: 'app-config-actions',
  templateUrl: './config-actions.component.html',
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
export class ConfigActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(ConfigConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogService = inject(ConfigDialogService);

  entity = input.required<AppConfig>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: DialogMode) {
    this.dialogService.openDialog(mode, this.entity());
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParamsHandling: 'preserve',
    //   fragment: `/${mode}/${this.entityName}/${this.entity().id}`
    // }).then()
  }
}
