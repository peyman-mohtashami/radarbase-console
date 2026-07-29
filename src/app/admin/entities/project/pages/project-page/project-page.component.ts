import {
  Component,
  inject,
} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AppProject} from "../../models/project";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {ProjectConfigService} from '../../services/project-config.service';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../base-entities/models/tab-link";
import {ProjectActionsComponent} from '../../components/project-actions/project-actions.component';
import {ROLES} from '../../../../../shared/enums/roles';
import {ProjectStore} from '../../services/project.store';
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
    TranslatePipe,
    ProjectActionsComponent,
    RouterLinkActive,
    MatIcon,
  ]
})
export class ProjectPageComponent {
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected projectStore = inject(ProjectStore);
  // protected subjectStore = inject(SubjectStore);

  configService = inject(ProjectConfigService);


  links: TabLink[] = [];

  subjectId: string | null = null;


  updateTabLinks(_entity?: AppProject) {
    const protocolAndQuestionnaireTabLinks =
      (_entity ?? this.projectStore.selected()!).sourceTypes?.find(s => s.producer === 'RADAR' && s.model === 'aRMT-App') ?
        [
          // { path: 'protocols', label: `ADMIN.${ENTITY_REGISTRY.protocol.name}.title.plural` },
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
  }
}
