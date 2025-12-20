import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {AppSubject} from '../../models/subject';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {AppProject} from '../../../project/models/project';
import {ActionsComponent} from '../../components/actions/actions.component';
import {AppOrganization} from '../../../organization/models/organization';
import {ROLES} from "../../../../../shared/enums/roles";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../models/tab-link";
import {BaseEntityPageComponent} from '../../../../components/entity-page/base-entity-page.component';

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
    ActionsComponent,
  ]
})
export class SubjectPageComponent extends BaseEntityPageComponent<AppSubject> implements OnInit, OnDestroy {
  override configService = inject(SubjectConfigService);
  override dialogService = inject(SubjectDialogService);

  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  links: TabLink[] = [
    { path: 'download', label: 'Download' },
    { path: 'data', label: 'Data' },
    { path: 'compliance', label: 'Compliance' },
    { path: 'app-config', label: 'App Configs' },
    { path: 'details', label: 'Details' },
  ];

  activePath?: string;

  override entity = signal<AppSubject>(this.activatedRoute.snapshot.data['subject']);
  project?: AppProject = this.activatedRoute.parent?.parent?.snapshot?.data['entity'];
  organization?: AppOrganization = this.activatedRoute.parent?.parent?.parent?.parent?.snapshot?.data['organization'];

  ngOnInit(): void {
    super.init();
    this.activePath = this.activatedRoute.firstChild?.snapshot?.url?.[0]?.path;
  }

  ngOnDestroy() {
    super.destroy();
  }

  override navigateOnUpdateSuccess(entity: AppSubject) {
    const lastSegment = this.activatedRoute.firstChild?.snapshot.url[this.activatedRoute.firstChild?.snapshot.url.length - 1].path;
    this.router.navigate([
      '/admin',
      'organizations',
      this.organization?.name,
      'projects',
      this.project?.projectName,
      'subjects',
      entity.login,
      lastSegment
    ], {fragment: undefined}).then();
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate([
      '/admin',
      'organizations',
      this.organization?.name,
      'projects',
      this.project?.projectName,
      'subjects',
    ], {fragment: undefined}).then();
  }
}
