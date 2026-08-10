import {Component, inject} from '@angular/core';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-questionnaire-json-editor',
  templateUrl: 'questionnaire-json-editor.component.html',
  imports: [
    JsonPipe
  ]
})
export class QuestionnaireJsonEditorComponent {
  protected dialogState = inject(QuestionnaireDialogStateService);
}
