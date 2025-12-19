import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import { DialogMode } from '../../../../enums/dialog';
import {takeUntil} from "rxjs/operators";
import { AppClient } from "../../models/client";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPrefix} from "@angular/material/input";
import {Subject} from 'rxjs';
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {ActionsComponent} from '../../components/actions/actions.component';
import {TabLink} from "../../../../models/tab-link";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    MatPrefix,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterOutlet,
    RouterLink,
    PermissionDirective,
    ActionsComponent
  ]
})
export class ClientPageComponent implements OnInit, OnDestroy {
  protected configService = inject(ClientConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(ClientDialogService);

  protected readonly DialogMode = DialogMode;

  entityName = this.configService.getEntityMetadata().name;

  links: TabLink[] = [
    { path: 'configs', label: `ADMIN.${ENTITY_REGISTRY.config.name}.title.plural` },
    { path: 'details', label: `ADMIN.${this.entityName}.details` },
  ];

  activePath?: string;

  entity = signal<AppClient>(this.activatedRoute.snapshot.data['client']);
  entities = this.activatedRoute.snapshot.data['entities'];
  tableFields = this.configService.getTableFields();

  hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot?.params?.['id'];

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    this.handleDialogUrlFragment();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.EDIT:
            if (updated?.entity) {
              this.entity.set(updated.entity);
              this.navigateOnUpdateSuccess(updated.entity);
            }
            break;
          case DialogMode.DELETE:
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
    const [, action, entityType] = fragment.split('/');
    if (entityType === this.entityName) {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, {entity: this.entity(), entities: this.entities});
          break;
        case 'delete':
          this.dialogService.openDialog(DialogMode.DELETE, {entity: this.entity(), entities: this.entities});
      }
    }
  }

  navigateOnUpdateSuccess(entity: AppClient) {
    this.router.navigate(['/admin', 'clients', entity.clientId]).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'clients']).then();
  }


  form = new FormGroup({
    category: new FormControl('general'),
  })
}
