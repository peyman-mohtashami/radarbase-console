import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';

@Component({
  selector: 'app-questionnaire-json-editor',
  templateUrl: 'questionnaire-json-editor.component.html',
  imports: [
    JsonPipe
  ]
})
export class QuestionnaireJsonEditorComponent {
  protected store = inject(QuestionnaireStore);
}
