import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';

// export interface Question {
//   id: string;
//   name: string;
// }

// export interface QuestionPickerDialogData {
//   questions: Question[];
// }

@Component({
  selector: 'app-question-picker-dialog',
  imports: [
    FormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatOption,
    MatSelect,
    TranslatePipe,
  ],
  templateUrl: './question-picker-dialog.component.html',
  styles: `
    :host {
      display: block;
    }

    mat-dialog-content {
      min-width: 450px;
      max-width: 600px;
      min-height: 300px;
    }

    .search-field {
      width: 100%;
      margin-bottom: 8px;
    }

    .question-list {
      padding-top: 0;
    }

    .question-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 4px 0;
    }

    .question-name {
      font-size: 14px;
      line-height: 20px;
      white-space: normal;
    }

    .question-id {
      font-size: 12px;
      line-height: 16px;
      color: #6b7280;
    }

    .empty-state {
      min-height: 220px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      text-align: center;

      color: #6b7280;
    }

    .empty-state mat-icon {
      width: 40px;
      height: 40px;

      font-size: 40px;

      margin-bottom: 12px;
    }

    .empty-title {
      font-size: 15px;
      font-weight: 500;

      margin-bottom: 4px;
    }

    .empty-description {
      font-size: 13px;
    }
  `
})
export class QuestionPickerDialogComponent {
  private store = inject(QuestionnaireStore);

  private readonly dialogRef = inject(MatDialogRef<QuestionPickerDialogComponent>);

  protected readonly data = inject<{questionIndex: number}>(MAT_DIALOG_DATA);

  // readonly searchTerm = signal('');

  readonly questions = this.store.selected()?.questions.filter(((q, i) => i < this.data.questionIndex));

  // readonly filteredQuestions = computed(() => {
  //   const search = this.searchTerm()
  //     .trim()
  //     .toLowerCase();
  //
  //   if (!search) {
  //     return this.questions;
  //   }
  //
  //   return this.questions?.filter(question =>
  //     question.field_name.toLowerCase().includes(search)
  //   );
  // });

  selectQuestion(event: MatSelectChange<AppQuestion>): void {
    console.log('Class: QuestionPickerDialogComponent, Function: selectQuestion, Line 150 event' , event);
    this.dialogRef.close(event.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  // updateSearchTerm(value: string): void {
  //   this.searchTerm.set(value);
  // }
}
