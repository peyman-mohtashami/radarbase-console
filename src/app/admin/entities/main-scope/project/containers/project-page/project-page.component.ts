import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AppProject, RadarProject} from "../../models/project";
import {PermissionDirective} from "../../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {ProjectConfigService} from '../../services/project-config.service';
import {ProjectDialogService} from '../../services/project-dialog.service';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {ENTITY_REGISTRY} from "../../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../../base-entities/models/tab-link";
import {BaseEntityPageComponent} from '../../../../../base-entities/containers/entity-page/base-entity-page.component';
import {ProjectActionsComponent} from '../../components/project-actions/project-actions.component';
import {MatIcon} from '@angular/material/icon';

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
    MatIcon,
  ]
})
export class ProjectPageComponent extends BaseEntityPageComponent<AppProject, RadarProject> implements OnInit, OnDestroy {
  override configService = inject(ProjectConfigService);
  override dialogService = inject(ProjectDialogService);

  override entity = signal<AppProject>(this.activatedRoute.snapshot.data['project']);

  links: TabLink[] = [];

  hasSubject = this.selectedEntitiesService.selectedSubject;

  ngOnInit() {
    const protocolAndQuestionnaireTabLinks =
      this.entity().sourceTypes?.find(s => s.producer === 'RADAR' && s.model === 'aRMT') ?
        [
          { path: 'protocols', label: `ADMIN.${ENTITY_REGISTRY.protocol.name}.title.plural` },
          { path: 'questionnaires', label: `ADMIN.${ENTITY_REGISTRY.questionnaire.name}.title.plural` }
        ] : [];

    this.links = [
      ...[
        { path: 'subjects', label: `ADMIN.${ENTITY_REGISTRY.subject.name}.title.plural` },
        { path: 'groups', label: `ADMIN.${ENTITY_REGISTRY.group.name}.title.plural` },
        { path: 'sources', label: `ADMIN.${ENTITY_REGISTRY.source.name}.title.plural` },
        { path: 'app-config', label: `ADMIN.${ENTITY_REGISTRY.appConfig.name}.title.plural` }
      ],
      ...protocolAndQuestionnaireTabLinks,
      ...[
        { path: 'users', label: `ADMIN.${ENTITY_REGISTRY.permission.name}.title.plural`},
        { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.project.name}.details` }
      ],
    ];
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
