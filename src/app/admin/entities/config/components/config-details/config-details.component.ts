import {Component, input} from '@angular/core';
import {AppSource} from '../../../source/models/source';
import {DialogMode} from '../../../../enums/dialog';
import {TableElement} from '../../../../models/table.model';
import {DetailType} from '../../../../enums/detail-type';
import {ENTITY_NAME} from '../../../../enums/entities';

@Component({
    selector: 'rb-config-details',
    templateUrl: './config-details.component.html',
})
export class ConfigDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppSource>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
