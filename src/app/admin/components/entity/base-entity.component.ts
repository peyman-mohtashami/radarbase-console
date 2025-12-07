import {Component, effect, inject, input, signal} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {DetailType} from '../../enums/detail-type';
import {MatCard, MatCardContent} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {
  OrganizationProjectsComponent
} from '../../entities/organization/components/organization-projects/organization-projects.component';
import {MatIconButton} from '@angular/material/button';
import {
  OrganizationDetailsComponent
} from '../../entities/organization/components/organization-details/organization-details.component';
import {ActionsComponent} from '../../entities/organization/components/actions/actions.component';
import {PermissionDirective} from '../../../core/auth/directives/show-if-has-role.directive';
import {OrganizationConfigService} from '../../entities/organization/services/organization-config.service';
import {AppOrganization} from '../../entities/organization/models/organization';
// import {UpdateTrigger} from '../../entities/organization/services/organization-dialog.service';
import {ROLES} from '../../../shared/enums/roles';
import {SubjectDialogMode} from '../../entities/subject/enums/dialog';

@Component({
  selector: 'app-base-entity',
  template: '',
})
export class BaseEntityComponent<T extends {_name: string;}> {
  protected readonly ROLES = ROLES;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  configService: any;

  entity = input.required<T>();
  entityUpdateTrigger= input<{mode: DialogMode | SubjectDialogMode; entity?: T}>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  expanded = signal(false);
  updated = signal(false);

  constructor() {
    effect(() => {
      const updateTrigger = this.entityUpdateTrigger();
      if (!updateTrigger) return;

      const {mode, entity} = updateTrigger;
      if (entity?._name !== this.entity()._name) return;
      if (mode === DialogMode.ADD || mode === DialogMode.EDIT) {
        this.updated.set(true);
        setTimeout(() => {
          this.updated.set(false);
        }, 1000);
      } else {
        this.updated.set(false);
      }
    });
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded.update((currentValue) => !currentValue);
  }
}
