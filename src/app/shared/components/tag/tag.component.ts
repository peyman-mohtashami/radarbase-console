import {Component, HostBinding, input, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'rb-tag',
  templateUrl: './tag.component.html',
  imports: [
    RouterLink,
  ]
})
export class TagComponent {
  @HostBinding('class') @Input() class = '';

  link$ = input<(string|undefined)[]>();
}
