import {Component, HostBinding, input, Input} from '@angular/core';
// import {NgClass, NgIf, NgTemplateOutlet} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'rb-tag',
  templateUrl: './tag.component.html',
  imports: [
    // NgClass,
    RouterLink,
    // NgIf,
    // NgTemplateOutlet
  ]
})
export class TagComponent {
  @HostBinding('class') @Input() class = '';

  @Input() colorClass?: string;
  link = input<(string|undefined)[]>(); //?: (string | undefined)[];
}
