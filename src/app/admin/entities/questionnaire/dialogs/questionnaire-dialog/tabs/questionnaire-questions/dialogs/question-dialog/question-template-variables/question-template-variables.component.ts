import {ChangeDetectorRef, Component, computed, inject, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {QuestionnaireStore} from '../../../../../../../services/questionnaire.store';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionTemplateVariable} from '../../../../questionnaire-variables/model/template-field.model';
import {
  VariableDialogComponent
} from '../../../../questionnaire-variables/dialogs/variable-dialog/variable-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {FieldTree, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-question-template-variables',
  templateUrl: './question-template-variables.component.html',
  imports: [
    MatIcon,
    MatIconButton,
    MatChip,
    MatChipSet,
    MatSuffix,
    MatTooltip,
    CdkTextareaAutosize,
    MatFormField,
    MatInput,
    MatError,
    FormField,
  ],
})
export class QuestionTemplateVariablesComponent {
  protected store = inject(QuestionnaireStore);
  protected dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  readonly formField = input.required<FieldTree<string>>();

  variables = input<QuestionTemplateVariable[]>();
  questionIndex = input.required<number>();

  variableUpdateEvent = output<QuestionTemplateVariable[]>();

  lang = computed(() => {
    return this.store.selected()!.defaultLanguage.code;
  })

  _lang = this.lang();

  protected editVariable(entity: QuestionTemplateVariable) {
    const dialogRef = this.dialog.open(VariableDialogComponent, {
      id: 'variable-dialog',
      data: {id: 'variable-dialog', mode: 'edit', entity, questionIndex: this.questionIndex()},
      panelClass: 'tailwind-slide-panel',
      width: '40%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription = dialogRef.afterClosed().subscribe(
      (variable: QuestionTemplateVariable | undefined) => {
        console.log('Class: QuestionDialogComponent, Function: , Line 573 variable' , variable);
        if (!variable) {
          return;
        }

        let oldVariable: string;
        const templateVariables = (this.variables() ?? []).map(v => {
          if (v.id === variable.id) {
            oldVariable = v.name;
            return variable;
          } else{
            return v
          }
        });
        this.variableUpdateEvent.emit(templateVariables);

        this.cdr.markForCheck();
        this.formField()().value.update(v => {
          const text = v;//[this._lang];
          const regex = new RegExp(`{{\\s*${oldVariable}\\s*}}`, 'g');
          return text.replace(regex, `{{${variable.name}}}`);
        })
      },
    );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  protected insertVariable(input: HTMLTextAreaElement): void {
    const dialogRef = this.dialog.open(VariableDialogComponent, {
      id: 'variable-dialog',
      data: {id: 'variable-dialog', mode: 'insert', questionIndex: this.questionIndex()},
      panelClass: 'tailwind-slide-panel',
      width: '40%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription = dialogRef.afterClosed().subscribe(
      (variable: QuestionTemplateVariable | undefined) => {
        if (!variable) return;

        const templateVariables = [...(this.variables() ?? []), variable];
        this.variableUpdateEvent.emit(templateVariables);
        this.cdr.markForCheck();
        this.insertVariableAtCursor(input, variable);
      },
    );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  private insertVariableAtCursor(input: HTMLTextAreaElement, variable: QuestionTemplateVariable): void {
    const placeholder = `{{${variable.name}}}`;

    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;

    const editedText = input.value.substring(0, start) + placeholder + input.value.substring(end);

    this.formField()().value.update(() => editedText);

    requestAnimationFrame(() => {
      const cursorPosition = start + placeholder.length;

      input.focus();
      input.setSelectionRange(
        cursorPosition,
        cursorPosition,
      );
    });
  }
}
