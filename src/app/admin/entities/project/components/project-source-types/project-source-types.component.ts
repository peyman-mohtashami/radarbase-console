import {Component, input} from "@angular/core";
import {SourceTypeDto} from '../../../source-type/models/source-type';
import {TranslatePipe} from '@ngx-translate/core';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-project-source-types',
  templateUrl: './project-source-types.component.html',
  imports: [
    TagComponent,
    TranslatePipe,
    MatButton
  ]
})
export class ProjectSourceTypesComponent {
  sourceTypes = input.required<SourceTypeDto[]>();

  showAll = false;

  toggleView($event: MouseEvent, showAll: boolean) {
    $event?.stopPropagation();
    this.showAll = !showAll
  }
}
