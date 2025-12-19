import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DialogMode } from '../../../../enums/dialog';
import { AppUser } from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";
import {Subject} from 'rxjs';
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {takeUntil} from 'rxjs/operators';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatPrefix} from '@angular/material/input';
import {ActionsComponent} from '../../components/actions/actions.component';
import {AppOrganization} from '../../../organization/models/organization';
import {AppProject} from '../../../project/models/project';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  imports: [
    TranslatePipe,
    UserDetailsComponent,
    MatPrefix,
    ActionsComponent,
    MatCard,
    MatCardContent,
    MatPrefix,
  ]
})
export class UserPageComponent implements OnInit, OnDestroy {
  protected configService = inject(UserConfigService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(UserDialogService);

  protected readonly DialogMode = DialogMode;

  entityName = this.configService.getEntityMetadata().name;

  entity = signal<AppUser>(this.activatedRoute.snapshot.data['user']);
  entities: AppUser[] = this.activatedRoute.snapshot.data['userList'];
  projects: AppProject[] = this.activatedRoute.snapshot.data['projectFullList'];
  organizations: AppOrganization[] = this.activatedRoute.snapshot.data['organizationFullList'];

  tableFields = this.configService.getTableFields();

  private _destroy$: Subject<void> = new Subject<void>();

  deleteDisabled = false;

  constructor() {
    this.initializeDialogEffect();
  }

  ngOnInit(): void {
    this.handleDialogUrlFragment();

    if (this.entity().roles && this.entity().roles!.length > 0) {
      if (this.entity().roles?.[0]?.authorityName === 'ROLE_PARTICIPANT') {
        this.deleteDisabled = true;
      }
      if (this.entity().roles?.[0]?.authorityName === 'ROLE_INACTIVE_PARTICIPANT') {
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
    const [_, action, entityType] = fragment.split('/');
    if (entityType === 'user') {
      switch(action) {
        case 'edit':
          this.dialogService.openDialog(DialogMode.EDIT, {entity: this.entity(), entities: this.entities, projects: this.projects, organizations: this.organizations});
          break;
        case 'delete':
          this.dialogService.openDialog(DialogMode.DELETE, {entity: this.entity(), entities: this.entities, projects: this.projects, organizations: this.organizations});
          break;
        case 'activate':
          this.dialogService.openDialog('activate', {entity: this.entity(), entities: this.entities, projects: this.projects, organizations: this.organizations});
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
