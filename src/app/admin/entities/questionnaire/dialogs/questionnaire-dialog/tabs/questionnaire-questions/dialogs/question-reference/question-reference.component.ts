import {Component} from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-question-reference',
  templateUrl: './question-reference.component.html',
  imports: [
    MatIcon,
    MatIconButton
  ]
})
export class QuestionReferenceComponent extends AngularNodeViewComponent {

  get questionName(): string {
    return this.node().attrs['questionName'] ?? '';
  }

  remove(): void {
    const position = this.getPos();

    if (typeof position !== 'number') return;

    this.editor().chain().focus().deleteRange({
      from: position,
      to: position + this.node().nodeSize,
    }).run();
  }
}
