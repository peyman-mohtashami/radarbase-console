import {Injectable} from '@angular/core';
import {FilterItem, TableElement} from '../../../models/table.model';
import {ENTITY_REGISTRY} from "../../../../shared/consts/entity-registry";
import {BaseConfigService} from '../../../services/base-config.service';

export const TableElements: TableElement[] = [
    {name: "id", width: "w-16", tableClass: "hidden sm:block", extensionClass: "block sm:hidden", sortable: true, editable: false },
    {name: "sourceDataName", tableClass: "block", extensionClass: "hidden", sortable: true, editable: false },
    {name: "sourceType", width: "w-56", tableClass: "hidden md:block", extensionClass: "block md:hidden", editable: false},
    {name: "sourceDataType", width: "w-48", tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", sortable: true, editable: false },
    {name: "topic", tableClass: "hidden", extensionClass: "block", editable: true },
    {name: "processingState", width: "w-36", tableClass: "hidden 2xl:block", extensionClass: "block 2xl:hidden", sortable: true, editable: true },
    {name: "keySchema", tableClass: "hidden", extensionClass: "block", editable: true },
    {name: "valueSchema", tableClass: "hidden", extensionClass: "block", editable: true },
    {name: "frequency", width: "w-24", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true, editable: true },
    {name: "unit", width: "w-28", tableClass: "hidden xl:block", extensionClass: "block xl:hidden", sortable: true, editable: true},
    {name: "actions", width: "w-20", tableClass: "flex", extensionClass: "hidden"},
];

export const filters: FilterItem[] = [];

@Injectable({providedIn: 'root'})
export class SourceDataConfigService extends BaseConfigService {
  override filters = filters;
  override tableElements = TableElements;
  override entityMetadata = ENTITY_REGISTRY.sourceData;
}
