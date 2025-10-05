import {Component, effect, inject, OnDestroy, OnInit, signal, untracked} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';

import { AppOrganization } from "../../models/organization";
import {ENTITIES} from "../../../../consts/entities";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {takeUntil} from 'rxjs/operators';
import {filter, Subject} from 'rxjs';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {ActionsComponent} from '../../components/actions/actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';

export interface ILink {
  path: string;
  label: string;
}

@Component({
  selector: 'rb-organization-page',
  templateUrl: './organization-page.component.html',
  imports: [
    RbPermissionDirective,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    ActionsComponent,
    MatPrefix,
    TranslatePipe,
  ]
})
export class OrganizationPageComponent implements OnInit, OnDestroy {
  private configService = inject(OrganizationConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(OrganizationDialogService);

  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;


  entities: AppOrganization[] = this.activatedRoute.snapshot.data['entities'];

  links: ILink[] = [
    { path: 'projects', label: 'Projects' },
    { path: 'users', label: 'Users' },
    { path: 'details', label: 'Details' },
  ];

  activePath?: string;

  entity$ = signal<AppOrganization>(this.activatedRoute.snapshot.data['organization']);
  tableFields = this.configService.getTableFields();

  hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot?.params?.['id']; //false;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe(() => {
      this.hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot.params['id'];
    });

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
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: DialogMode, entity: AppOrganization }) {
    switch (updated.mode) {
      case DialogMode.EDIT:
        if (updated?.entity) {
          this.entity$.set(updated.entity);
        }
        this.navigateOnUpdateSuccess(updated.entity);
        break;
      // case DialogMode.DELETE:
      //   this.navigateOnDeleteSuccess();
      //   break;
    }
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
    if (entityType === 'organization') {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, this.entity$(), this.entities);
          break;
        // case 'delete':
        //   this.dialogService.openDialog(DialogMode.DELETE, this.entity$(), this.entities);
      }
    }
  }

  navigateOnUpdateSuccess(entity: AppOrganization) {
    const lastSegment = this.activatedRoute.firstChild?.snapshot.url[this.activatedRoute.firstChild?.snapshot.url.length - 1].path;
    this.router.navigate(['/admin', 'organizations', entity.name, lastSegment],{fragment: undefined}).then();
  }

  // navigateOnDeleteSuccess() {
  //   this.router.navigate(['/admin', 'organizations'], {fragment: undefined}).then();
  // }
}
