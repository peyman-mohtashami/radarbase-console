import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../services/base-config.service';

export const TableElements: TableElement[] = [
  {name: "id", width: "w-16", tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true},
  {name: "timestamp", width: "w-72", tableClass: "hidden md:block", extensionClass: "block md:hidden", sortable: true},
  {name: "author", width: "w-40", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true},
  {name: "modifications", tableClass: "block", extensionClass: "hidden"}
];

export const filters: FilterItem[] = [];

@Injectable({providedIn: 'root'})
export class RevisionConfigService extends BaseConfigService {
  override tableElements = TableElements;
  override filters = filters;
  override entityMetadata = ENTITY_REGISTRY.revision;
}
