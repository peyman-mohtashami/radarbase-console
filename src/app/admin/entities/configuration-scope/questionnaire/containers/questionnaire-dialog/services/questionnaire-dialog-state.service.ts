import {Injectable, signal} from "@angular/core";
import {AppQuestion, AppQuestionnaire} from '../../../models/questionnaire';
import {
  RadarOption
} from '../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';

@Injectable({providedIn: 'root'})
export class QuestionnaireDialogStateService {
  selectedQuestionnaire = signal<AppQuestionnaire | undefined>(undefined);
  selectedQuestion = signal<AppQuestion | null>(null);
  selectedQuestionIndex = signal<number | null>(null);
  selectedLanguage = signal<string | null>(null);
  //
  defaultLanguage = signal<RadarOption>({id: 'en', _name: 'English'});
}
