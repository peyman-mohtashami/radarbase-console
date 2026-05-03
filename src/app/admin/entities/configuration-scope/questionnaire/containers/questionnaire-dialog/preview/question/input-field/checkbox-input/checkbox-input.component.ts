import {Component, OnInit} from '@angular/core'

import { BaseInputComponent } from '../base-input/base-input.component'
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';

export interface CheckBoxItem {
  checked: boolean; label: Record<string, string>; code: number | string
}

@Component({
  selector: 'app-checkbox-input',
  templateUrl: 'checkbox-input.component.html',
  imports: [ReplacePlaceholdersPipe, MatCheckbox, MatButton]
})
export class CheckboxInputComponent extends BaseInputComponent implements OnInit {

  items: CheckBoxItem[] = []
  _selectedValue: string[] = []

  override ngOnInit() {
    super.ngOnInit()
    this.items = this.question().select_choices_or_calculations!.map(item => {
      return {
        ...item,
        checked: !!this.selectedValue?.includes(item.code)
      }
    })
  }

  onCheckboxClick(item: CheckBoxItem): void {
    if (!this.isDisabled) {
      item.checked = !item.checked
      if (item.checked) {
        this._selectedValue.push(item.code.toString())
      } else {
        this._selectedValue = this._selectedValue.filter(
          selectedItem => selectedItem !== item.code
        )
      }
      this.onInputChange(this._selectedValue.toString())
    }
  }

  /**
   * Resets the selected value.
   */
  override onReset(): void {
    this.items.forEach(item => item.checked = false)
    this._selectedValue = []
    super.onReset()
  }
}
