import {Component, input, signal, TemplateRef} from "@angular/core";
import {DialogMode} from "../../enums/dialog";
import {DetailType} from "../../enums/detail-type";
import {TableElement} from "../../models/table.model";
import {NgTemplateOutlet} from "@angular/common";
import {MatCard} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  imports: [
    NgTemplateOutlet,
    MatCard,
    MatIconButton,
  ]
})
export class EntityComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  customTemplate = input<TemplateRef<any>>();
  tableFields = input<TableElement[]>([]);

  entity = input.required<any>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  expanded = signal(false);
  updated = signal(false);

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded.update((currentValue) => !currentValue);
  }
}
