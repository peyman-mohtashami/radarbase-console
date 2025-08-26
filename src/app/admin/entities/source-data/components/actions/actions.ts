import {Component, input, Input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../enums/dialog';
import {AppSourceData} from '../../models/source-data';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-actions',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    MatMenuTrigger
  ],
  templateUrl: './actions.html',
})
export class Actions {

  protected readonly DialogMode = DialogMode;

  entity = input.required<AppSourceData>();
  isExpanded = input<boolean>(true);

  onAction(mode: DialogMode) {
    // this.actionEvent.emit({mode, entity});
  }
}
