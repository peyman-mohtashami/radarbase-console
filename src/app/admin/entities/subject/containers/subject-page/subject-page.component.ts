import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import {ENTITIES} from "../../../../consts/entities";
import {ILink} from "../../../organization/containers/organization-page/organization-page.component";
import {BreadcrumbComponent} from "../../../../components/breadcrumb/breadcrumb.component";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {OrganizationConfigService} from '../../../organization/services/organization-config.service';
import {OrganizationDialogService} from '../../../organization/services/organization-dialog.service';
import {AppOrganization} from '../../../organization/models/organization';
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {DialogMode} from '../../../../enums/dialog';
import {AppSubject} from '../../models/subject';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {SubjectDialogMode} from '../../enums/dialog';

@Component({
  selector: 'rb-subject-page',
  templateUrl: './subject-page.component.html',
  imports: [
    BreadcrumbComponent,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    RbPermissionDirective
  ]
})
export class SubjectPageComponent implements OnInit, OnDestroy {
  private configService = inject(SubjectConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(SubjectDialogService);

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;


  // entities: AppOrganization[] = this.activatedRoute.snapshot.data['entities'];

  links: ILink[] = [
    { path: 'download', label: 'Download' },
    { path: 'data', label: 'Data' },
    { path: 'compliance', label: 'Compliance' },
    { path: 'app-configs', label: 'App Configs' },
    { path: 'details', label: 'Details' },
  ];

  // links: ILink[] = [
  //   { path: 'projects', label: 'Projects' },
  //   { path: 'users', label: 'Users' },
  //   { path: 'details', label: 'Details' },
  // ];

  activePath?: string;

  entity$ = signal<AppSubject>(this.activatedRoute.snapshot.data['entity']);
  tableFields = this.configService.getTableFields();

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    this.handleDialogUrlFragment();
    this.activePath = this.activatedRoute.firstChild?.snapshot?.url?.[0]?.path;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) {
        switch (updated.mode) {
          case SubjectDialogMode.EDIT:
            if (updated?.entity) {
              this.entity$.set(updated.entity);
            }
            this.navigateOnUpdateSuccess(updated.entity);
            break;
          case SubjectDialogMode.DELETE:
            this.navigateOnDeleteSuccess();
            break;
        }
      }
    })
  }

  private handleDialogUrlFragment() {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (fragment) this.processUrlFragment(fragment);
      });
  }

  private processUrlFragment(fragment: string) {
    const [_, action, entityType] = fragment.split('/');
    if (entityType === 'sourceType') {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(SubjectDialogMode.EDIT, this.entity$());
          break;
        case 'delete':
          this.dialogService.openDialog(SubjectDialogMode.DELETE, this.entity$());
      }
    }
  }





  navigateOnUpdateSuccess(entity: AppSubject) {
    this.router
      .navigate([
        '/admin',
        'organizations',
        entity.login
      ])
      .then();
  }

  // navigateOnDeleteSuccess() {
  //   this.router.navigate(['/admin', 'source-types']).then();
  // }


  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'organizations']).then();
  }

  // override navigateOnUpdateSuccess(entity: AppOrganization) {}


}
