import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NavigationEnd, RouterLink, RouterOutlet} from '@angular/router';

import {AppProject} from "../../models/project";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {filter} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ROLES} from "../../../../../shared/enums/roles";
import {ProjectConfigService} from '../../services/project-config.service';
import {ProjectDialogService} from '../../services/project-dialog.service';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../models/tab-link";
import {BaseEntityPageComponent} from '../../../../components/entity-page/base-entity-page.component';
import {ProjectActionsComponent} from '../../components/project-actions/project-actions.component';

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
  ]
})
export class ProjectPageComponent extends BaseEntityPageComponent<AppProject> implements OnInit, OnDestroy {
  override configService = inject(ProjectConfigService);
  override dialogService = inject(ProjectDialogService);

  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

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

  activePath?: string;

  hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot?.params?.['id'];


  ngOnInit(): void {
    // if (this.sourceTypes.find(sourceType => sourceType._name === '') === undefined &&) {

    // }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe(() => {
      this.hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot.params['id'];
    });
    this.activePath = this.activatedRoute.firstChild?.snapshot?.url?.[0]?.path;

    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  // private initializeDialogEffect() {
  //   effect(() => {
  //     const updated = this.dialogService.dialogUpdateEvent();
  //     if (updated) {
  //       switch (updated.mode) {
  //         case DialogMode.EDIT:
  //           if (updated?.entity) {
  //             this.entity.set(updated.entity);
  //             this.navigateOnUpdateSuccess(updated.entity);
  //           }
  //           break;
  //         case DialogMode.DELETE:
  //           this.navigateOnDeleteSuccess();
  //           break;
  //       }
  //     }
  //   })
  // }


  override navigateOnUpdateSuccess(entity: AppProject) {
    this.router
      .navigate(['/admin', 'projects', entity.projectName, 'subjects'])
      .then();
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'organizations']).then();
  }

  override getDialogData(entity?: AppProject) {
    return {
      entity: entity,
      // entities: this.entities(),
      // organization: this.organization,
      // projects: this.projectFullList,
      // organizations: this.organizationFullList,
      // sourceTypes: this.sourceTypeFullList
    }
  }
}
