import {Injectable, signal} from "@angular/core";
import {AppQuestion} from '../../../../../models/questionnaire';

@Injectable({providedIn: 'root'})
export class QuestionsStore {
  question = signal<AppQuestion | null>(null);
  index = signal<number | null>(null);
}
