import { Component } from '@angular/core';
import {MatBadge} from '@angular/material/badge';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-badges',
  imports: [
    MatBadge,
    MatButton,
    MatIcon
  ],
  templateUrl: './badges.html',
  styleUrls: ['./badges.scss']
})
export class Badges {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
