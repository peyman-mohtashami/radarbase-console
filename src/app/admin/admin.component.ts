import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin',
  template: '<router-outlet />',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RouterOutlet,
  ]
})
export class AdminComponent {}
