import {Injectable, signal} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProtocolStateService {
  selectedLanguage = signal<string>('en');
}
