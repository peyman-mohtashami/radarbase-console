import {Component, input, Input, OnInit, output, ChangeDetectionStrategy} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {ConditionalLogicItemComponent} from '../conditional-logic-item/conditional-logic-item.component';
import {TagComponent} from '../../../../../../../../../../shared/components/tag/tag.component';
import {AppQuestion} from '../../../../../../../models/questionnaire';

@Component({
  selector: 'app-conditional-logic-items',
  templateUrl: './conditional-logic-items.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatIcon,
    MatIconButton,
    ConditionalLogicItemComponent,
    TagComponent,
  ],
})
export class ConditionalLogicItemsComponent implements OnInit {
  @Input() conditionalLogicItems: ConditionalLogicItem[] = [];
  questions = input.required<AppQuestion[]>();
  selectedIndex = input.required<number>();

  itemsEvent = output<ConditionalLogicItem[]>();

  _conditionalLogicItems: ConditionalLogicItem[] = [];

  ngOnInit() {
    this._conditionalLogicItems = [...this.conditionalLogicItems];
  }

  addItem(index: number) {
    this._conditionalLogicItems.splice(index + 1, 0, {
      operand: '',
      operator: '',
      value: ''
    });
  }

  removeItem(index: number) {
    this._conditionalLogicItems.splice(index, 1);
    this.itemsEvent.emit(this._conditionalLogicItems);
  }

  protected onItemChange(event: ConditionalLogicItem, index: number) {
    this.conditionalLogicItems[index] = event;
    this.itemsEvent.emit(this.conditionalLogicItems);
  }
}
