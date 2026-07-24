import {Component, HostBinding, input, signal, TemplateRef, ChangeDetectionStrategy} from "@angular/core";
import {DialogMode} from "../../enums/dialog";
import {DetailType} from "../../enums/detail-type";
import {TableElement} from "../../models/table.model";
import {NgTemplateOutlet} from "@angular/common";
import {MatCard} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-entity-table-row',
  templateUrl: './entity-table-row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NgTemplateOutlet,
    MatCard,
    MatIconButton,
  ]
})
export class EntityTableRowComponent {
  @HostBinding('class')
  get hostClasses(): string {
    return `block transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01]`.trim();
  }

  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  customTemplate = input<TemplateRef<unknown>>();
  tableFields = input<TableElement[]>([]);

  extensionClass = input<string>();
  gridView = input<boolean>(false);
  updated = input(false);

  expanded = signal(false);

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded.update((currentValue) => !currentValue);
  }
}
