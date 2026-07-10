import {Injectable, signal} from "@angular/core";
import {AnswerWithTimeLog} from '../models/kafka';

@Injectable({providedIn: 'root'})
export class PreviewStateService {
  answers = signal<Record<string, AnswerWithTimeLog[]>>({});
  language = signal<string>('en');
}
