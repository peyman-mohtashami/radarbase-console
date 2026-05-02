import { Component, output } from '@angular/core'
// import { Keyboard } from '@capacitor/keyboard'

// import { KeyboardEventType } from '../../../../../../core/data-ingestion/usage/enums/events'
import { FormsModule } from '@angular/forms'
import { IonButton, IonTextarea } from '@ionic/angular/standalone'
// import { Capacitor } from '@capacitor/core'
import { BaseInputComponent } from '../base-input/base-input.component'
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-notes-input',
  templateUrl: 'notes-input.component.html',
  imports: [
    FormsModule,
    IonTextarea,
    IonButton,
    MatButton
  ]
})
export class NotesInputComponent extends BaseInputComponent {
  keyboardEvent = output<string>()

  async emitKeyboardEvent(event: CustomEvent | KeyboardEvent): Promise<void> {
    if (event instanceof KeyboardEvent) {
      // if (Capacitor.isNativePlatform()) {
      //   if (event.key.toLowerCase() === KeyboardEventType.ENTER) {
      //     await Keyboard.hide()
      //   }
      // }
      this.keyboardEvent.emit(event.key)
    } else {
      this.keyboardEvent.emit(event.detail.type)
    }
  }
}
