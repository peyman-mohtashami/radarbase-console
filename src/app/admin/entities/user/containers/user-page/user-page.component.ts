import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
// import { DialogMode } from '../../../../enums/dialog';
import { AppUser } from "../../models/user";
import {TranslatePipe} from "@ngx-translate/core";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatPrefix} from '@angular/material/input';
import {ActionsComponent} from '../../components/actions/actions.component';
import {AppOrganization} from '../../../organization/models/organization';
import {AppProject} from '../../../project/models/project';
import {BaseEntityPageComponent} from '../../../../components/entity-page/base-entity-page.component';

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
export class UserPageComponent extends BaseEntityPageComponent<AppUser> implements OnInit, OnDestroy {
  override configService = inject(UserConfigService);
  override dialogService = inject(UserDialogService);

  override entity = signal<AppUser>(this.activatedRoute.snapshot.data['user']);
  userList: AppUser[] = this.activatedRoute.snapshot.data['userList']; // TODO userFullList
  projectFullList: AppProject[] = this.activatedRoute.snapshot.data['projectFullList'];
  organizationFullList: AppOrganization[] = this.activatedRoute.snapshot.data['organizationFullList'];

  deleteDisabled = false;

  ngOnInit(): void {
    super.init();

    //TODO not relevant to users
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
    super.destroy();
  }

  // private processUrlFragment(fragment: string) {
  //   const [_, action, entityType] = fragment.split('/');
  //   if (entityType === 'user') {
  //     switch(action) {
  //       case 'edit':
  //         this.dialogService.openDialog(DialogMode.EDIT, {entity: this.entity(), entities: this.entities, projects: this.projects, organizations: this.organizations});
  //         break;
  //       case 'delete':
  //         this.dialogService.openDialog(DialogMode.DELETE, {entity: this.entity(), entities: this.entities, projects: this.projects, organizations: this.organizations});
  //         break;
  //       case 'activate':
  //         this.dialogService.openDialog('activate', {entity: this.entity(), entities: this.entities, projects: this.projects, organizations: this.organizations});
  //         break;
  //     }
  //   }
  // }

  override navigateOnUpdateSuccess(entity: AppUser) {
    this.router.navigate(['/admin', 'users', entity.login]).then();
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'users']).then();
  }

  override getDialogData(entity?: AppUser) {
    return {
      entity,
      userList: this.userList,
      projectFullList: this.projectFullList,
      organizationFullList: this.organizationFullList
    }
  }
}
