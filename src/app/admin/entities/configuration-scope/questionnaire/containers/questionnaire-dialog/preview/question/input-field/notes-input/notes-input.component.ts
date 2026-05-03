import { Component, output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BaseInputComponent } from '../base-input/base-input.component'
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-notes-input',
  templateUrl: 'notes-input.component.html',
  imports: [
    FormsModule,
    MatButton
  ]
})
export class NotesInputComponent extends BaseInputComponent {
  keyboardEvent = output<string>()

  async emitKeyboardEvent(event: CustomEvent | KeyboardEvent): Promise<void> {
    if (event instanceof KeyboardEvent) {
      this.keyboardEvent.emit(event.key)
    } else {
      this.keyboardEvent.emit(event.detail.type)
    }
  }
}
