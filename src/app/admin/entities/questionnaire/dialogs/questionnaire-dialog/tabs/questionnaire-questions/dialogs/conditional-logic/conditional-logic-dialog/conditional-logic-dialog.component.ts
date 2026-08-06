import {
  AfterViewInit,
  Component, inject, OnInit, output, signal,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent, MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {HttpErrorResponse} from '@angular/common/http';
import {ConditionalLogicItemsComponent} from '../conditional-logic-items/conditional-logic-items.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  ErrorMessageBoxComponent
} from '../../../../../../../../../../shared/components/message-box/error-message-box.component';
import {TagComponent} from '../../../../../../../../../../shared/components/tag/tag.component';
import {BaseConfigService} from '../../../../../../../../../shared/services/base-config.service';
import {DialogMode} from '../../../../../../../../../shared/enums/dialog';
import {AppQuestion} from '../../../../../../../models/questionnaire';
import {OPERATOR_SYMBOLS} from '../conditional-logic-operator-selector/conditional-logic-operator-selector.component';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../../shared/utils/dialog.util';

export interface ConditionalLogicItem {
  operand: string;
  operator: string;
  value: string;
}

@Component({
  selector: 'app-conditional-logic-dialog',
  templateUrl: './conditional-logic-dialog.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    ErrorMessageBoxComponent,
    ConditionalLogicItemsComponent,
    MatButton,
    MatIcon,
    TagComponent,
    MatIconButton,
    MatDialogTitle,
  ]
})
export class ConditionalLogicDialogComponent implements OnInit, AfterViewInit {
  protected readonly DialogMode = DialogMode;

  private dialogRef = inject(MatDialogRef<ConditionalLogicDialogComponent>);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: ConditionalLogicItem[][];
    questions: AppQuestion[];
    selectedIndex: number;
  };

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  dialogActionEvent = output<{ action: DialogMode | string, entity?: ConditionalLogicItem[][] }>();



  conditionalLogicItemsArray: ConditionalLogicItem[][] = [];
  conditionalLogicString = '';

  ngOnInit() {
    this.conditionalLogicItemsArray = this.dialogData.entity ?? [];
    this.conditionalLogicString = this.conditionalLogicItemsArray.map((conditionalLogicItems) =>
      conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
    ).join(' or ');
  }

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }
  // ngAfterViewInit() {
  //   const containerId = this.dialogData.id;
  //   const innerContainer = document.getElementById(containerId);
  //   const panel = innerContainer?.closest('.tailwind-slide-panel');
  //   setTimeout(() => {
  //     panel?.classList.add('dialog-enter-active');
  //   });
  // }

  protected handleSaveAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.conditionalLogicItemsArray});
  }

  close() {
    // this.configService.clearDialogState();
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  // close() {
  //   this.loading.set(false);
  //   const containerId = this.dialogData.id;
  //   const innerContainer = document.getElementById(containerId);
  //   const panel = innerContainer?.closest('.tailwind-slide-panel');
  //   panel?.classList.remove('dialog-enter-active');
  //   panel?.classList.add('dialog-exit-active');
  //
  //   setTimeout(() => {
  //     this.dialogActionEvent.emit({action: DialogMode.CLOSE});
  //     this.dialogRef?.close();
  //   }, 300);
  // }

  protected addConditionalLogicItems() {
    this.conditionalLogicItemsArray.push([{
        operand: '',
        operator: '',
        value: ''
      }]
    );
  }

  protected onItemEvent(event: ConditionalLogicItem[], index: number) {
    if (event.length) {
      this.conditionalLogicItemsArray[index] = event;
    } else {
      this.conditionalLogicItemsArray.splice(index, 1);
    }

    this.conditionalLogicString = this.conditionalLogicItemsArray.map((conditionalLogicItems) =>
      conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
    ).join(' or ');
  }
}
