import {Component, effect, inject, OnDestroy, OnInit, signal, untracked} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DialogMode} from '../../../../enums/dialog';
import {AppSubject} from '../../models/subject';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {SubjectDialogMode} from '../../enums/dialog';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {AppProject} from '../../../project/models/project';
import {ActionsComponent} from '../../components/actions/actions.component';
import {AppOrganization} from '../../../organization/models/organization';
import {ROLES} from "../../../../../shared/enums/roles";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../models/tab-link";

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
export class SubjectPageComponent implements OnInit, OnDestroy {
  private configService = inject(SubjectConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(SubjectDialogService);

  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;

  links: TabLink[] = [
    { path: 'download', label: 'Download' },
    { path: 'data', label: 'Data' },
    { path: 'compliance', label: 'Compliance' },
    { path: 'app-config', label: 'App Configs' },
    { path: 'details', label: 'Details' },
  ];

  activePath?: string;

  entity = signal<AppSubject>(this.activatedRoute.snapshot.data['entity']);
  project?: AppProject = this.activatedRoute.parent?.parent?.snapshot?.data['entity'];
  organization?: AppOrganization = this.activatedRoute.parent?.parent?.parent?.parent?.snapshot?.data['organization'];

  tableFields = this.configService.getTableFields();

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    console.log('Class: SubjectPageComponent, Function: ngOnInit, Line 71 ' , );
    this.handleDialogUrlFragment();
    this.activePath = this.activatedRoute.firstChild?.snapshot?.url?.[0]?.path;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: SubjectDialogMode | string, entity?: AppSubject }) {
    switch (updated.mode) {
      case SubjectDialogMode.EDIT:
        if (updated?.entity) {
          this.entity.set(updated.entity);
        }
        this.removeFragmentUrl();
        break;
      case SubjectDialogMode.DELETE:
        this.navigateOnDeleteSuccess();
        break;
    }
  }

  private handleDialogUrlFragment() {
    console.log('Class: SubjectPageComponent, Function: handleDialogUrlFragment, Line 102 ' , );
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (fragment) this.processUrlFragment(fragment);
      });
  }

  private processUrlFragment(fragment: string) {
    console.log('Class: SubjectPageComponent, Function: processUrlFragment, Line 110 fragment' , fragment);
    const [_, action, entityType] = fragment.split('/');
    if (entityType === 'subject') {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(SubjectDialogMode.EDIT, {entity: this.entity(), project: this.project});
          break;
        case 'delete':
          this.dialogService.openDialog(SubjectDialogMode.DELETE, {entity: this.entity(), project: this.project});
      }
    }
  }

  removeFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined
    }).then();
  }

  navigateOnUpdateSuccess(entity: AppSubject) {
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

  navigateOnDeleteSuccess() {
    this.router.navigate([
      '/admin',
      'organizations',
      this.organization?.name,
      'projects',
      this.project?.projectName,
      'subjects',
    ], {fragment: undefined}).then();
  }

  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;
}
