import {Component, input, output, signal, TemplateRef} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {DetailType} from "../../enums/detail-type";
import {RbPageSortEvent, RbSort, TableElement} from "../../models/table.model";
import {NgTemplateOutlet} from "@angular/common";
import {EntityRegistry} from "../../../shared/consts/entity-registry";
import {TableQueryReflectorDirective} from '../../directives/table-query-reflector.directive';
import {MatCheckbox} from '@angular/material/checkbox';
import {MIN_ENTITIES_FOR_PAGINATION, PAGE_SIZE_OPTIONS} from '../../consts/default-table-values';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-entities-page',
  templateUrl: './entities-page.component.html',
  imports: [
    TranslatePipe,
    TableQueryReflectorDirective,
    MatCheckbox,
    MatPaginator,
    NgTemplateOutlet,
  ]
})
export class EntitiesPageComponent {
  protected readonly DetailType = DetailType;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = MIN_ENTITIES_FOR_PAGINATION;
  protected readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

  customTemplate = input<TemplateRef<unknown>>();
  entities = input<{_name: string}[]>([]);
  tableFields = input<TableElement[]>([]);
  entityMetadata = input.required<EntityRegistry>();
  page = input.required<PageEvent>();
  sort = input.required<RbSort>();
  gridView = input<boolean>(false);
  totalEntities = input.required<number>();

  switchPageEvent = output<PageEvent>();
  switchSortEvent = output<TableElement>();
  activeQueryChangeEvent = output<RbPageSortEvent>();

  extensionClass = signal('hidden');

  selection = new SelectionModel<unknown>(true, []);

  /** Selection Helper Methods */
  isAllSelected() {
    return this.selection.selected.length === this.entities().length;
  }

  masterToggle() {
    console.log('Class: EntitiesPageComponent, Function: masterToggle, Line 52 ' , );
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.entities());
    }
  }

  checkboxLabel(row?: {position: number}): string {
    return row
      ? `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
      : `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }

  protected switchPage($event: PageEvent) {
    this.switchPageEvent.emit($event);
  }

  protected switchSort(tableField: TableElement) {
    this.switchSortEvent.emit(tableField)
  }

  protected handleActiveQueryChange($event: RbPageSortEvent) {
    this.activeQueryChangeEvent.emit($event);
  }
}
