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

export interface Question {
  id: string;
  name: string;
}

export interface QuestionPickerDialogData {
  questions: Question[];
}

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

  private readonly dialogRef = inject(
    MatDialogRef<QuestionPickerDialogComponent>
  );

  private readonly data = inject<QuestionPickerDialogData>(
    MAT_DIALOG_DATA
  );

  readonly searchTerm = signal('');

  readonly questions = this.data.questions;

  readonly filteredQuestions = computed(() => {
    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    if (!search) {
      return this.questions;
    }

    return this.questions.filter(question =>
      question.name.toLowerCase().includes(search)
    );
  });

  selectQuestion(question: Question): void {
    this.dialogRef.close(question);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }
}
