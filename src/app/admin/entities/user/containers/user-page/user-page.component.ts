import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { DialogMode } from '../../../../enums/dialog';
import { AppUser } from "../../models/user";
import { ENTITY_NAME } from '../../../../enums/entities';
import {TranslatePipe} from "@ngx-translate/core";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";
import {Subject} from 'rxjs';
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {takeUntil} from 'rxjs/operators';
import {BackButtonDirective} from '../../../../directives/back-button.directive';
import {MatButton} from '@angular/material/button';
import {ENTITIES} from '../../../../consts/entities';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatPrefix} from '@angular/material/input';
import {ActionsComponent} from '../../components/actions/actions.component';
import {AppOrganization} from '../../../organization/models/organization';
import {AppProject} from '../../../project/models/project';

@Component({
  selector: 'rb-user-page',
  templateUrl: './user-page.component.html',
  imports: [
    TranslatePipe,
    UserDetailsComponent,
    BackButtonDirective,
    MatButton,
    MatPrefix,
    ActionsComponent,
    MatCard,
    MatCardContent,
    MatPrefix,
    RouterLink
  ]
})
export class UserPageComponent implements OnInit, OnDestroy {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;

  private configService = inject(UserConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(UserDialogService);

  entity$ = signal<AppUser>(this.activatedRoute.snapshot.data['entity']);
  tableFields = this.configService.getTableFields();
  entities: AppUser[] = this.activatedRoute.snapshot.data['entities'];
  projects: AppProject[] = this.activatedRoute.snapshot.data['projects'];
  organizations: AppOrganization[] = this.activatedRoute.snapshot.data['organizations'];

  private _destroy$: Subject<void> = new Subject<void>();


  deleteDisabled = false;

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    this.handleDialogUrlFragment();

    if (this.entity$().roles && this.entity$().roles!.length > 0) {
      if (this.entity$().roles?.[0]?.authorityName === 'ROLE_PARTICIPANT') {
        this.deleteDisabled = true;
      }
      if (this.entity$().roles?.[0]?.authorityName === 'ROLE_INACTIVE_PARTICIPANT') {
        this.deleteDisabled = true;
      }
    }
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
          case DialogMode.EDIT:
            if (updated?.entity) {
              this.entity$.set(updated.entity);
            }
            this.navigateOnUpdateSuccess(updated.entity);
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
    const [_, action, entityType] = fragment.split('/');
    if (entityType === 'user') {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, this.entity$(), this.entities, this.projects, this.organizations);
          break;
        case 'delete':
          this.dialogService.openDialog(DialogMode.DELETE, this.entity$(), this.entities, this.projects, this.organizations);
          break;
      }
    }
  }

  navigateOnUpdateSuccess(entity: AppUser) {
    this.router.navigate(['/admin', 'users', entity.login]).then();
  }

  navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'users']).then();
  }
}
