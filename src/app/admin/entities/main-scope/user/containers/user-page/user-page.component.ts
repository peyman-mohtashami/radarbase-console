import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {AppUser, RadarUser} from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatPrefix} from '@angular/material/input';
import {BaseEntityPageComponent} from '../../../../../base-entities/containers/entity-page/base-entity-page.component';
import {UserActionsComponent} from '../../components/user-actions/user-actions.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TabLink} from '../../../../../base-entities/models/tab-link';
import {ENTITY_REGISTRY} from '../../../../../../shared/consts/entity-registry';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  imports: [
    TranslatePipe,
    UserDetailsComponent,
    MatPrefix,
    MatCard,
    MatCardContent,
    MatPrefix,
    UserActionsComponent,
    RouterLink,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLinkActive,
    RouterOutlet,
  ]
})
export class UserPageComponent extends BaseEntityPageComponent<AppUser, RadarUser> implements OnInit, OnDestroy {
  override configService = inject(UserConfigService);
  override dialogService = inject(UserDialogService);

  override entity = signal<AppUser>(this.activatedRoute.snapshot.data['user']);

  links: TabLink[] = [
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.user.name}.details` },
  ];

  ngOnInit(): void {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
