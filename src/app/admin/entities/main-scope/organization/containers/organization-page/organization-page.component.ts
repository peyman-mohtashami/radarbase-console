import {Component, DestroyRef, inject, signal, ChangeDetectionStrategy, effect, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AppOrganization, RadarOrganization} from "../../models/organization";
import {PermissionDirective} from "../../../../../../core/auth/directives/show-if-has-role.directive";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {OrganizationActionsComponent} from '../../components/organization-actions/organization-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {ROLES} from "../../../../../../shared/enums/roles";
import {ENTITY_REGISTRY} from "../../../../../../shared/consts/entity-registry";
import {TabLink} from "../../../../../base-entities/models/tab-link";
import {BaseEntityPageComponent} from '../../../../../base-entities/containers/entity-page/base-entity-page.component';
import {filter, startWith, Subject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {BaseConfigService} from '../../../../../base-entities/services/base-config.service';
import {BaseDialogService} from '../../../../../base-entities/services/base-dialog.service';
import {
  BaseEntityDialogComponent
} from '../../../../../base-entities/containers/entity-dialog/base-entity-dialog.component';
import {DialogMode} from '../../../../../base-entities/enums/dialog';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PermissionDirective,
    MatTabNav,
    MatTabLink,
    RouterLink,
    MatTabNavPanel,
    RouterOutlet,
    OrganizationActionsComponent,
    MatPrefix,
    TranslatePipe,
    RouterLinkActive,
    MatButton,
    MatIcon,
  ]
})
export class OrganizationPageComponent implements OnInit, OnDestroy { //extends BaseEntityPageComponent<AppOrganization, RadarOrganization> {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  // protected configService!: BaseConfigService;
  // protected dialogService!: BaseDialogService<AppOrganization, RadarOrganization, BaseEntityDialogComponent<AppOrganization>>;

  // entity = signal<AppOrganization | undefined>(undefined);

  configService = inject(OrganizationConfigService);
  dialogService = inject(OrganizationDialogService);
  private destroyRef = inject(DestroyRef);

  entity = signal<AppOrganization>(this.activatedRoute.snapshot.data['organization']);

  links: TabLink[] = [];

  projectId: string | null = null;

  _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  // ngOnInit() {
  //   this.updateTabLinks();
  //   // this.handleDialogUrlFragment();
  // }

  ngOnInit() {
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
      this.projectId = paramMap.get('projectId');
    });

    this.links = [
      {path: 'projects', label: `ADMIN.${ENTITY_REGISTRY.project.name}.title.plural`},
      {
        path: 'users',
        label: `ADMIN.${ENTITY_REGISTRY.user.name}.title.plural`,
        permissions: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN, entityName: this.entity().name}]
      },
      {path: 'details', label: `ADMIN.${ENTITY_REGISTRY.organization.name}.details`},
    ];

    this.updateTabLinks();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }


  initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService?.dialogUpdateEvent();
      // if (updated) untracked(() => {
      //   this.handleDialogUpdate(updated);
      // });
      if (updated) {
        this.handleDialogUpdate(updated);
      }
    });
  }

  handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppOrganization }) {
    this.updateTabLinks(updated.entity);
    switch (updated.mode) {
      case DialogMode.EDIT:
        if (updated?.entity) {
          this.entity.set(updated.entity);
          this.navigateOnUpdateSuccess(updated.entity);
          return;
        }
        break;
      case DialogMode.DELETE:
        this.navigateOnDeleteSuccess();
        return;

    }
    // this.removeFragmentUrl();
  }

  // removeFragmentUrl() {
  //    this.router.navigate([], {
  //      relativeTo: this.activatedRoute,
  //      queryParamsHandling: 'preserve',
  //      fragment: undefined
  //    }).then();
  //  }

  // private handleDialogUrlFragment() {
  //   this.activatedRoute.fragment
  //     .pipe(takeUntil(this._destroy$))
  //     .subscribe(fragment => {
  //       if (fragment) this.dialogService.processUrlFragment(fragment);
  //     });
  // }

  navigateOnUpdateSuccess(entity: AppOrganization) {
    this.router.navigate(['../', entity._name], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      // fragment: undefined
    }).then();
  }
  //
  navigateOnDeleteSuccess() {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      // fragment: undefined
    }).then();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTabLinks(_entity?: AppOrganization) {
    return;
  }
}
