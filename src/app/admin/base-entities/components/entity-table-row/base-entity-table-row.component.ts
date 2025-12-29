import {Component, effect, input, signal} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {DetailType} from '../../enums/detail-type';
import {ROLES} from '../../../../shared/enums/roles';
import {SubjectDialogMode} from '../../../entities/project-scope/subject/enums/dialog';
import {BaseConfigService} from '../../services/base-config.service';

@Component({
  selector: 'app-base-entity-table-row',
  template: '',
})
export class BaseEntityTableRowComponent<T extends ({_name: string;})> {
  protected readonly ROLES = ROLES;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  configService!: BaseConfigService;

  entity = input.required<T>();
  entityUpdateTrigger= input<{mode: DialogMode | SubjectDialogMode | string; entity?: T}>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

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
}
