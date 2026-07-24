import {Component, inject, input, ChangeDetectionStrategy} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppClient} from '../../models/client';
import {MatTooltip} from "@angular/material/tooltip";
import {ClientConfigService} from "../../services/client-config.service";
import {MatIcon} from '@angular/material/icon';
import {ClientDialogService} from '../../services/client-dialog.service';

@Component({
  selector: 'app-client-actions',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger,
    MatTooltip,
    MatIcon,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './client-actions.component.html',
})
export class ClientActionsComponent {
  protected readonly DialogMode = DialogMode;

  private configService = inject(ClientConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogService = inject(ClientDialogService);

  entity = input.required<AppClient>();
  isExpanded = input<boolean>(true);

  entityName = this.configService.getEntityMetadata().name;

  onAction(mode: DialogMode) {
    this.dialogService.openDialog(mode, this.entity());
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParamsHandling: 'preserve',
    //   fragment: `/${mode}/${this.entityName}/${this.entity().clientId}`
    // }).then()
  }
}
