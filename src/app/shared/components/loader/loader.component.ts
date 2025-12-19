import {Component, input} from '@angular/core';
// import {TranslatePipe} from "@ngx-translate/core";
// import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  imports: [
    // MatProgressSpinner,
    // TranslatePipe,
  ],
})
export class LoaderComponent {
  loadingText = input<string>();
}
