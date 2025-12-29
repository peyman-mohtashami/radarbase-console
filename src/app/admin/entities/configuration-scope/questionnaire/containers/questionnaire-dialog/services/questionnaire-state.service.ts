import {Injectable, signal} from "@angular/core";

@Injectable({providedIn: 'root'})
export class QuestionnaireStateService {
  selectedQuestionIndex = signal<number | undefined>(undefined);
  selectedLanguage = signal<string>('en');
  languages = signal<string[]>(['en', 'de', 'nl', 'da', 'es', 'it']);
}
