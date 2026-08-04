import {Component, inject, OnDestroy} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {SubjectConfigService} from '../../services/subject-config.service';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {TabLink} from "../../../../shared/models/tab-link";
import {SubjectActionsComponent} from '../../components/subject-actions/subject-actions.component';
import {MatIcon} from '@angular/material/icon';
import {ENTITY_REGISTRY} from '../../../../../shared/consts/entity-registry';
import {SubjectStore} from '../../services/subject.store';
import {ROLES} from '../../../../../shared/enums/roles';
import {ProjectStore} from '../../../project/services/project.store';
import {OrganizationStore} from '../../../organization/services/organization.store';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  imports: [
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    PermissionDirective,
    MatButton,
    TranslatePipe,
    SubjectActionsComponent,
    RouterLinkActive,
    MatIcon,
  ]
})
export class SubjectPageComponent implements OnDestroy {
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected store = inject(SubjectStore);
  protected projectStore = inject(ProjectStore);
  protected organizationStore = inject(OrganizationStore);
  configService = inject(SubjectConfigService);

  links: TabLink[] = [
    ...[
      { path: 'download', label: `ADMIN.${ENTITY_REGISTRY.dataDownload.name}.title.plural` },
      { path: 'data', label: `ADMIN.${ENTITY_REGISTRY.dataVisualization.name}.title.plural` },
      { path: 'compliance', label: `ADMIN.${ENTITY_REGISTRY.dataCompliance.name}.title.plural` },
      { path: 'app-config', label: `ADMIN.${ENTITY_REGISTRY.appConfig.name}.title.plural` },
    ],
    ...this.questionnaireTab(),
    ...[
      { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.subject.name}.details` },
    ],
  ];

  questionnaireTab() {
    return this.store.selected()!.project?.sourceTypes?.find(s => s.producer === 'RADAR' && s.model === 'aRMT-App') ?
        [
          { path: 'questionnaires', label: `ADMIN.${ENTITY_REGISTRY.questionnaire.name}.title.plural` }
        ] : [];
  }

  ngOnDestroy() {
    this.store.selected.set(null);
  }
}
