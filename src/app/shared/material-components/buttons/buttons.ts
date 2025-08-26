import { Component } from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-buttons',
  imports: [
    MatDivider,
    MatIcon,
    MatMiniFabButton,
    MatFabButton,
    MatButton,
    MatIconButton,
    RouterLink
  ],
  templateUrl: './buttons.html',
})
export class Buttons {

}
