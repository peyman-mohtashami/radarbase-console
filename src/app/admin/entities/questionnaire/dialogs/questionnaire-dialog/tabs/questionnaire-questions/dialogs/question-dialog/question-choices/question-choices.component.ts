import {Component, computed, inject, input, signal} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {FieldTree, FormField} from '@angular/forms/signals';
import {QuestionnaireStore} from '../../../../../../../services/questionnaire.store';
import {dragDropStyles} from '../../../../../services/utils';
import {QuestionTemplateVariablesComponent} from '../question-template-variables/question-template-variables.component';

@Component({
  selector: 'app-question-choices',
  templateUrl: './question-choices.component.html',
  imports: [
    CdkDropList,
    MatIcon,
    MatIconButton,
    TranslatePipe,
    CdkDrag,
    MatFormField,
    MatInput,
    CdkDragHandle,
    FormField,
    QuestionTemplateVariablesComponent,
  ],
  styles: dragDropStyles
})
export class QuestionChoicesComponent {
  protected store = inject(QuestionnaireStore);

  readonly formField = input.required<FieldTree<{code: string; label: Record<string, string>;}[]>>();
  index = input(0);

  isValid = signal(false);
  _lang = computed(() => {
    return this.store.selected()!.defaultLanguage.code;
  })

  addChoice() {
    this.formField()().value.update(v => [
      ...v,
      {code: '', label: {[this._lang()]: ''}},
    ]);
  }

  removeChoice(index: number) {
    this.formField()().value.update(v => v.filter((_, i) => i !== index));
  }

  protected onDrop(event: CdkDragDrop<any>) {
    // const control = this.choices.at(event.previousIndex);
    //
    // this.choices.removeAt(event.previousIndex);
    // this.choices.insert(event.currentIndex, control);
  }
}
