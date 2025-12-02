import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin',
  template: '<router-outlet />',
  imports: [
    RouterOutlet,
  ]
})
export class AdminComponent {}
