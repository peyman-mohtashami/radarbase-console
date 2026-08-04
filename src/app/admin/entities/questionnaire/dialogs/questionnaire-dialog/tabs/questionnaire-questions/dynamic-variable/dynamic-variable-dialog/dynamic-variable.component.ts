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
// import {
//   DialogTitleComponent
// } from '../../../../../../../base-entities/containers/entity-dialog/dialog-title/dialog-title.component';
// import {
//   ErrorMessageBoxComponent
// } from '../../../../../../../../shared/components/message-box/error-message-box.component';
// import {DialogMode} from '../../../../../../../base-entities/enums/dialog';
// import {
//   DialogBodyDescriptionComponent
// } from '../../../../../../../base-entities/containers/entity-dialog/dialog-body-description/dialog-body-description.component';
import {HttpErrorResponse} from '@angular/common/http';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
// import {TagComponent} from '../../../../../../../../shared/components/tag/tag.component';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {
  ErrorMessageBoxComponent
} from '../../../../../../../../../shared/components/message-box/error-message-box.component';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';

export interface ConditionalLogicItem {
  operand: string;
  operator: string;
  value: string;
}

@Component({
  selector: 'app-dynamic-variable-dialog',
  templateUrl: './dynamic-variable.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    MatDialogContent,
    ErrorMessageBoxComponent,
    MatButton,
    // MatIcon,
    // TagComponent,
    // MatIconButton,
    MatFormField,
    MatOption,
    MatSelect,
    MatDialogTitle,
  ]
})
export class DynamicVariableComponent implements OnInit, AfterViewInit { //extends BaseEntityDialogComponent<{value: string}> {
  // protected configService!: BaseConfigService;

  protected readonly DialogMode = DialogMode;

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  dialogActionEvent = output<{ action: DialogMode | string, entity?: {value: string} }>();

  dialogRef = inject(MatDialogRef<DynamicVariableComponent>);
  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: {value: string};
  };

  // conditionalLogicItemsArray: ConditionalLogicItem[][] = [];

  // resultString = '';
  protected questionnaires = [
    { value: 'questionnaire-2', name: "Questionnaire 1" },
    { value: 'questionnaire-1', name: "Questionnaire 2" },
  ];
  protected questions = [
    { value: 'question-2', name: "Question 1" },
    { value: 'question-1', name: "Question 2" },
  ];
  protected logics = [
    { value: '===', name: 'Equals' },
    { value: '!==', name: 'Not Equals' },
    { value: '<', name: 'Less Than' },
    { value: '>', name: 'Greater Than' },
    { value: '<=', name: 'Less Than or Equal' },
    { value: '>=', name: 'Greater Than or Equal' },
  ];

  ngOnInit() {
    // this.resultString = this.dialogData.entity?.value ?? '';
    // this.conditionalLogicItemsArray = this.parseConditionalLogic(this.dialogData.entity?.value ?? '');
  }

  // private parseConditionalLogic(input: string): ConditionalLogicItem[][] {
  //   if (!input || input.trim() === '') {
  //     return [];
  //   }
  //
  //   // Split by 'or' (case-insensitive) to get OR groups
  //   const orGroups = input.split(/\s+or\s+/i);
  //
  //   return orGroups.map(orGroup => {
  //     // Split by 'and' (case-insensitive) to get AND conditions
  //     const andConditions = orGroup.split(/\s+and\s+/i);
  //
  //     return andConditions.map(condition => {
  //       // Parse each condition: [field_name] <operator> 'value'
  //       // Supports: ===, ==, !==, !=, <>, <=, >=, <, >
  //       const match = condition.match(/\[([^\]]+)]\s*(===|==|=|!==|!=|<>|<=|>=|<|>)\s*(?:'([^']*)'|"([^"]*)"|(\S+))/);
  //       // const match = condition.match(/\[([^\]]+)\]\s*(===|==|!==|!=|<>|<=|>=|<|>)\s*'([^']*)'/);
  //
  //       // return {
  //       //   operand: 'match[1]',
  //       //   operator: '==',
  //       //   value: 'match[2]'
  //       // }
  //       if (!match) {
  //         throw new Error(`Invalid condition format: ${condition}`);
  //       }
  //
  //       return {
  //         operand: match[1].trim(),
  //         operator: match[2],
  //         value: match[3] || match[4] || match[5] // Single quote, double quote, or unquoted
  //       };
  //       // if (!match) {
  //       //   throw new Error(`Invalid condition format: ${condition}`);
  //       // }
  //
  //       // return {
  //       //   operand: match[1],
  //       //   operator: '==',
  //       //   value: match[2]
  //       // };
  //     });
  //   });
  // }

  ngAfterViewInit() {
    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    setTimeout(() => {
      panel?.classList.add('dialog-enter-active');
    });
  }

  protected handleSaveAction(): void {
    // this.dialogActionEvent.emit({action: this.dialogData.mode, entity: {value: this.resultString}});
  }

  close() {
    this.loading.set(false);
    const containerId = this.dialogData.id;
    const innerContainer = document.getElementById(containerId);
    const panel = innerContainer?.closest('.tailwind-slide-panel');
    panel?.classList.remove('dialog-enter-active');
    panel?.classList.add('dialog-exit-active');

    setTimeout(() => {
      this.dialogActionEvent.emit({action: DialogMode.CLOSE});
      this.dialogRef?.close();
    }, 300);
  }

  // protected addConditionalLogicItems() {
  //   this.conditionalLogicItemsArray.push([{
  //       operand: '',
  //       operator: '',
  //       value: ''
  //     }]
  //   );
  // }
  //
  // protected onItemEvent(event: ConditionalLogicItem[], index: number) {
  //   if (event.length) {
  //     this.conditionalLogicItemsArray[index] = event;
  //   } else {
  //     this.conditionalLogicItemsArray.splice(index, 1);
  //   }
  //
  //   this.resultString = this.conditionalLogicItemsArray.reduce((res, items) => {
  //     const curString = items.reduce((acc, item) => {
  //       if (item.operand && item.operator && item.value) {
  //         return `${acc}${acc ? ' and ' : ''}[${item.operand}]${item.operator}'${item.value}'`;
  //       } else {
  //         return `${acc}`;
  //       }
  //     }, '');
  //     if (curString) {
  //       return `${res}${res ? ' or ' : ''}${curString}`;
  //     } else {
  //       return `${res}`;
  //     }
  //   }, '');
  // }

  protected onInputChange($event: MatSelectChange<any>) {

  }
}
