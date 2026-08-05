import {Component, input} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  imports: [
  ],
})
export class LoaderComponent {
  loadingText = input<string>();
}
