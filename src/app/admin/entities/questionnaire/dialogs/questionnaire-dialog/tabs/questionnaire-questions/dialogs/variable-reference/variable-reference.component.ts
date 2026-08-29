import {QuestionTemplateVariable} from '../../../questionnaire-variables/model/template-field.model';
import {
  VariableDialogComponent
} from '../../../questionnaire-variables/dialogs/variable-dialog/variable-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Component, inject} from '@angular/core';
import {AngularNodeViewComponent} from 'ngx-tiptap';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-variable-reference',
  templateUrl: './variable-reference.component.html',
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip
  ]
})
export class VariableReferenceComponent
  extends AngularNodeViewComponent {

  get variable(): QuestionTemplateVariable | null {
    return JSON.parse(this.node().attrs['variable'] ?? null);
  }

  remove(): void {
    const position = this.getPos()();

    if (!position || typeof position !== 'number') return;

    this.editor().chain().focus().deleteRange({
      from: position,
      to: position + this.node().nodeSize,
    }).run();
  }

  protected edit(): void {
    this.openVariablePicker();
  }

  private readonly dialog = inject(MatDialog);

  private openVariablePicker(): void {
    const dialogRef = this.dialog.open(
      VariableDialogComponent,
      {
        id: 'variable-dialog',
        data: {
          id: 'variable-dialog',
          mode: 'edit',
          entity: this.variable,
        },
        panelClass: 'tailwind-slide-panel',
        width: '40%',
        height: '100vh',
        position: {
          top: '0',
          right: '0',
        },
        hasBackdrop: true,
        disableClose: true,
        autoFocus: false,
        restoreFocus: false,
      }
    );

    dialogRef.afterClosed().subscribe(
      (variable: QuestionTemplateVariable | undefined) => {
        if (!variable) return;

        const position = this.getPos()();

        if (!position || typeof position !== 'number') return;

        this.editor().chain().focus().command(({ tr }) => {
          tr.setNodeMarkup(
            position,
            undefined,
            {
              ...this.node().attrs,
              variable: JSON.stringify(variable),
            },
          );

          return true;
        }).run();
      }
    );
  }
}
