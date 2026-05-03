import { Component,  } from '@angular/core'
// import { IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone'
// import { addIcons } from 'ionicons'
// import { chevronDownCircle, chevronDownOutline } from 'ionicons/icons'
// import {AppQuestion} from '../../../../../models/questionnaire';
// import {AppQuestion} from '../../models/question';
// import { AppQuestion } from '../../../../../core/app-lifecycle/questionnaire/models/question'

@Component({
  selector: 'app-scrollable-content',
  imports: [],
  templateUrl: './scrollable-content.component.html',
})
export class ScrollableContentComponent {
  // content = viewChild<IonContent>('content');
  //
  // question = input<AppQuestion>();
  // isVisible = input<boolean>(true);
  //
  // timestamp = output<string>();
  //
  // showScrollInputButton = false;
  //
  // constructor() {
  //   addIcons({ chevronDownCircle, chevronDownOutline });
  //   effect(async () => {
  //     if (this.isVisible()) {
  //       await this.updateInputScroll();
  //     }
  //   })
  // }
  //
  // async onInputScroll() {
  //   await this.content()?.scrollByPoint(0, 500, 500);
  // }
  //
  // async updateInputScroll() {
  //   const scrollElement = await this.content()?.getScrollElement();
  //   if (scrollElement) {
  //     const { scrollTop, scrollHeight, clientHeight } = scrollElement;
  //     this.showScrollInputButton = scrollTop < scrollHeight - clientHeight - 1;
  //     if (!this.showScrollInputButton) {
  //       this.timestamp.emit(Date.now().toString());
  //     }
  //   }
  // }
}
