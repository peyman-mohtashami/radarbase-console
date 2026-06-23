import {Injectable, signal} from "@angular/core";
import {AppQuestion, AppQuestionnaire} from '../../../models/questionnaire';
// import {
//   RadarOption
// } from '../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';

@Injectable({providedIn: 'root'})
export class QuestionnaireDialogStateService {
  selectedQuestionIndex = signal<number | null>(null);
  selectedQuestion = signal<AppQuestion | null>(null);
  defaultLanguage = signal<string>('');
  // languages = signal<RadarOption[] | null>(null);
  questions = signal<AppQuestion[] | null>([]);
  selectedQuestionnaire = signal<AppQuestionnaire | null>(null);
}
