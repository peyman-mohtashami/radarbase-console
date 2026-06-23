import {Component, input, Input, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {ConditionalLogicItemComponent} from '../conditional-logic-item/conditional-logic-item.component';
import {TagComponent} from '../../../../../../../../../../shared/components/tag/tag.component';
import {AppQuestion} from '../../../../../../models/questionnaire';

@Component({
  selector: 'app-conditional-logic-items',
  templateUrl: './conditional-logic-items.component.html',
  imports: [
    MatIcon,
    MatIconButton,
    ConditionalLogicItemComponent,
    TagComponent,
  ],
})
export class ConditionalLogicItemsComponent {
  @Input() conditionalLogicItems: ConditionalLogicItem[] = [];
  questions = input.required<AppQuestion[]>();
  selectedIndex = input.required<number>();

  itemsEvent = output<ConditionalLogicItem[]>();

  addItem(index: number) {
    this.conditionalLogicItems.splice(index + 1, 0, {
      operand: '',
      operator: '',
      value: ''
    });
  }

  removeItem(index: number) {
    this.conditionalLogicItems.splice(index, 1);
    this.itemsEvent.emit(this.conditionalLogicItems);
  }

  protected onItemChange(event: ConditionalLogicItem, index: number) {
    this.conditionalLogicItems[index] = event;
    this.itemsEvent.emit(this.conditionalLogicItems);
  }
}
