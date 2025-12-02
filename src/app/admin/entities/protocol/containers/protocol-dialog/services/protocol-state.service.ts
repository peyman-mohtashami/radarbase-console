import {Injectable, signal} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProtocolStateService {
  // selectedQuestionIndex = signal<number | undefined>(undefined);
  selectedLanguage = signal<string>('en');
}
