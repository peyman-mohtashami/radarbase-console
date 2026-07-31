import {
  Component,
  inject, OnDestroy,
} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {SourceTypeActionsComponent} from '../../components/source-type-actions/source-type-actions.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {TabLink} from '../../../../base-entities/models/tab-link';
import {ENTITY_REGISTRY} from '../../../../../shared/consts/entity-registry';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {SourceTypeStore} from '../../services/source-type.store';

@Component({
  selector: 'app-source-type-page',
  templateUrl: './source-type-page.component.html',
  imports: [
    TranslatePipe,
    SourceTypeActionsComponent,
    RouterLink,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLinkActive,
    RouterOutlet,
    MatButton,
    MatIcon,
  ]
})
export class SourceTypePageComponent implements OnDestroy {
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected store = inject(SourceTypeStore);

  links: TabLink[] = [
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.sourceType.name}.details` },
  ];

  ngOnDestroy() {
    this.store.selected.set(null);
  }
}
