import {Component, inject, input, Input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../enums/dialog';
import {AppSourceData} from '../../models/source-data';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-actions',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger
  ],
  templateUrl: './actions.component.html',
})
export class ActionsComponent {

  protected readonly DialogMode = DialogMode;

  entity = input.required<AppSourceData>();
  isExpanded = input<boolean>(true);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onAction(mode: DialogMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      fragment: `/${mode}/sourceData/${this.entity().id}`
    }).then()
  }
}
