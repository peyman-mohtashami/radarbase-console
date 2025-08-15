import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    // ToolbarComponent,
    RouterOutlet,
    ToolbarComponent,
  ],
})
export class AppComponent {}
