import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AppProject} from "../../models/project";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {ProjectConfigService} from '../../services/project-config.service';
import {ProjectDialogService} from '../../services/project-dialog.service';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../models/tab-link";
import {BaseEntityPageComponent} from '../../../../components/entity-page/base-entity-page.component';
import {ProjectActionsComponent} from '../../components/project-actions/project-actions.component';
import {hasChildEntity} from '../../../../services/util';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  imports: [
    PermissionDirective,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    MatButton,
    MatPrefix,
    TranslatePipe,
    ProjectActionsComponent,
    RouterLinkActive,
  ]
})
export class ProjectPageComponent extends BaseEntityPageComponent<AppProject> implements OnInit, OnDestroy {
  override configService = inject(ProjectConfigService);
  override dialogService = inject(ProjectDialogService);

  override entity = signal<AppProject>(this.activatedRoute.snapshot.data['project']);

  links: TabLink[] = [
    { path: 'subjects', label: `ADMIN.${ENTITY_REGISTRY.subject.name}.title.plural` },
    { path: 'groups', label: `ADMIN.${ENTITY_REGISTRY.group.name}.title.plural` },
    { path: 'sources', label: `ADMIN.${ENTITY_REGISTRY.source.name}.title.plural` },
    { path: 'app-config', label: `ADMIN.${ENTITY_REGISTRY.appConfig.name}.title.plural` },
    { path: 'protocols', label: `ADMIN.${ENTITY_REGISTRY.protocol.name}.title.plural` },
    { path: 'users', label: `ADMIN.${ENTITY_REGISTRY.permission.name}.title.plural`},
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.project.name}.details` },
  ];

  hasSubject = hasChildEntity(this.router.routerState.snapshot.root, 'subject');

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override navigateOnUpdateSuccess(entity: AppProject) {
    this.router.navigate(['../', entity._name], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined
    }).then();
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'organizations']).then();
  }
}
