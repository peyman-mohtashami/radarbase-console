import {Component, DestroyRef, inject, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

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
import {filter, startWith} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ROLES} from '../../../../../../shared/enums/roles';

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
export class ProjectPageComponent extends BaseEntityPageComponent<AppProject, RadarProject> {
  override configService = inject(ProjectConfigService);
  override dialogService = inject(ProjectDialogService);
  private destroyRef = inject(DestroyRef);

  override entity = signal<AppProject>(this.activatedRoute.snapshot.data['project']);

  links: TabLink[] = [];

  // hasSubject = this.selectedEntitiesService.getSelected().subject;
  // subjectId = this.activatedRoute.snapshot.paramMap.get('subjectId');
  subjectId: string | null = null;

  override ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let route: ActivatedRoute = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      switchMap((route) => route.paramMap),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((paramMap) => {
      console.log('Child route params:', paramMap);
      this.subjectId = paramMap.get('subjectId');
    });

    super.ngOnInit();
  }

  override updateTabLinks(_entity?: AppProject) {
    const protocolAndQuestionnaireTabLinks =
      (_entity ?? this.entity()).sourceTypes?.find(s => s.producer === 'RADAR' && s.model === 'aRMT-App') ?
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
