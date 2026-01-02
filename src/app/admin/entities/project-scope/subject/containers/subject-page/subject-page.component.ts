import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {PermissionDirective} from "../../../../../../core/auth/directives/show-if-has-role.directive";
import {AppSubject, RadarSubject} from '../../models/subject';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {AppProject} from '../../../../main-scope/project/models/project';
import {AppOrganization} from '../../../../main-scope/organization/models/organization';
import {TabLink} from "../../../../../base-entities/models/tab-link";
import {BaseEntityPageComponent} from '../../../../../base-entities/containers/entity-page/base-entity-page.component';
import {SubjectActionsComponent} from '../../components/subject-actions/subject-actions.component';
import {MatIcon} from '@angular/material/icon';
import {ENTITY_REGISTRY} from '../../../../../../shared/consts/entity-registry';

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
    MatPrefix,
    TranslatePipe,
    SubjectActionsComponent,
    RouterLinkActive,
    MatIcon,
  ]
})
export class SubjectPageComponent extends BaseEntityPageComponent<AppSubject, RadarSubject> implements OnInit, OnDestroy {
  override configService = inject(SubjectConfigService);
  override dialogService = inject(SubjectDialogService);

  links: TabLink[] = [
    { path: 'download', label: `ADMIN.${ENTITY_REGISTRY.dataDownload.name}.title.plural` },
    { path: 'data', label: `ADMIN.${ENTITY_REGISTRY.dataVisualization.name}.title.plural` },
    { path: 'compliance', label: `ADMIN.${ENTITY_REGISTRY.dataCompliance.name}.title.plural` },
    { path: 'app-config', label: `ADMIN.${ENTITY_REGISTRY.appConfig.name}.title.plural` },
    { path: 'protocols', label: `ADMIN.${ENTITY_REGISTRY.protocol.name}.title.plural` },
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.subject.name}.details` },
  ];

  override entity = signal<AppSubject>(this.activatedRoute.snapshot.data['subject']);
  project?: AppProject = this.selectedEntitiesService.selectedProject();
  organization?: AppOrganization = this.selectedEntitiesService.selectedOrganization();

  ngOnInit(): void {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
