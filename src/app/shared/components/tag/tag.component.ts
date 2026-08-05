import {Component, HostBinding, input, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  imports: [
    RouterLink,
  ]
})
export class TagComponent {
    @HostBinding('class')
    get hostClasses(): string {
        return `rounded-sm inline-block ${this.class}`.trim();
    }

    @Input() class = '';

    link = input<(string|undefined)[]>();
}
