import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../../base-entities/models/table.model';
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../../base-entities/services/base-config.service';

export const TableElements: TableElement[] = [
  {name: "name", tableClass: "block", extensionClass: "hidden", sortable: true},
];

export const filters: FilterItem[] = []


@Injectable({providedIn: 'root'})
export class LogConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.log;
}
