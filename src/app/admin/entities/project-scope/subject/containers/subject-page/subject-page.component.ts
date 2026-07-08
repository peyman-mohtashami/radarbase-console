import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {PermissionDirective} from "../../../../../../core/auth/directives/show-if-has-role.directive";
import {AppSubject, RadarSubject} from '../../models/subject';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {TabLink} from "../../../../../base-entities/models/tab-link";
import {BaseEntityPageComponent} from '../../../../../base-entities/containers/entity-page/base-entity-page.component';
import {SubjectActionsComponent} from '../../components/subject-actions/subject-actions.component';
import {MatIcon} from '@angular/material/icon';
import {ENTITY_REGISTRY} from '../../../../../../shared/consts/entity-registry';
import {findRouteData} from '../../../../main-scope/organization/services/organization.service';

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
export class SubjectPageComponent extends BaseEntityPageComponent<AppSubject, RadarSubject> {
  override configService = inject(SubjectConfigService);
  override dialogService = inject(SubjectDialogService);

  links: TabLink[] = [];

  override entity = signal<AppSubject>(this.activatedRoute.snapshot.data['subject']);
  project = findRouteData(this.activatedRoute, 'project');
  organization = findRouteData(this.activatedRoute, 'organization');

  override ngOnInit(): void {
    const protocolAndQuestionnaireTabLinks =
      this.entity().project?.sourceTypes?.find(s => s.producer === 'RADAR' && s.model === 'aRMT-App') ?
        [
          // { path: 'protocols', label: `ADMIN.${ENTITY_REGISTRY.protocol.name}.title.plural` },
          { path: 'questionnaires', label: `ADMIN.${ENTITY_REGISTRY.questionnaire.name}.title.plural` }
        ] : [];

    this.links = [
      ...[
        { path: 'download', label: `ADMIN.${ENTITY_REGISTRY.dataDownload.name}.title.plural` },
        { path: 'data', label: `ADMIN.${ENTITY_REGISTRY.dataVisualization.name}.title.plural` },
        { path: 'compliance', label: `ADMIN.${ENTITY_REGISTRY.dataCompliance.name}.title.plural` },
        { path: 'app-config', label: `ADMIN.${ENTITY_REGISTRY.appConfig.name}.title.plural` },
      ],
      ...protocolAndQuestionnaireTabLinks,
      ...[
        { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.subject.name}.details` },
      ],
    ];
    super.ngOnInit();
  }
}
