import { Component, OnInit } from '@angular/core'

import { RangeInputComponent } from '../range-input/range-input.component'

/**
 * Component for handling range-info inputs in a question.
 * Manages user interactions and value changes.
 */
@Component({
  selector: 'app-range-info-input',
  templateUrl: 'range-info-input.component.html',
  imports: [RangeInputComponent]
})
export class RangeInfoInputComponent extends RangeInputComponent implements OnInit {
  itemDescription?: Record<string, string>;

  override ngOnInit() {
    super.ngOnInit()
    this.showDescription(this.selectedValue)
  }

  /**
   * Handles user input changes.
   * @param event The selected radio button value.
   */
  override onInputChange(event: string | null): void {
    if (!this.isDisabled) {
      super.onInputChange(event)
      this.showDescription(event)
    }
  }

  showDescription(value: string | null): void {
    this.itemDescription =
      this.question().select_choices_or_calculations?.find(
        response => response.code === value
      )?.label
  }
}
