import {Injectable, signal} from "@angular/core";
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../models/questionnaire';

@Injectable({providedIn: 'root'})
export class QuestionnaireDialogStateService {
  questionnaire = signal<AppQuestionnaire | undefined>(undefined);
  question = signal<AppQuestion | null>(null);
  questionIndex = signal<number | null>(null);
  // selectedLanguage = signal<string | null>(null);
  //
  language = signal<AppQuestionnaireLanguage>({code: 'en', label: 'English'});
}
