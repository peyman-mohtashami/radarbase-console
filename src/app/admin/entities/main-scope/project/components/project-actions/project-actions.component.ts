import {Component, inject, input, ChangeDetectionStrategy} from '@angular/core';
import {DialogMode} from "../../../../../base-entities/enums/dialog";
import {AppProject} from "../../models/project";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router} from '@angular/router';
import {MatTooltip} from "@angular/material/tooltip";
import {ProjectConfigService} from "../../services/project-config.service";
import {MatIcon} from '@angular/material/icon';
import {ProjectDialogService} from '../../services/project-dialog.service';

@Component({
  selector: 'app-project-actions',
  templateUrl: './project-actions.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    TranslatePipe,
    MatTooltip,
    MatIcon
  ]
})
export class ProjectActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(ProjectConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogService = inject(ProjectDialogService);

  entity = input.required<AppProject>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: DialogMode) {
    this.dialogService.openDialog(mode, this.entity());
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParamsHandling: 'preserve',
    //   fragment: `/${mode}/${this.configService.getEntityMetadata().name}/${this.entity()._name}`
    // }).then()
  }
}
